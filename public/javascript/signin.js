// const avatar = document.querySelector("input[name='avatar']").value

// document.querySelector("input[name='avatar']").addEventListener('change', event => {
//     handleImageUpload(event)
// })

// const handleImageUpload = event => {
//     const files = event.target.files
//     const formData = new FormData()
//     formData.append('avatar', files[0])

//     fetch('/api/users/signup', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data)
//         })
//         .catch(error => {
//             console.error(error)
//         })
// }


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
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);