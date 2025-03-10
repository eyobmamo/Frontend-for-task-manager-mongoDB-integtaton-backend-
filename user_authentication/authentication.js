// Toggle between Login and Sign Up forms
const loginToggle = document.getElementById('login-toggle');
const signupToggle = document.getElementById('signup-toggle');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

loginToggle.addEventListener('click', () => {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    loginToggle.classList.add('active');
    signupToggle.classList.remove('active');
});

signupToggle.addEventListener('click', () => {
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    signupToggle.classList.add('active');
    loginToggle.classList.remove('active');
});

// Handle Sign Up Form Submission
const signupFormElement = document.getElementById('signup-form');
signupFormElement.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form data
    const email = signupFormElement.querySelector('input[type="email"]').value;
    const password = signupFormElement.querySelector('input[type="password"]').value;
    const confirmPassword = signupFormElement.querySelectorAll('input[type="password"]')[1].value;

    // Validate password match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Prepare data for the API
    const userData = {
        email: email,
        password: password,
    };

    try {
        // Send POST request to the backend API
        const REGISTER_ENDPOINT = 'https://task-management-mongodb-integrat-production.up.railway.app/Register';
        const response = await fetch(REGISTER_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        // Handle response
        const result = await response.json();
        if (response.ok) {
            alert('Registration successful!');
            // Redirect to the login page after successful registration
        } else {
            alert(`Error: ${result.message || 'Registration failed'}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

// Handle Login Form Submission
const loginFormElement = document.getElementById('login-form');
loginFormElement.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form data
    const email = loginFormElement.querySelector('input[type="email"]').value;
    const password = loginFormElement.querySelector('input[type="password"]').value;

    // Prepare data for the API
    const loginData = {
        email: email,
        password: password,
    };

    try {
        // Send POST request to the backend login endpoint
        const LOGIN_ENDPOINT = 'https://task-management-mongodb-integrat-production.up.railway.app/Login';
        const response = await fetch(LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        // Handle response
        const result = await response.json();
        if (response.ok) {
            // Save the JWT token in localStorage
            localStorage.setItem('token', result.token);

            // Redirect to another page (e.g., dashboard)
            window.location.href = '../TaskUser/renderUserTask.html'; // Change this to your desired redirect URL
        } else {
            // Display error message
            alert(`Error: ${result.message || 'Login failed'}`);
            console.error('Login error:', result);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
