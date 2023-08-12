import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../Cart/CheckoutSteps";
import MetaData from "../layout/MetaData";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import "./payment.css";



const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const alert = useAlert();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const [loading, setLoading] = useState(true);

  const paymentData = {
    amount: Math.round(orderInfo?.totalPrice * 100) || 0,
  };

  const createOrderOnSuccess = (data, actions) => {
    const order = {
      shippingInfo,
      orderItems: cartItems,
      itemsPrice: orderInfo.subtotal,
      taxPrice: orderInfo.tax,
      shippingPrice: orderInfo.shippingCharges,
      totalPrice: orderInfo.totalPrice,
    };

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: paymentData.amount / 100,
          },
        },
      ],
    });
  };

  const onApprovePayment = async (data, actions) => {
    try {
      const orderID = data.orderID;

      // Make a request to your server to execute the PayPal payment
      const response = await axios.get(`/api/v1/payment/execute?orderID=${orderID}`);
      const { success, payment } = response.data;

      if (success) {
        const order = {
          shippingInfo,
          orderItems: cartItems,
          itemsPrice: orderInfo.subtotal,
          taxPrice: orderInfo.tax,
          shippingPrice: orderInfo.shippingCharges,
          totalPrice: orderInfo.totalPrice,
        };

        order.paymentInfo = {
          id: payment.id,
          status: payment.status,
        };

        dispatch(createOrder(order));

        history.push("/success");
      } else {
        alert.error("There's some issue while processing payment");
      }
    } catch (error) {
      alert.error(error.response.data.message || "Error executing payment");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  const handlePayButtonClick = () => {
    payBtn.current.disabled = true;
  };

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm">
          {/* Add your payment form content here */}
          <div className="orderSummary">
              <h2 className="orderSummary-p">Order Summary</h2>
            <div>
              <div className="orderInfoRow">
                <p>Subtotal:</p>
                <span>${orderInfo?.itemsPrice}</span>
              </div>
              <div className="orderInfoRow">
                <p>Shipping Charges:</p>
                <span>${orderInfo?.shippingPrice}</span>
              </div>
              <div className="orderInfoRow">
                <p>GST:</p>
                <span>${orderInfo?.taxPrice}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>${orderInfo?.totalPrice}</span>
            </div>
          </div>


          <PayPalScriptProvider options={{ "client-id": "AcLfXnzCucW4hS7y6i2I6bq7UK5c8itkq9hcO_0dZRBzk1PCIUq_mMBcfUM0C1BcMiAHElg8ttGyyHf0" }}>
            <PayPalButtons
              createOrder={createOrderOnSuccess}
              onApprove={onApprovePayment}
              style={{ color: "blue", shape: "rect", label: "pay" }}
            />
          </PayPalScriptProvider>

        
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
