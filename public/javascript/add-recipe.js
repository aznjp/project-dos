async function newRecipeHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="recipe-title"]').value;
    const ingredients = document.querySelector('textarea[name="ingredients"]').value;
    const instructions = document.querySelector('textarea[name="instructions"]').value;
    const recipe_image = document.getElementById("blah").src

    console.log(recipe_image)
    const response = await fetch(`/api/recipes`, {
        method: 'POST',
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
    console.log(response)
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