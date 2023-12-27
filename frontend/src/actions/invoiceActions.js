import axios from "axios";

// Invoice action types
export const CREATE_INVOICE_REQUEST = "CREATE_INVOICE_REQUEST";
export const CREATE_INVOICE_SUCCESS = "CREATE_INVOICE_SUCCESS";
export const CREATE_INVOICE_FAIL = "CREATE_INVOICE_FAIL";
export const CLEAR_INVOICE_ERRORS = "CLEAR_INVOICE_ERRORS";

// Create an invoice
export const createInvoice = (invoiceData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_INVOICE_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    // Replace '/api/invoices' with the actual endpoint for creating invoices
    const { data } = await axios.post("/api/invoices", invoiceData, config);

    dispatch({
      type: CREATE_INVOICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_INVOICE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear invoice errors
export const clearInvoiceErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_INVOICE_ERRORS });
};
