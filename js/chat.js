var API_URL = 'http://193.226.17.35/chat-piu/';
var token = '';
var displayName = '';
var readingTimeout = null;

$(document).ready(() => {
    $("#login_form").off("submit", authenticate);
    $("#login_form").on("submit", loginToServer);

    $('#chat_user').hide();
    $('#chat_message').hide();
    $('#form_chat').hide();

    $("#form_chat").on("submit", sentMessageToServer);
    
});

function loginToServer(event) {
    event.preventDefault();

    var username = $('#username').val();
    var password = $('#password').val();

    $('#chat div').show();

    serverAuthentication(username, password);
}

function serverAuthentication(username, password) {
    $.ajax({
        url: `${API_URL}authenticate.php` ,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ username: username, password: password }),
        dataType: 'json',
        success: onSuccessAuthentication,
        complete: () => $('#chat div').hide(),
    });
}

function onSuccessAuthentication(data) {
    token = data.token;
    displayName = data.display;

    $('#chat_user').text('')
        .append($('<i>').addClass('fa fa-user'))
        .append($('<span>').text(' Welcome '))
        .append($('<span>').addClass('strong').text(displayName))
        .append($('<i>').addClass('fa fa-sign-out-alt').on('click', signOut));

    $('#login_form').fadeOut(500).queue(() => {
        $('#chat_user').fadeIn(500);
        $('#chat_messages').fadeIn(500);
        $('#form_chat').show();
    });

    $('#sendMessageButton').on('click', sentMessageToServer);

    readingInterval = setInterval(getMessageFromServer, 2000);
}

function signOut() {
    clearInterval(readingInterval);
    readingInterval = null;
    $.ajax({
        url: `${API_URL}logout.php` ,
        method: 'DELETE',
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: onSuccessSignOut,
    });
}

function onSuccessSignOut() {
    token = '';
    displayName = '';

    $('#chat_user').fadeOut(500);
    $('#chat_messages').fadeOut(500);
    $('#form_chat').hide();
    $('#login_form').show();
    $('#login_form').children('input').attr('disabled', false);
    $('#login_form').children('#username').val('');
    $('#login_form').children('#password').val('');

}

function sentMessageToServer(event) {
    event.preventDefault();

    var message = $('#message').val();

    displayMessage({ sender: displayName, message: message });

    $.ajax({
        url: `${API_URL}sendmessage.php` ,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ message: message }),
        dataType: 'json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        }, 
    });
}

function displayMessage(message) {
    var messageDiv = $('<div>').addClass('message');
    var senderSpan = $('<span>').addClass('message_sender').text(message.sender + ': ');
    var contentSpan = $('<span>').addClass('message_content').text(message.message);

    messageDiv.append(senderSpan).append(contentSpan);
    $('#chat_messages').append(messageDiv).append('<br>'); // Adăugăm un separator între mesaje

    $('#chat_messages').scrollTop($('#chat_messages')[0].scrollHeight);
}



function getMessageFromServer() {
    $.ajax({
        url: `${API_URL}readmessages.php` ,
        method: 'GET',
        dataType: 'json',
        beforeSend: (xhr) => {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        },
        success: onSuccessGetMessage,
    });
}

function onSuccessGetMessage(data) {
    if (data != null && Array.isArray(data.messages)) {
        data.messages.forEach(message => {
            displayMessage({
                sender: message.sender,
                message: message.text
            });
        });
    }
}


