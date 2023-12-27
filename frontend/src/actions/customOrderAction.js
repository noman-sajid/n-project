import axios from "axios";

import {
  ALL_CUSTOM_ORDER_FAIL,
  ALL_CUSTOM_ORDER_REQUEST,
  ALL_CUSTOM_ORDER_SUCCESS,
  ADMIN_CUSTOM_ORDER_REQUEST,
  ADMIN_CUSTOM_ORDER_SUCCESS,
  ADMIN_CUSTOM_ORDER_FAIL,
  NEW_CUSTOM_ORDER_REQUEST,
  NEW_CUSTOM_ORDER_SUCCESS,
  NEW_CUSTOM_ORDER_FAIL,
  UPDATE_CUSTOM_ORDER_REQUEST,
  UPDATE_CUSTOM_ORDER_SUCCESS,
  UPDATE_CUSTOM_ORDER_FAIL,
  DELETE_CUSTOM_ORDER_REQUEST,
  DELETE_CUSTOM_ORDER_SUCCESS,
  DELETE_CUSTOM_ORDER_FAIL,
  CUSTOM_ORDER_DETAILS_REQUEST,
  CUSTOM_ORDER_DETAILS_FAIL,
  CUSTOM_ORDER_DETAILS_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  MY_CUSTOM_ORDERS_REQUEST,
  MY_CUSTOM_ORDERS_SUCCESS,
  MY_CUSTOM_ORDERS_FAIL,
  CONFIRM_CUSTOM_ORDER_REQUEST,
  CONFIRM_CUSTOM_ORDER_SUCCESS,
  CONFIRM_CUSTOM_ORDER_RESET,
  CONFIRM_CUSTOM_ORDER_FAIL,
  DECLINE_CUSTOM_ORDER_REQUEST,
  DECLINE_CUSTOM_ORDER_SUCCESS,
  DECLINE_CUSTOM_ORDER_RESET,
  DECLINE_CUSTOM_ORDER_FAIL,
  PENDING_CUSTOM_ORDER_REQUEST,
  PENDING_CUSTOM_ORDER_SUCCESS,
  PENDING_CUSTOM_ORDER_FAIL,
  CONFIRMED_CUSTOM_ORDER_REQUEST,
  CONFIRMED_CUSTOM_ORDER_SUCCESS,
  CONFIRMED_CUSTOM_ORDER_FAIL,
  ASSIGN_CUSTOM_ORDER_REQUEST,
  ASSIGN_CUSTOM_ORDER_SUCCESS,
  ASSIGN_CUSTOM_ORDER_FAIL,
  ASSIGNED_CUSTOM_ORDER_REQUEST,
  ASSIGNED_CUSTOM_ORDER_SUCCESS,
  ASSIGNED_CUSTOM_ORDER_FAIL,
  ASSIGNED_TO_CUSTOM_ORDER_REQUEST,
  ASSIGNED_TO_CUSTOM_ORDER_SUCCESS,
  ASSIGNED_TO_CUSTOM_ORDER_FAIL,
  UPDATE_PROGRESS_REQUEST,
  UPDATE_PROGRESS_SUCCESS,
  UPDATE_PROGRESS_FAIL ,  
  C_PENDING_TO_CUSTOM_ORDER_REQUEST,
  C_PENDING_TO_CUSTOM_ORDER_SUCCESS,
  C_PENDING_TO_CUSTOM_ORDER_FAIL ,
  CLEAR_ERRORS,
} from "../constants/customOrderConstants";

