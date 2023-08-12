const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
const cors = require('cors');
const fileUpload = require("express-fileupload");
const path = require("path");
require('dotenv').config();
const paypal = require('@paypal/checkout-server-sdk');


const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 5 * 1024 * 1024 }, // maximum file size in bytes (5MB)
}));

//for contact-form-submission
app.use(cors());
app.use(bodyParser.json());



// Route Imports
const product = require("./routes/productRoute");
const customOrder = require("./routes/customOrderRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const cuorder = require("./routes/cuorderRoute");
const project = require("./routes/projectRoute");

app.use("/api/v1", product);
app.use("/api/v1", customOrder);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", project);
app.use("/api/cuorder",cuorder);

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const paypalClient = new paypal.core.PayPalHttpClient(environment);

app.get("/api/v1/payment/execute", async (req, res) => {
  try {
    const orderID = req.query.orderID;

    // Use the PayPal SDK to execute the payment
    const request = new paypal.orders.OrdersGetRequest(orderID);
    const response = await paypalClient.client().execute(request);

    // Assuming the response contains the payment details
    const payment = response.result;

    // Process the payment and update the order status in your database
    // ... Your code to process the payment and update order status ...

    // Respond with success
    res.status(200).json({ success: true, payment });
  } catch (error) {
    console.error("Error executing payment:", error);
    res.status(500).json({ success: false, message: "Failed to execute payment" });
  }
});

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);
module.exports = app;


//contact -form -submissions

const contactEmail =nodemailer.createTransport({
  service:'gmail',
  auth:{
      user:process.env.EMAIL_ADDRESS,
      pass:process.env.EMAIL_PASS
  }
});

contactEmail.verify((error) =>{
  if(error){
      console.log(error)
  }else{
      console.log("ready to send")
  }
});

app.post("/api/contact", bodyParser.urlencoded({extended:false}), (req,res) =>{
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const subject = req.body.subject;
  const message = req.body.message;
  const mail = {
      from: name,
      to: process.env.EMAIL_ADDRESS,
      subject: "RAA Contact Form Submission",
      html:`<p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Subject: ${subject}</p>
      <p>Message: ${message}</p>
      `
  }
  contactEmail.sendMail(mail, (error)=>{
      if(error){
          res.json(error);
      }else{
          res.json({code:200, status: "Message Sent"})
      }
  })
})











