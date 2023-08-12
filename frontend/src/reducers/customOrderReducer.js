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
    NEW_CUSTOM_ORDER_RESET,
    UPDATE_CUSTOM_ORDER_REQUEST,
    UPDATE_CUSTOM_ORDER_SUCCESS,
    UPDATE_CUSTOM_ORDER_FAIL,
    UPDATE_CUSTOM_ORDER_RESET,
    DELETE_CUSTOM_ORDER_REQUEST,
    DELETE_CUSTOM_ORDER_SUCCESS,
    DELETE_CUSTOM_ORDER_FAIL,
    DELETE_CUSTOM_ORDER_RESET,
    CUSTOM_ORDER_DETAILS_REQUEST,
    CUSTOM_ORDER_DETAILS_FAIL,
    CUSTOM_ORDER_DETAILS_SUCCESS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
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
    CLEAR_ERRORS,
    PENDING_CUSTOM_ORDER_SUCCESS,
    PENDING_CUSTOM_ORDER_FAIL,
    PENDING_CUSTOM_ORDER_REQUEST,
    CONFIRMED_CUSTOM_ORDER_SUCCESS,
    CONFIRMED_CUSTOM_ORDER_FAIL,
    CONFIRMED_CUSTOM_ORDER_REQUEST,
    ASSIGN_CUSTOM_ORDER_REQUEST,
    ASSIGN_CUSTOM_ORDER_SUCCESS,
    ASSIGN_CUSTOM_ORDER_FAIL,
    ASSIGN_CUSTOM_ORDER_RESET,
    ASSIGNED_CUSTOM_ORDER_SUCCESS,
    ASSIGNED_CUSTOM_ORDER_FAIL,
    ASSIGNED_CUSTOM_ORDER_REQUEST,
    ASSIGNED_TO_CUSTOM_ORDER_SUCCESS,
    ASSIGNED_TO_CUSTOM_ORDER_FAIL,
    ASSIGNED_TO_CUSTOM_ORDER_REQUEST,
    UPDATE_PROGRESS_REQUEST,
    UPDATE_PROGRESS_SUCCESS,
    UPDATE_PROGRESS_FAIL,
    UPDATE_PROGRESS_RESET,

  } from "../constants/customOrderConstants";
  
  export const customOrdersReducer = (state = { customOrders: [] }, action) => {
    switch (action.type) {
      case ALL_CUSTOM_ORDER_REQUEST:
      case ADMIN_CUSTOM_ORDER_REQUEST:
        return {
          loading: true,
          customOrders: [],
        };
      case ALL_CUSTOM_ORDER_SUCCESS:
        return {
          loading: false,
          customOrders: action.payload.customOrders,
          customOrdersCount: action.payload.customOrdersCount,
          resultPerPage: action.payload.resultPerPage,
          filteredCustomOrdersCount: action.payload.filteredCustomOrdersCount,
        };
  
      case ADMIN_CUSTOM_ORDER_SUCCESS:
        return {
          loading: false,
          customOrders: action.payload,
        };
      case ALL_CUSTOM_ORDER_FAIL:
      case ADMIN_CUSTOM_ORDER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const newCustomOrderReducer = (state = { customOrder: {} }, action) => {
    switch (action.type) {
      case NEW_CUSTOM_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_CUSTOM_ORDER_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          customOrder: action.payload.customOrder,
        };
      case NEW_CUSTOM_ORDER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_CUSTOM_ORDER_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

  //My Custom Orders Reducer

  export const myCustomOrdersReducer = function (state = { customOrders: [] }, action) {
    switch (action.type) {
      case MY_CUSTOM_ORDERS_REQUEST:
        return {
          loading: true,
        };

        case MY_CUSTOM_ORDERS_SUCCESS:
          return {
            loading: false,
            customOrders: action.payload, 
          };

      case MY_CUSTOM_ORDERS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };

      default:
        return state;
    }
  };
  
  export const customOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_CUSTOM_ORDER_REQUEST:
      case UPDATE_CUSTOM_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_CUSTOM_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_CUSTOM_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_CUSTOM_ORDER_FAIL:
      case UPDATE_CUSTOM_ORDER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_CUSTOM_ORDER_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_CUSTOM_ORDER_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const customOrderDetailsReducer = (state = { customOrder: {} }, action) => {
    switch (action.type) {
      case CUSTOM_ORDER_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case CUSTOM_ORDER_DETAILS_SUCCESS:
        return {
          loading: false,
          customOrder: action.payload,
        };
      case CUSTOM_ORDER_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
      case NEW_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_REVIEW_SUCCESS:
        return {
          loading: false,
          success: action.payload,
        };
      case NEW_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_REVIEW_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const customOrderReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
      case ALL_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ALL_REVIEW_SUCCESS:
        return {
          loading: false,
          reviews: action.payload,
        };
      case ALL_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };


 export const confirmCustomOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CONFIRM_CUSTOM_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CONFIRM_CUSTOM_ORDER_SUCCESS:
      return {
        loading: false,
        success: true, // Set success property to true
      };
    case CONFIRM_CUSTOM_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CONFIRM_CUSTOM_ORDER_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const declineCustomOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case DECLINE_CUSTOM_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DECLINE_CUSTOM_ORDER_SUCCESS:
      return {
        loading: false,
        success: true, // Set success property to true
      };
    case DECLINE_CUSTOM_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DECLINE_CUSTOM_ORDER_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
  
  
  export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_REVIEW_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_REVIEW_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_REVIEW_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_REVIEW_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  


  export const pendingCustomOrdersReducer = function (state = { customOrders: [] }, action) {
    switch (action.type) {
      case PENDING_CUSTOM_ORDER_REQUEST:
        return {
          loading: true,
        };

        case PENDING_CUSTOM_ORDER_SUCCESS:
          return {
            loading: false,
            customOrders: action.payload, // Update 'orders' to 'customOrders'
          };

      case PENDING_CUSTOM_ORDER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };

      default:
        return state;
    }
  };


  export const confrimedCustomOrdersReducer = function (state = { customOrders: [] }, action) {
    switch (action.type) {
      case  CONFIRMED_CUSTOM_ORDER_REQUEST:
        return {
          loading: true,
        };

        case  CONFIRMED_CUSTOM_ORDER_SUCCESS:
          return {
            loading: false,
            customOrders: action.payload, // Update 'orders' to 'customOrders'
          };

      case  CONFIRMED_CUSTOM_ORDER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };

      default:
        return state;
    }
  };


  export const assignCustomOrderReducer = (state = {}, action) => {
    switch (action.type) {
      case  ASSIGN_CUSTOM_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case  ASSIGN_CUSTOM_ORDER_SUCCESS:
        return {
          loading: false,
          success: true, // Set success property to true
          customOrders: action.payload,
        };
      case  ASSIGN_CUSTOM_ORDER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case  ASSIGN_CUSTOM_ORDER_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  

  export const assignedCustomOrdersReducer = function (state = { customOrders: [] }, action) {
    switch (action.type) {
      case ASSIGNED_CUSTOM_ORDER_REQUEST:
        return {
          loading: true,
        };

        case ASSIGNED_CUSTOM_ORDER_SUCCESS:
          return {
            loading: false,
            customOrders: action.payload, // Update 'orders' to 'customOrders'
          };

      case ASSIGNED_CUSTOM_ORDER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };

      default:
        return state;
    }
  };


  // Get Assigned Order for team

  // export const assignedToCustomOrdersReducer = function (state = { assignedOrders: [] }, action) {
  //   switch (action.type) {
  //     case ASSIGNED_TO_CUSTOM_ORDER_REQUEST:
  //       return {
  //         ...state, // Spread the existing state properties
  //         loading: true,
  //       };
  
  //     case ASSIGNED_TO_CUSTOM_ORDER_SUCCESS:
  //       return {
  //         loading: false,
  //         assignedOrders: action.payload,
  //       };
  
  //     case ASSIGNED_TO_CUSTOM_ORDER_FAIL:
  //       return {
  //         loading: false,
  //         error: action.payload,
  //       };
  
  //     case CLEAR_ERRORS:
  //       return {
  //         ...state,
  //         error: null,
  //       };
  
  //     default:
  //       return state;
  //   }
  // };

  // export const assignedToCustomOrdersReducer  = (state = initialState, action) => {
  //   switch (action.type) {
  //     case 'ASSIGNED_TO_CUSTOM_ORDER_REQUEST':
  //       return {
  //         ...state,
  //         assignedOrders: action.payload,
  //         error: null,
  //       };
  //     case 'ASSIGNED_TO_CUSTOM_ORDER_FAIL':
  //       return {
  //         ...state,
  //         assignedOrders: [],
  //         error: action.payload,
  //       };
  //     default:
  //       return state;
  //   }
  // };
  
  

  export const myAssignedCustomOrdersReducer = function (state = { customOrders: [] }, action) {
    switch (action.type) {
      case ASSIGNED_TO_CUSTOM_ORDER_REQUEST:
        return {
          loading: true,
        };
  
      case ASSIGNED_TO_CUSTOM_ORDER_SUCCESS:
        console.log('Reducer - Custom orders:', action.payload);
        return {
          loading: false,
          customOrders: action.payload, 
        };
  
      case ASSIGNED_TO_CUSTOM_ORDER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };


  export const updateProgressReducer = (state = {}, action) => {
    switch (action.type) {
      case   UPDATE_PROGRESS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case   UPDATE_PROGRESS_SUCCESS:
        return {
          loading: false,
          success: true, // Set success property to true
          customOrders: action.payload,
        };
      case   UPDATE_PROGRESS_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case   UPDATE_PROGRESS_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  