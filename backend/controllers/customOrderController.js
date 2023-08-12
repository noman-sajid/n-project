const CustomOrder = require("../models/customOrderModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create CustomOrder -- Admin
exports.createCustomOrder = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "customOrders",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const customOrder = await CustomOrder.create(req.body);

  res.status(201).json({
    success: true,
    customOrder,
  });
});

// Get All CustomOrder
exports.getAllCustomOrders = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const customOrdersCount = await CustomOrder.countDocuments();

  const apiFeature = new ApiFeatures(CustomOrder.find(), req.query)
    .search()
    .filter();

  let customOrders = await apiFeature.query;

  let filteredCustomOrdersCount = customOrders.length;

  apiFeature.pagination(resultPerPage);

  customOrders = await apiFeature.query;

  res.status(200).json({
    success: true,
    customOrders,
    customOrdersCount,
    resultPerPage,
    filteredCustomOrdersCount,
  });
});

// Get All CustomOrder (Admin)
exports.getAdminCustomOrders = catchAsyncErrors(async (req, res, next) => {
  const customOrders = await CustomOrder.find();

  res.status(200).json({
    success: true,
    customOrders,
  });
});

exports.getAllCustomOrdersForUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.userId;

  const customOrders = await CustomOrder.find({ user: userId });

  res.status(200).json({
    success: true,
    customOrders,
  });
});

// Get CustomOrder Details
exports.getCustomOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const customOrder = await CustomOrder.findById(req.params.id);

  if (!customOrder) {
    return next(new ErrorHander("CustomOrder not found", 404));
  }

  res.status(200).json({
    success: true,
    customOrder,
  });
});


// Get User Custom Orders
exports.getAllCustomOrdersForUser = catchAsyncErrors(async (req, res, next) => {
  const userId = req.params.userId;

  const customOrders = await CustomOrder.find({ user: userId });

  res.status(200).json({
    success: true,
    customOrders,
  });
});

// Update CustomOrder -- Admin

exports.updateCustomOrder = catchAsyncErrors(async (req, res, next) => {
  let customOrder = await CustomOrder.findById(req.params.id);

  if (!customOrder) {
    return next(new ErrorHander("CustomOrder not found", 404));
  }

  // Images Start Here
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < customOrder.images.length; i++) {
      await cloudinary.v2.uploader.destroy(customOrder.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "customOrders",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  customOrder = await CustomOrder.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    customOrder,
  });
});

// Delete CustomOrder

