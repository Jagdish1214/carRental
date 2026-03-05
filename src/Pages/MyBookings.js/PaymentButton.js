import React, { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import { toast } from "react-toastify";
import "./PaymentButton.css";

const PaymentButton = ({ bookingId, amount }) => {
  const [method, setMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // ✅ Fetch payment status from backend
  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await api.get(
          `http://localhost:8080/api/payment/status/${bookingId}`
        );
        setPaymentStatus(response.data);
      } catch (error) {
        console.log("No payment found yet");
      }
    };

    fetchPaymentStatus();
  }, [bookingId]);

  const handlePayment = async () => {

    // 🟢 CASH ON DELIVERY
    if (method === "cash") {
      try {
        setLoading(true);

        await api.post(
          `http://localhost:8080/api/payment/cash/${bookingId}`
        );

        toast.success("Cash on Delivery Selected ✅");
        window.location.reload();
      } catch (error) {
        toast.error("Failed to select Cash option");
      } finally {
        setLoading(false);
      }

      return;
    }

    // 🔵 ONLINE PAYMENT
    try {
      setLoading(true);

      const { data } = await api.post(
        `http://localhost:8080/api/payment/create-order/${bookingId}`
      );

      const options = {
        key: "rzp_test_SHEQrlpNivT7rT",
        amount: data.amount,
        currency: data.currency,
        name: "UrbanRentals",
        description: "Car Booking Payment",
        order_id: data.id,

        handler: async function (response) {
          try {
            await api.post(
              "http://localhost:8080/api/payment/verify",
              null,
              {
                params: {
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature
                }
              }
            );

            toast.success("Payment Successful 🎉");
            window.location.reload();
          } catch (err) {
            toast.error("Payment Verification Failed");
          }
        },

        theme: {
          color: "#0d6efd"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Payment Initialization Failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ If payment status from backend is SUCCESS → show PAID
  if (paymentStatus === "SUCCESS") {
    return (
      <div className="payment-wrapper">
        <span className="badge bg-success w-100 p-2">
          PAID ✅
        </span>
      </div>
    );
  }

  return (
    <div className="payment-wrapper">
      <select
        className="form-select mb-2"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option value="upi">UPI (Pay Now)</option>
        <option value="card">Card (Pay Now)</option>
        <option value="cash">Cash on Delivery</option>
      </select>

      <button
        onClick={handlePayment}
        className={`btn w-100 ${
          method === "cash" ? "btn-success" : "btn-primary"
        }`}
        disabled={loading}
      >
        {loading
          ? "Processing..."
          : method === "cash"
          ? "Confirm Cash on Delivery"
          : `Pay ₹${amount}`}
      </button>
    </div>
  );
};

export default PaymentButton;