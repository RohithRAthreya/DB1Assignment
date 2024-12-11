const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  if (cartTotal === 0) {
    return res.send(newItemPrice.toString());
  }
  let cartPrice = newItemPrice * cartTotal;
  res.send(cartPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  if (isMember) {
   let discountpercentage = 0.1
    let cartValue = (cartTotal-(discountpercentage * cartTotal));
    return res.send(cartValue.toString());
  } else {
    return res.send(cartTotal.toString());
  }
});
function totaltax(cartTotal, taxRate) {
  return cartTotal * taxRate;
}
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxRate = 0.05;
  let taxAmount = totaltax(cartTotal, taxRate);
  res.send(taxAmount.toString());
});
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  if (shippingMethod === 'Standard') {
    res.send((distance / 50).toString()); // 1 day per 50 km for Standard
  } else {
    res.send((distance / 100).toString()); // 1 day per 100 km for Express
  }
});
function calculateShippingCost(weight, distance) {
  return weight * distance * 0.1;
}

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = calculateShippingCost(weight, distance);
  res.send(shippingCost.toString());
});
function calculateLoyaltyPoints(purchaseAmount) {
  return purchaseAmount * 2;
}
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = calculateLoyaltyPoints(purchaseAmount);
  res.send(loyaltyPoints.toString());
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
