// // 
// document.addEventListener('DOMContentLoaded', function() {
//   const loginForm = document.getElementById('loginForm');
//   const signupForm = document.getElementById('signupForm');
//   const loginTitle = document.getElementById('loginTitle');
//   const signupTitle = document.getElementById('signupTitle');
//   const loginSubtitle = document.getElementById('loginSubtitle');
//   const signupSubtitle = document.getElementById('signupSubtitle');
//   const changeMethodBtn = document.getElementById('changeMethodBtn');
//   const toggleText = document.getElementById('toggleText');
//   const toggleTextLogin = document.getElementById('toggleTextLogin');
//   const signupLink = document.getElementById('signupLink');
//   const loginLink = document.getElementById('loginLink');

//   if (signupLink) { // Check if signupLink exists
//       signupLink.addEventListener('click', function(e) {
//           e.preventDefault();
//           loginForm.style.display = 'none';
//           signupForm.style.display = 'block';
//           loginTitle.style.display = 'none';
//           signupTitle.style.display = 'block';
//           loginSubtitle.style.display = 'none';
//           signupSubtitle.style.display = 'block';
//           toggleText.style.display = 'none';
//           toggleTextLogin.style.display = 'block';
//           changeMethodBtn.style.display = 'none';
//       });
//   }

//   if (loginLink) { // Check if loginLink exists
//       loginLink.addEventListener('click', function(e) {
//           e.preventDefault();
//           loginForm.style.display = 'block';
//           signupForm.style.display = 'none';
//           loginTitle.style.display = 'block';
//           signupTitle.style.display = 'none';
//           loginSubtitle.style.display = 'block';
//           signupSubtitle.style.display = 'none';
//           toggleText.style.display = 'block';
//           toggleTextLogin.style.display = 'none';
//           changeMethodBtn.style.display = 'block';
//       });
//   }

//   if (changeMethodBtn) { // Check if changeMethodBtn exists
//       changeMethodBtn.addEventListener('click', function() {
//           alert('Change method');
//       });
//   }
// });

// auth.js (for the login form)
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginTitle = document.getElementById('loginTitle');
    const signupTitle = document.getElementById('signupTitle');
    const loginSubtitle = document.getElementById('loginSubtitle');
    const signupSubtitle = document.getElementById('signupSubtitle');
    const changeMethodBtn = document.getElementById('changeMethodBtn');
    const toggleText = document.getElementById('toggleText');
    const toggleTextLogin = document.getElementById('toggleTextLogin');
    const signupLink = document.getElementById('signupLink');
    const loginLink = document.getElementById('loginLink');

    let isLogin = true;

    function toggleForm() {
        isLogin = !isLogin;
        if (isLogin) {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
            loginTitle.style.display = 'inline';
            signupTitle.style.display = 'none';
            loginSubtitle.style.display = 'inline';
            signupSubtitle.style.display = 'none';
            toggleText.style.display = 'block';
            toggleTextLogin.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
            loginTitle.style.display = 'none';
            signupTitle.style.display = 'inline';
            loginSubtitle.style.display = 'none';
            signupSubtitle.style.display = 'inline';
            toggleText.style.display = 'none';
            toggleTextLogin.style.display = 'block';
        }
    }

    signupLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleForm();
    });

    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        toggleForm();
    });

    changeMethodBtn.addEventListener('click', toggleForm);

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('/login', { // Replace with your backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('token', data.token); // Store token
                window.location.href = './overview.html'; // Redirect to dashboard
            } else {
                alert('Login failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login.');
        }
    });

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        try {
            const response = await fetch('/signup', { // Replace with your signup endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            const data = await response.json();

            if (data.success) {
                alert('Signup successful! Please log in.');
                toggleForm(); // Switch back to login form
            } else {
                alert('Signup failed: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during signup.');
        }
    });

});