async function newRecipeHandler(event) {
    event.preventDefault();
    console.log(event)
        // const title = document.querySelector('input[name="recipe-title"]').value;
        // const preParseIngredients = document.querySelector('textarea[name="ingredients"]').value;
        // const preParseInstructions = document.querySelector('textarea[name="instructions"]').value;
        // const recipe_image = document.querySelector('input[name="recipe-img"]').files[0].name
        //     // const recipe_image = document.getElementById("blah").src
        // const ingredients = preParseIngredients.replace(/(\r\n|\n|\r)/gm, "<br/>");
        // const instructions = preParseInstructions.replace(/(\r\n|\n|\r)/gm, "<br/>");

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