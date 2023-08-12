const Project = require("../models/projectModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Create Project -- Admin
exports.createProject = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "projects",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const project = await Project.create(req.body);

  res.status(201).json({
    success: true,
    project,
  });
});

// Get All Project
exports.getAllProjects = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const projectsCount = await Project.countDocuments();

  const apiFeature = new ApiFeatures(Project.find(), req.query)
  

  let projects = await apiFeature.query;

 

  apiFeature.pagination(resultPerPage);

  projects = await apiFeature.query;

  res.status(200).json({
    success: true,
    projects,
    projectsCount,
    resultPerPage,
   
  });
});

// Get All Project (Admin)
exports.getAdminProjects = catchAsyncErrors(async (req, res, next) => {
  const projects = await Project.find();

  res.status(200).json({
    success: true,
    projects,
  });
});

// Get Project Details
exports.getProjectDetails = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHander("Project not found", 404));
  }

  res.status(200).json({
    success: true,
    project,
  });
});

// Update Project -- Admin

// exports.updateProject = catchAsyncErrors(async (req, res, next) => {
//   let project = await Project.findById(req.params.id);

//   if (!project) {
//     return next(new ErrorHander("Project not found", 404));
//   }

//   // Images Start Here
//   let images = [];

//   if (typeof req.body.images === "string") {
//     images.push(req.body.images);
//   } else {
//     images = req.body.images;
//   }

//   if (images !== undefined) {
//     // Deleting Images From Cloudinary
//     for (let i = 0; i < project.images.length; i++) {
//       await cloudinary.v2.uploader.destroy(project.images[i].public_id);
//     }

//     const imagesLinks = [];

//     for (let i = 0; i < images.length; i++) {
//       const result = await cloudinary.v2.uploader.upload(images[i], {
//         folder: "projects",
//       });

//       imagesLinks.push({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });
//     }

//     req.body.images = imagesLinks;
//   }

//   project = await Project.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.status(200).json({
//     success: true,
//     project,
//   });
// });

// Delete Project

exports.deleteProject = catchAsyncErrors(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHander("Project not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < project.images.length; i++) {
    await cloudinary.v2.uploader.destroy(project.images[i].public_id);
  }

  await project.remove();

  res.status(200).json({
    success: true,
    message: "Project Delete Successfully",
  });
});

// Create New Review or Update the review


// Get All Reviews of a project


// Delete Review

