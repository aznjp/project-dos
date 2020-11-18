async function newRecipeHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="recipe-title"]').value;
    const preParseIngredients = document.querySelector('textarea[name="ingredients"]').value;
    const instructions = document.querySelector('textarea[name="instructions"]').value;

    const ingredients = preParseIngredients.split("|").join("<li>").split("~").join("</li>").split(",").join("</li> <li>")

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

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}


document.querySelector('.new-recipe-form').addEventListener('submit', newRecipeHandler);