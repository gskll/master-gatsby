import path from 'path';

async function turnPizzasIntoPages({ graphql, actions }) {
  // 1. Get a template for this pages
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');

  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  // 3. Loop over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      // What is the url for this new page?
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
}

async function turnToppingsIntoPages({ graphql, actions }) {
  // 1. get the template
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');

  // 2. query all the toppings
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. createPage for that toppings
  data.toppings.nodes.forEach((topping) => {
    console.log('creating ', topping.name);
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingsTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
  // 4. pass topping data to pizza.js
}

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    // 1. Pizzas
    turnPizzasIntoPages(params),
    // 2. Toppings
    turnToppingsIntoPages(params),
  ]);
}
