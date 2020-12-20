import React, { useState } from "react";

const OrderContext = React.createContext();

export function OrderProvider({ children }) {
  const [order, setOrder] = useState([]);
  return <OrderContext.Provider>{children}</OrderContext.Provider>;
}