// Get All CustomOrders
export const getCustomOrder =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_CUSTOM_ORDER_REQUEST });

      let link = `/api/v1/customOrders?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/customOrders?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_CUSTOM_ORDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_CUSTOM_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All CustomOrders For Admin
export const getAdminCustomOrder = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CUSTOM_ORDER_REQUEST });

    const { data } = await axios.get("/api/v1/admin/customOrders");

    dispatch({
      type: ADMIN_CUSTOM_ORDER_SUCCESS,
      payload: data.customOrders,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CUSTOM_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create CustomOrder
export const createCustomOrder = (customOrderData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CUSTOM_ORDER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/customOrder/new`,
      customOrderData,
      config
    );

    dispatch({
      type: NEW_CUSTOM_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CUSTOM_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update CustomOrder
export const updateCustomOrder = (id, customOrderData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CUSTOM_ORDER_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/customOrder/${id}`,
      customOrderData,
      config
    );

    dispatch({
      type: UPDATE_CUSTOM_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CUSTOM_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//User Pending Custom Orders 

// export const getCustomerPendingCustomOrders = () => async (dispatch) => {
//   try {
//     dispatch({ type: CUSTOMER_PENDING_CUSTOM_ORDERS_REQUEST });

//     const { data } = await axios.get(`/api/v1/user/pending`);

//     dispatch({
//       type: CUSTOMER_PENDING_CUSTOM_ORDERS_SUCCESS,
//       payload: data.customOrders,
//     });
//   } catch (error) {
//     dispatch({
//       type: CUSTOMER_PENDING_CUSTOM_ORDERS_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Delete CustomOrder
export const deleteCustomOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CUSTOM_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/customOrder/${id}`);

    dispatch({
      type: DELETE_CUSTOM_ORDER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CUSTOM_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get CustomOrders Details
export const getCustomOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOM_ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/customOrder/${id}`);

    dispatch({
      type: CUSTOM_ORDER_DETAILS_SUCCESS,
      payload: data.customOrder,
    });
  } catch (error) {
    dispatch({
      type: CUSTOM_ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// NEW REVIEW
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/review`, reviewData, config);

    dispatch({
      type: NEW_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Reviews of a CustomOrder
export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

    dispatch({
      type: ALL_REVIEW_SUCCESS,
      payload: data.reviews,
    });
  } catch (error) {
    dispatch({
      type: ALL_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Review of a CustomOrder
export const deleteReviews = (reviewId, customOrderId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?id=${reviewId}&customOrderId=${customOrderId}`
    );

    dispatch({
      type: DELETE_REVIEW_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get User Custom Order 

export const myCustomOrders = (userId) => async (dispatch) => {
  try {
    dispatch({ type: MY_CUSTOM_ORDERS_REQUEST });

    const { data } = await axios.get(`/api/v1/custom-orders/${userId}`);

    dispatch({
      type: MY_CUSTOM_ORDERS_SUCCESS,
      payload: data.customOrders,
    });
  } catch (error) {
    dispatch({
      type: MY_CUSTOM_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// CONFIRM CUSTOM ORDER

export const confirmCustomOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: CONFIRM_CUSTOM_ORDER_REQUEST });

    const { data } = await axios.put(`/api/v1/admin/custom-orders/${orderId}/confirm`);

    dispatch({
      type: CONFIRM_CUSTOM_ORDER_SUCCESS,
      payload: data.customOrder,
    });
  } catch (error) {
    dispatch({
      type: CONFIRM_CUSTOM_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//DECLINE CUSTOM ORDER

export const declineCustomOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: DECLINE_CUSTOM_ORDER_REQUEST });

    const { data } = await axios.put(`/api/v1/admin/custom-orders/${orderId}/decline`);

    dispatch({
      type: DECLINE_CUSTOM_ORDER_SUCCESS,
      payload: data.customOrder,
    });
  } catch (error) {
    dispatch({
      type: DECLINE_CUSTOM_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//CONFIRMED CUSTOM ORDERS

export const getConfirmedCustomOrders = () => async (dispatch) => {
  try {
    dispatch({ type: CONFIRMED_CUSTOM_ORDER_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/custom-orders/confirmed`);
    console.log(data.customOrders);

    dispatch({
      type:  CONFIRMED_CUSTOM_ORDER_SUCCESS,
      payload: data.customOrders,
    });
  } catch (error) {
    dispatch({
      type: CONFIRMED_CUSTOM_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//PENDING CUSTOM ORDERS --ADMIN

export const getPendingCustomOrders = () => async (dispatch) => {
  try {
    dispatch({ type: PENDING_CUSTOM_ORDER_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/custom-orders/pending`);
    console.log(data.customOrders);

    dispatch({
      type: PENDING_CUSTOM_ORDER_SUCCESS,
      payload: data.customOrders,
    });
  } catch (error) {
    dispatch({
      type: PENDING_CUSTOM_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};


//Assign Order

export const assignCustomOrder = (orderId, assignedTo) => async (dispatch) => {
  try {
    console.log('Assigning custom order:', orderId, assignedTo);

    dispatch({ type: ASSIGN_CUSTOM_ORDER_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const assignData = {
      orderId,
      assignedTo,
    };

    const { data } = await axios.put(`/api/v1/customOrders/assign`, assignData, config);

    console.log('Custom order assigned:', data.customOrder);

    dispatch({
      type: ASSIGN_CUSTOM_ORDER_SUCCESS,
      payload: data.customOrder,
    });
  } catch (error) {
    console.error('Error assigning custom order:', error);

    dispatch({
      type: ASSIGN_CUSTOM_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};


  // Get Assigned Custom Orders 

  export const getAssignedCustomOrders = () => async (dispatch) => {
    try {
      dispatch({ type: ASSIGNED_CUSTOM_ORDER_REQUEST });
  
      const { data } = await axios.get(`/api/v1/admin/custom-orders/assigned`);
      console.log(data.customOrders);
  
      dispatch({
        type: ASSIGNED_CUSTOM_ORDER_SUCCESS,
        payload: data.customOrders,
      });
    } catch (error) {
      dispatch({
        type: ASSIGNED_CUSTOM_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get Assigned To 
// export const getAssignedToCustomOrders = () => async (dispatch) => {
//   try {
//     dispatch({ type: ASSIGNED_TO_CUSTOM_ORDER_REQUEST });

//     const { data } = await axios.get(`/admin/custom-orders/assigned-to-user`);
//     console.log(data.assignedOrders);

//     dispatch({
//       type: ASSIGNED_TO_CUSTOM_ORDER_SUCCESS,
//       payload: data.assignedOrders,
//     });
//   } catch (error) {
//     dispatch({
//       type: ASSIGNED_TO_CUSTOM_ORDER_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };



// export const getAssignedToCustomOrders = () => async (dispatch) => {
//   try {
//     const response = await axios.get('/admin/custom-orders/assigned-to-user'); // Adjust the API endpoint as needed
//     const assignedOrders = response.data;

//     dispatch({ type: 'ASSIGNED_TO_CUSTOM_ORDER_SUCCESS', payload: assignedOrders });
//   } catch (error) {
//     dispatch({ type: 'ASSIGNED_TO_CUSTOM_ORDER_FAIL', payload: error.message });
//   }
// };

export const myAssignedCustomOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ASSIGNED_TO_CUSTOM_ORDER_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/assigned-order/me`);
    console.log('Fetched custom orders:', data.customOrders);
    dispatch({
      type: ASSIGNED_TO_CUSTOM_ORDER_SUCCESS,
      payload: data.customOrders,
    });
  } catch (error) {
    dispatch({
      type: ASSIGNED_TO_CUSTOM_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//UPDATE PROGRESS OF A CUSTOM ORDER

export const updateProgress = (orderId, progress) => async (dispatch) => {
  try {
    console.log('Updating progress:', orderId, progress);

    dispatch({ type: UPDATE_PROGRESS_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const updateData = {
      orderId,
      progress,
    };

    const { data } = await axios.put(`/api/v1/admin/custom-orders/progress`, updateData, config);

    console.log('Progress updated:', data.customOrder);

    dispatch({
      type: UPDATE_PROGRESS_SUCCESS,
      payload: data.customOrder,
    });
  } catch (error) {
    console.error('Error updating progress:', error);

    dispatch({
      type: UPDATE_PROGRESS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//USER PENDING CUSTOM ORDER

export const myPendingCustomOrders = () => async (dispatch) => {
  try {
    dispatch({ type: C_PENDING_TO_CUSTOM_ORDER_REQUEST });

    const { data } = await axios.get(`/api/v1/user/pending`);
    console.log('Fetched custom orders:', data.customOrders);
    dispatch({
      type: C_PENDING_TO_CUSTOM_ORDER_SUCCESS,
      payload: data.customOrders,
    });
  } catch (error) {
    dispatch({
      type: C_PENDING_TO_CUSTOM_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
