const express = require("express");
const {
  getAllProjects,
  createProject,
  // updateProject,
  deleteProject,
  getProjectDetails,

  getAdminProjects,
} = require("../controllers/projectController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/projects").get(getAllProjects);


router
  .route("/admin/projects")
  .get(isAuthenticatedUser, authorizeRoles("admin", "team"), getAdminProjects);

router
  .route("/admin/project/new")
  .post(isAuthenticatedUser, authorizeRoles("admin", "team"), createProject);

router
  .route("/admin/project/:id")
  // .put(isAuthenticatedUser, authorizeRoles("admin", "team"), updateProject)
  .delete(isAuthenticatedUser, authorizeRoles("admin", "team"), deleteProject);

router.route("/project/:id").get(getProjectDetails);




module.exports = router;
