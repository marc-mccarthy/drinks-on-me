// API URL called
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

async function fetchDrinks() {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const getDrinks = async () => {
  const drinksJson = await fetchDrinks();
  const drinks = drinksJson.drinks

  // Show me the nice array of data "drinks"
  console.log(JSON.stringify(drinks, null, 2));

    // Loop through each drink
  for (let drink of drinks) {
  
    // Extract drink details
    const name = drink.strDrink;
    const id = drink.idDrink;
    const photo = drink.strDrinkThumb

    // Initialize empty ingredients array
    const ingredients = [];

    // Loop 1-15 and add if ingredient exists
    for (let num=1; num<=15; num++) {
      if (drink[`strIngredient${num}`]) {
        ingredients.push(drink[`strIngredient${num}`]); 
      }
    }

    console.log(`Name of drink: ${name}`)
    console.log(`ID that they associate with the ${name} drink: ${id}`)
    console.log(`Ingredients for ${name}: ${ingredients}`)
    console.log(`Photo URL for the ${name} drink: ${photo}`)

    // // Save drink to PostgreSQL
    // const query = `
    //   INSERT INTO drinks (name, id, ingredients)
    //   VALUES ($1, $2, $3)
    // `;

    // await client.query(query, [name, id, ingredients]);
  }
}

getDrinks();
