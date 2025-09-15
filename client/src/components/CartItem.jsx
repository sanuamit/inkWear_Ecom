// client/src/components/CartItem.jsx
import React from "react";
import formatPrice from "../utils/formatPrice";

const CartItem = ({ item }) => {
  return (
    <div className="flex justify-between items-center border-b py-3">
      <div>
        <p className="font-semibold">{item.name}</p>
        <p className="text-sm text-gray-500">{formatPrice(item.price)} x {item.quantity}</p>
      </div>
      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
    </div>
  );
};

export default CartItem;
