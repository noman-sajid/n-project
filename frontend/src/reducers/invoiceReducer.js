import {
    CREATE_INVOICE_REQUEST,
    CREATE_INVOICE_SUCCESS,
    CREATE_INVOICE_FAIL,
    CLEAR_INVOICE_ERRORS,
  } from "../constants/invoiceConstants";
  
  export const invoiceReducer = (state = { invoice: {} }, action) => {
    switch (action.type) {
      case CREATE_INVOICE_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case CREATE_INVOICE_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          invoice: action.payload.invoice,
        };
      case CREATE_INVOICE_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_INVOICE_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  