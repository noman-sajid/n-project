const express = require("express");
const {
  getAllCustomOrders,
  createCustomOrder,
  updateCustomOrder,
  deleteCustomOrder,
  getCustomOrderDetails,
  createCustomOrderReview,
  getCustomOrderReviews,
  deleteReview,
  getAdminCustomOrders,
  getAllCustomOrdersForUser,
  confirmCustomOrder,
  declineCustomOrder,
  getPendingCustomOrders,
  getConfirmedCustomOrders,
  assignCustomOrder,
  getAssignedCustomOrders,
  getCustomOrdersAssignedToUser,
  updateProgress,
  getCustomerPendingCustomOrders
  
} = require("../controllers/customOrderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();
router.route("/customOrders").get(getAllCustomOrders);
router
  .route("/admin/customOrders")
  .get(isAuthenticatedUser, authorizeRoles("admin", "team"), getAdminCustomOrders);


  // Get All Custom Orders (For User)
  router.route("/custom-orders/:userId").get(isAuthenticatedUser, getAllCustomOrdersForUser);
  
router
  .route("/admin/customOrder/new")
  .post(isAuthenticatedUser, createCustomOrder);
router
  .route("/admin/customOrder/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin", "team"), updateCustomOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin", "team"), deleteCustomOrder);
router.route("/customOrder/:id").get(getCustomOrderDetails);
router.route("/review").put(isAuthenticatedUser, createCustomOrderReview);
router
  .route("/reviews")
  .get(getCustomOrderReviews)
  .delete(isAuthenticatedUser, deleteReview);

  // Customer Pending Orders

  router.get(
    "/user/pending", 
    isAuthenticatedUser,
    getCustomerPendingCustomOrders
  )

  // Confirm Custom Order (For Admin)
router.put(
  "/admin/custom-orders/:orderId/confirm",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  confirmCustomOrder
);

// Decline Custom Order (For Admin)
router.put(
  "/admin/custom-orders/:orderId/decline",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  declineCustomOrder
);

router.get(
  "/admin/custom-orders/pending",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getPendingCustomOrders
)
router.get(
  "/admin/custom-orders/confirmed",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getConfirmedCustomOrders
)

router.put(
  "/customOrders/assign",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  assignCustomOrder
);

router.get(
  "/admin/custom-orders/assigned",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAssignedCustomOrders
)

router.get(
  "/admin/assigned-order/me",
  isAuthenticatedUser,
  authorizeRoles("team"),
  getCustomOrdersAssignedToUser
)

router.put(
  "/admin/custom-orders/progress",
  isAuthenticatedUser,
  authorizeRoles("team"),
  updateProgress
)




module.exports = router;