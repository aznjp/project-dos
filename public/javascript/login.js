async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            await Swal.fire(
                'Welcome back!',
                'We are glad to see you again!',
                'success'
            )
            document.location.replace('/dashboard/');
        } else {
            await Swal.fire(
                'Info Missing!',
                'Wrong email or password!',
                'info'
            )
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);