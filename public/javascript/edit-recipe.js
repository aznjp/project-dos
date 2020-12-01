async function editFormHandler(event) {
    event.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    let form = document.querySelector("#edit-recipe-form")
    let formData = new FormData(form)
    console.log(formData.file)
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        body: formData,

    });

    if (response.ok) {
        await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            timer: 1000
        })
        document.location.replace('/dashboard/');
    } else {
        await Swal.fire(
            'Info Missing!',
            'Recipe requires all inputs and an image',
            'info'
        )
    }
}

document.querySelector('#edit-recipe-form').addEventListener('submit', editFormHandler);