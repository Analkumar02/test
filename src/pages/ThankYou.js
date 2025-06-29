import React from "react";

const getDisplayShippingMethodName = (method) => {
  if (method === "Standard Ground") return "FedEx Ground";
  if (method === "2nd Day Air") return "FedEx Air";
  return method;
};

function ThankYou() {
  // Example: get order data from localStorage (replace with your actual logic)
  const orderData = JSON.parse(localStorage.getItem("orderData") || "{}");
  const shippingMethod = orderData?.shippingMethod || "Standard Ground";

  return (
    <div>
      <h1>Thank You for Your Order!</h1>
      <div>
        <strong>Delivery Method:</strong>{" "}
        {getDisplayShippingMethodName(shippingMethod)}
      </div>
      {/* ...other order details... */}
    </div>
  );
}

export default ThankYou;
