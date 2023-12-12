const express = require("express");

const app = express.Router();

const { borrow, accept, reject, returnFn } = require("../services/tasks");
const { payProduct, successPayment, cancelPayment } = require("../services/payment");

app.route("/").post(borrow);
app.route("/accept/:itemId").put(accept);
app.route("/reject/:itemId").put(reject);
app.route("/return").post(returnFn);
app.route("/pay").post(payProduct);
app.route("/success").get(successPayment);
app.route("/cancel").get(cancelPayment);

module.exports = app;
