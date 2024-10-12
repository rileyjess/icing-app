const loginFormHandler = async (event) => {
    event.preventDefault();

   

    const email = document.querySelector('#email-login').value.trim();  // Changed 'username' to 'email'
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        
        // Send a POST request to the API endpoint

        const response = await fetch('/login', {  // Changed API endpoint to match route
            method: 'POST',
            body: JSON.stringify({ email, password }),  // Send email and password
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
           
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
