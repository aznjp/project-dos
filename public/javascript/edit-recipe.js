async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="recipe-title"]').value.trim();
    const ingredients = document.querySelector('textarea[name="ingredients"]').value;
    const instructions = document.querySelector('textarea[name="instructions"]').value;
    const recipe_image = document.getElementById("blah").src

    const id = window.location.toString().split('/')[

        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            ingredients,
            instructions,
            recipe_image
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-recipe-form').addEventListener('submit', editFormHandler);