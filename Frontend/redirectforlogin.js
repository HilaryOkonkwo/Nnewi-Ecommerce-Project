'use strict';



const form = document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.redirect) {
                window.location.href = data.redirect;
            } else if (data.message && data.redirect === undefined) {
                alert(data.message);
            } else if (data.message === undefined && data.redirect === undefined) {
                window.location.href = '/Landing Page.html';
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
        })
        .catch(error => { // Corrected placement of .catch
            if (error instanceof TypeError) {
                alert('Network error. Please check your internet connection and try again.');
            } else {
                alert('An unexpected error occurred. Please try again.');
            }
            console.error('Error:', error);
        });
});


