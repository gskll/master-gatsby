import { useState, useContext } from "react";
import OrderContext from "../components/OrderContext";

export default function usePizza({ pizzas, inputs }) {
  // 1. Create state to hold order
  //
  // State now in provider
  // const [order, setOrder] = useState([]);

  // access state via context
  const [order, setOrder] = useContext(OrderContext);
  // 2. Make a function to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  // 3. Make a function to remove things to order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // 4. Send this data to a serverless function on checkout
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
