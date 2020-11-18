const { Recipe } = require('../models');

const recipedata = [{
        title: "Army Stew",
        ingredients: "4 cups (1 litre) chicken stock, 200g (7 ounces) SPAM, thinly sliced, 4 cocktail Frankfurt sausage (150g, 5.3 ounces), thinly & diagonally sliced, 250g (9 ounces) tofu, sliced (about 1.5cm, 1/2 inch thickness), 200g (7 ounces) enoki mushrooms, base stem removed & stems separated, 200g (7 ounces) king oyster mushrooms, thinly sliced length ways, 100g (3.5 ounces) shiitake mushroom caps, thinly sliced, 1/2 cup ripened bite sized Kimchi, 110g (3.9 ounces) instant ramen noodles, 50g (1.8 ounces) Korean rice cakes for soup, soaked in cold water for 15 mins if it was frozen, 30g (1 ounces) green onion, thinly & diagonally sliced, 1 or 2 slices of cheese, Sauce (Mix these in a small bowl), 2 Tbsp Korean chili flakes (Gochugaru), 2 Tbsp rice wine (mirin), 1 Tbsp soy sauce, 1 Tbsp minced garlic, 1/2 Tbsp sugar, 1/2 Tbsp Korean chili paste (Gochujang), A few sprinkles of ground black pepper",
        instructions: "1.Assemble the main ingredients (except for instant ramen noodles, rice cakes, green onion and cheese) in a shallow pot. Add the sauce in the middle. Pour the stock in the corner of the pot. Close the lid and boil it on medium high heat until the stock starts to boil (about 8 mins).2. Add the remaining ingredients – instant ramen noodles, rice cakes, green onion and cheese on top of the pot and boil uncovered until the noodles are cooked (about 2 to 3 mins). Reduce the heat to low (if you’re cooking on a portable burner and sharing the food at the dinning table).Start dishing out soup, protein and vegetables onto your own soup bowl. Serve with steamed rice (& with other Korean side dishes).",
        user_id: 1
    },
    {
        title: "Korean Seaweed Soup",
        ingredients: "1 ounce (30g) dried miyeok seaweed (also sold under the Japanese name wakame), 3 whole medium cloves garlic plus 3 finely minced medium cloves garlic, divided, One 1-inch piece fresh ginger (about 1/3 ounce; 10g), peeled, 1/2 of a medium white onion (about 3 ounces; 85g for the half onion), 12 ounces (350g) beef brisket, washed in cold water, 2 tablespoons (30ml) Joseon ganjang (Korean soup soy sauce; see note), divided, Kosher or sea salt",
        instructions: "1.In a medium bowl, cover seaweed with at least 3 inches cold water and let stand at room temperature until fully softened and hydrated, about 2 hours. 2.Meanwhile, in a Dutch oven or pot, combine whole garlic cloves, ginger, onion, and brisket with 1 1/2 quarts (1 1/2L) cold water and bring to a boil over high heat. Lower heat to maintain a gentle simmer and cook, covered, until brisket is tender and broth is slightly cloudy, about 2 hours. Using a slotted spoon, remove and discard garlic cloves, ginger, and onion from broth. 3.Transfer brisket to a work surface and allow to cool slightly, then slice across the grain into bite-size pieces. Transfer brisket to a small bowl and toss well with 1 tablespoon soy sauce and remaining 3 cloves minced garlic. Set aside. 4.Drain seaweed and squeeze well to remove excess water. Transfer to work surface and roughly chop into bite-size pieces. 5.Return broth to a simmer and add seaweed and seasoned brisket. If the proportion of liquid to solids is too low for your taste, you can top up with water and return to a simmer. Add remaining 1 tablespoon soy sauce and simmer until seaweed is tender, about 30 minutes. Season to taste with salt. 6.Ladle soup into bowls and serve alongside hot rice and any banchan (side dishes) of your choosing.",
        user_id: 2
    },
    {
        title: "Cup Ramen",
        ingredients: "Cup Ramen, Hot Water",
        instructions: "1.Heat up the water till boiling. 2.Pour it in ramen cup and wait 3 minutes. 3.Enjoy",
        user_id: 2
    },
];

const seedRecipes = () => Recipe.bulkCreate(recipedata);

module.exports = seedRecipes;