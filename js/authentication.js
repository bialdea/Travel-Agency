function resizeLogin(firstStyle, secondStyle, animationTime) {
    $("#chat").animate(
        firstStyle, 
        animationTime, 
        () => $("#chat").animate(secondStyle, 500, () => {})
    );
}

function onResizeLogin() {
    document.querySelector('#instructions').classList.remove('error');
    $("#chat form p").html('<i class="fas fa-lock"></i> Authentication required');

    if($("#chat").width() <= 40) {
        resizeLogin({width: "300px"}, {height: "350px"}, 500);
    } else { 
        resizeLogin({height: "60px"}, {width: "40px"}, 500);
    }
}

function authenticate(event) {
    event.preventDefault();

    $("#chat div").show();

    setTimeout(() => {
        if($("#username").val() == "admin" && $("#password").val() == "admin1234"){
            $("#chat form p").html('<i class="fas fa-check"></i>  Authentication successful!');
            document.querySelector('#instructions').classList.remove('error');
        } else {
            $("#chat form p").html('<i class="fas fa-exclamation-triangle"></i>  Invalid username or password');
            document.querySelector('#instructions').classList.add('error');
        }

        $("#chat div").hide();
    }, 3000);
}

$(document).ready(() => {
    $("#chat h2").on("click", onResizeLogin);
    $("#chat form").on("submit", authenticate);
    $("#chat div").hide();
});