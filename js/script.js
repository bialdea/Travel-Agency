// function validateName(name) {
//     const regex = /[a-zA-Z]{3}/;
//     return regex.test(name);
// }

// function validateAddress(address) {
//     const forbiddenCharsRegex = /@#$%^&/;
//     const lettersRegex = /[a-zA-Z]{3}/;
//     const numbersRegex = /[0-9]+/;
   

//     if (forbiddenCharsRegex.test(address)) {
//         return false;
//     }

//     if (!numbersRegex.test(address)) {
//         return false;
//     }

//     return lettersRegex.test(address);
// }

// function validateBirthday(birthday) {
//     const dateRegex =  /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\d\d$/;

//     return dateRegex.test(birthday);
// }

// function validatePhoneNumber(phoneNumber) {
//     return /[0-9]{3}-[0-9]{9}/.test(phoneNumber);
// }

// function validateEmail(email) {
//     return /.+@.+\..+/.test(email);
// }

// const VALUE_TO_VALIDATOR = {
//     'lastNameInput': validateName,
//     'firstNameInput': validateName,
//     'addressInput': validateAddress,
//     'birthdayInput': validateBirthday,
//     'phoneNumberInput': validatePhoneNumber,
//     'emailInput': validateEmail,
// }


// function validate(element) {
//     const { value, id } = element;
//     const validator = VALUE_TO_VALIDATOR[id];
//     const isValid = validator(value);

//     if(isValid) {
//         element.classList.remove('wrong');
//     } else {
//         element.classList.add('wrong');
//     }

//     return isValid;
// }

// window.addEventListener('load', () => {
//     const inputList = document.querySelectorAll('input[type=text]');
//     inputList.forEach((input) => {
//         input.addEventListener('focusout', (event) => {
//             validate(event.target);
//         });
//     });

//     document.querySelector('#submit-button').addEventListener('click', (event) => {
//         event.preventDefault();

//         let allValid = true;
//         const errorsList = document.querySelector('#errors');
//         const inputList = document.querySelectorAll('input[type=text]');

//         errorsList.innerHTML = '';

//         inputList.forEach((input) => {
//             if(!validate(input)) {
//                 const { id } = input;
//                 const label = document.querySelector(`label[for="${id}"]`);
//                 const value = label.innerHTML;

//                 errorsList.innerHTML += `<li>${value}</li>`
//                 allValid = false;
//             }
//         });

//         const successMessage = document.querySelector('#successMessage');
//         const errorMessage = document.querySelector('#errorMessage');


//         if (allValid) {
//             errorMessage.classList.add('hidden');
//             successMessage.classList.remove('hidden');
//             errorsList.innerHTML = '';
//         } else {
//             errorMessage.classList.remove('hidden');
//             successMessage.classList.add('hidden');
//         }
//     })

//     document.querySelector('#reset-button').addEventListener('click', (event) => {
//         event.preventDefault();

//         const inputList = document.querySelectorAll('input[type=text]');
//         inputList.forEach(input => {
//             input.classList.remove('wrong');
//             input.value = '';
//         });

//         const errorsList = document.querySelector('#errors');
//         errorsList.innerHTML = '';

//         const successMessage = document.querySelector('#successMessage');
//         const errorMessage = document.querySelector('#errorMessage');

//         errorMessage.classList.add('hidden');
//         successMessage.classList.add('hidden');
//     })
// });