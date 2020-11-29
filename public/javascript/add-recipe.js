async function newRecipeHandler(event) {
    event.preventDefault();
    let form = document.querySelector("#recipe-form")
    let formData = new FormData(form)

    const response = await fetch(`/api/recipes`, {
        method: 'POST',
        body: formData
    });
    if (response.ok) {

        await Swal.fire(
            'Good Job!',
            'Recipe is now uploaded!!!!',
            'success'
        )
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-recipe-form').addEventListener('submit', newRecipeHandler);