exports.deleteCustomOrder = catchAsyncErrors(async (req, res, next) => {
  const customOrder = await CustomOrder.findById(req.params.id);

  if (!customOrder) {
    return next(new ErrorHander("CustomOrder not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < customOrder.images.length; i++) {
    await cloudinary.v2.uploader.destroy(customOrder.images[i].public_id);
  }

  await customOrder.remove();

  res.status(200).json({
    success: true,
    message: "CustomOrder Delete Successfully",
  });
});

// Create New Review or Update the review
exports.createCustomOrderReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, customOrderId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const customOrder = await CustomOrder.findById(customOrderId);

  const isReviewed = customOrder.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    customOrder.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    customOrder.reviews.push(review);
    customOrder.numOfReviews = customOrder.reviews.length;
  }

  let avg = 0;

  customOrder.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  customOrder.ratings = avg / customOrder.reviews.length;

  await customOrder.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a customOrder
exports.getCustomOrderReviews = catchAsyncErrors(async (req, res, next) => {
  const customOrder = await CustomOrder.findById(req.query.id);

  if (!customOrder) {
    return next(new ErrorHander("CustomOrder not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: customOrder.reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const customOrder = await CustomOrder.findById(req.query.customOrderId);

  if (!customOrder) {
    return next(new ErrorHander("CustomOrder not found", 404));
  }

  const reviews = customOrder.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await CustomOrder.findByIdAndUpdate(
    req.query.customOrderId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});


exports.confirmCustomOrder = catchAsyncErrors(async (req, res, next) => {
  let customOrder = await CustomOrder.findById(req.params.orderId);

  if (!customOrder) {
    return next(new ErrorHander("Custom order not found", 404));
  }

  customOrder.status = "confirmed";

  await customOrder.save();

  res.status(200).json({
    success: true,
    message: "Custom order confirmed",
  });
});

// Decline Custom Order (For Admin)
exports.declineCustomOrder = catchAsyncErrors(async (req, res, next) => {
  let customOrder = await CustomOrder.findById(req.params.orderId);

  if (!customOrder) {
    return next(new ErrorHander("Custom order not found", 404));
  }

  customOrder.status = "declined";

  await customOrder.save();

  res.status(200).json({
    success: true,
    message: "Custom order declined",
  });
});

exports.getPendingCustomOrders = catchAsyncErrors(async (req, res, next) => {
  const pendingStatus = "pending"; // Define the pending status value

  const customOrders = await CustomOrder.find({ status: pendingStatus });

  res.status(200).json({
    success: true,
    customOrders,
  });
});
exports.getConfirmedCustomOrders = catchAsyncErrors(async (req, res, next) => {
  const confirmStatus = "confirmed"; // Define the pending status value

  const customOrders = await CustomOrder.find({ status: confirmStatus });

  res.status(200).json({
    success: true,
    customOrders,
  });
});

//Assign Custom Order

exports.assignCustomOrder = catchAsyncErrors(async (req, res) => {
  const { orderId, assignedTo } = req.body;

  console.log('Request received:', orderId, assignedTo);

  // Validate if the orderId and assignedTo fields are provided in the request body
  if (!orderId || !assignedTo) {
    return res.status(400).json({ error: 'Both orderId and assignedTo are required' });
  }

  try {
    const customOrder = await CustomOrder.findOneAndUpdate(
      { _id: orderId }, // Find the custom order by its _id
      { assignedTo, status: 'assigned' }, // Update the assignedTo field and status
      { new: true }     // Return the updated document
    );

    console.log('Custom order updated:', customOrder);

    if (!customOrder) {
      return res.status(404).json({ error: 'Custom order not found' });
    }

    return res.status(200).json({ success: true, customOrder });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get Assigned Custom Orders --Admin 

exports.getAssignedCustomOrders = catchAsyncErrors(async (req, res, next) => {
  const assignStatus = "assigned"; // Define the pending status value

  const customOrders = await CustomOrder.find({ status: assignStatus });

  res.status(200).json({
    success: true,
    customOrders,
  });
});

// Get Assigned Custom Orders --Team
exports.getCustomOrdersAssignedToUser = catchAsyncErrors(async (req, res, next) => {
  // console.log("Request received from frontend:", req.body); // Add this log statement

  
    const userId = req.user.id; // Assuming you have an authenticated user object with an 'id' property
   
    const customOrders = await CustomOrder.find({ assignedTo: userId });

    // console.log("Fetched custom orders assigned to user:", customOrders);
    res.status(200).json({
      success: true,
      customOrders,
    });
});



// Update Progress 

exports.updateProgress = catchAsyncErrors(async (req, res, next) => {
  const { orderId, progress } = req.body;

  // Validate if the orderId and progress fields are provided in the request body
  if (!orderId || progress === undefined) {
    return res.status(400).json({ error: 'Both orderId and progress are required' });
  }

  // Validate if progress is a number between 0 and 100
  if (typeof progress !== 'number' || progress < 0 || progress > 100) {
    return res.status(400).json({ error: 'Progress must be a number between 0 and 100' });
  }

  try {
    let updateFields = { progress };

    // If progress is 100, also update the status field to "completed"
    if (progress === 100) {
      updateFields.status = 'completed';
    }

    // Find the custom order by its _id and update the progress and status fields
    const customOrder = await CustomOrder.findByIdAndUpdate(
      orderId,
      updateFields,
      { new: true }
    );

    if (!customOrder) {
      return res.status(404).json({ error: 'Custom order not found' });
    }

    return res.status(200).json({ success: true, customOrder });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});


