async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password,
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            await Swal.fire(
                'Good Job!',
                'You are now a FOOD BLOGGER!!!!',
                'success'
            )
            document.location.replace('/dashboard/');
        } else {
            await Swal.fire(
                'Info Missing!',
                'Signin missing fields!',
                'info'
            )
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);