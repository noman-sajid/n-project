// Import any necessary modules and models
const Invoice = require('../models/invoice'); // You need to create a model for invoices

// Controller function to create an invoice
const createInvoice = async (req, res) => {
  try {
    // Retrieve data from the request body
    const { orderId, amount, description } = req.body;

    // Create a new invoice in the database
    const newInvoice = new Invoice({
      orderId,
      amount,
      description,
    });

    // Save the new invoice
    await newInvoice.save();

    return res.status(201).json({ message: 'Invoice created successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createInvoice,
};
