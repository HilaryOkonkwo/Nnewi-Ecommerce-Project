'use Strict'


const myInput = document.getElementById('myInput');
const form = document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
        }),
    })

        .then(response => response.json())
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect;
            } else if (data.message) {
                alert(data.message); // Display server-side error message
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        })
        .catch(error => {
            if (error instanceof TypeError) {
                alert('Network error. Please check your internet connection and try again.');
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
            console.error('Error:', error);
        });
});


