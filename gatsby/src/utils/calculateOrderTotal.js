import calculatePizzaPrice from "./calculatePizzaPrice";

export default function calculateOrderTotal(order, pizzas) {
  // Loop over each item in the order
  // Calculate the total for that pizza
  // Add that total to the running total
  const total = order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
  return total;
}
