async function newRecipeHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="recipe-title"]').value;
    const ingredients = document.querySelector('textarea[name="ingredients"]').value;
    const instructions = document.querySelector('textarea[name="instructions"]').value;
    // console.log(JSON.stringify({
    //     title,
    //     ingredients,
    //     instructions
    // }))
    // console.log(ingredients)
    // console.log(instructions)

    const response = await fetch(`/api/recipes`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            ingredients,
            instructions
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response)
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}


document.querySelector('.new-recipe-form').addEventListener('submit', newRecipeHandler);