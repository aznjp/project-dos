const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

async function newRecipeHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="recipe-title"]').value;
    const ingredients = document.querySelector('textarea[name="ingredients"]').value;
    const instructions = document.querySelector('textarea[name="instructions"]').value;
    const file = document.querySelector('input[name="recipe-img"]').files[0];
    const recipe_image = file ? (await toBase64(file)) : undefined

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
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}


document.querySelector('.new-recipe-form').addEventListener('submit', newRecipeHandler);