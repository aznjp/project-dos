async function editFormHandler(event) {
    event.preventDefault();

    // const title = document.querySelector('input[name="recipe-title"]').value.trim();
    // const preParseIngredients = document.querySelector('div[name="ingredients"]').innerHTML;
    // const preParseInstructions = document.querySelector('div[name="instructions"]').innerHTML;
    // const recipe_image = document.getElementById("blah").src
    // const ingredients = preParseIngredients.replace(/(\r\n|\n|\r)/gm, "<br />");
    // const instructions = preParseInstructions.replace(/(\r\n|\n|\r)/gm, "<br />");
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    let form = document.querySelector("#edit-recipe-form")
    let formData = new FormData(form)
    console.log(formData)
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        body: formData,

    });

    console.log(response)

    if (response.ok) {
        await Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            timer: 1000
        })
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('#edit-recipe-form').addEventListener('submit', editFormHandler);