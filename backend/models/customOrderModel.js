const mongoose = require('mongoose');
const mongooseValidators = require('mongoose-validators');

const customOrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      validate: [mongooseValidators.isEmail, "Please Enter a valid Email"],
    },
    phone: {
      type: String,
      required: [true, "Please Enter Your Phone Number"],
      minlength: [10, "Phone Number should have at least 10 digits"],
      maxlength: [15, "Phone Number cannot exceed 15 digits"],
      match: [/^[0-9]+$/, "Phone Number can only contain numeric characters"],
    },
    description: {
      type: String,
      required: true,
    },
    software: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'assigned', 'declined', 'completed'],
      default: 'pending',
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    logoNumber: {
      type: Number,
      required: true,
    },
    logoName: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: true,
    },
    dimensions: {
      type: String,
      required: true,
    },
    requiredColors: {
      type: String,
      required: true,
    },
    numberOfColors: {
      type: Number,
      required: true,
    },
    centerPoint: {
      type: String,
      required: true,
    },
    remarks: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTeamMember: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const CustomOrder = mongoose.model('CustomOrder', customOrderSchema);

module.exports = CustomOrder;