import { useState, useContext } from "react";
import OrderContext from "../components/OrderContext";
import formatMoney from "./formatMoney";
import calculateOrderTotal from "./calculateOrderTotal";
import attachNamesAndPrices from "./attachNamesAndPrices";

export default function usePizza({ pizzas, values }) {
  // 1. Create state to hold order
  //
  // State now in provider
  // const [order, setOrder] = useState([]);
  // access state via context
  const [order, setOrder] = useContext(OrderContext);

  // State for order sending email
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  //function run when someone submits the form
  async function submitOrder(e) {
    e.preventDefault();
    console.log(e);
    setLoading(true);
    // gather all the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
    };
    console.log(body);
  }

  // 4. Send this data to a serverless function on checkout
  // TODO

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
