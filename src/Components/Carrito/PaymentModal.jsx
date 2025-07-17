// src/Components/Carrito/PaymentModal.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaCreditCard, FaCalendarAlt, FaLock } from "react-icons/fa";

const PaymentModal = ({ show, onClose, onConfirmPayment, car }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .substring(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Solo números
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiry(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const number = cardNumber.replace(/\s/g, "");

    if (number.length !== 16) {
      return Swal.fire("Número inválido", "La tarjeta debe tener 16 dígitos.", "error");
    }

    if (!expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      return Swal.fire("Fecha inválida", "Formato incorrecto. Usá MM/AA.", "warning");
    }

    if (cvv.length !== 3) {
      return Swal.fire("CVV inválido", "Debe tener 3 dígitos.", "error");
    }

    Swal.fire({
      title: "Procesando...",
      text: "Confirmando pago",
      icon: "info",
      allowOutsideClick: false,
      timer: 1800,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    }).then(() => {
      onConfirmPayment();
      onClose();
      setCardNumber("");
      setExpiry("");
      setCvv("");

      Swal.fire({
        title: "¡Pago exitoso!",
        text: `Has pagado tu compra: ${car?.name}`,
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    });
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md animate__animated animate__zoomIn"
      >
        <h3 className="text-center text-2xl font-bold mb-4">CONFIRMAR PAGO</h3>

        <p className="text-center text-gray-700 mb-6">
          Estás a punto de pagar: <strong className="text-black">${car?.total?.toLocaleString()}</strong> por{" "}
          <strong>{car?.name}</strong>
        </p>

        <label className="flex items-center mb-2 font-semibold">
          <FaCreditCard className="mr-2 text-gray-600" /> Número de Tarjeta
        </label>
        <input
          type="text"
          className="w-full mb-4 p-2 border rounded text-center"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          required
        />

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="flex items-center mb-2 font-semibold">
              <FaCalendarAlt className="mr-2 text-gray-600" /> Expiración
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded text-center"
              placeholder="MM/AA"
              value={expiry}
              onChange={handleExpiryChange}
              required
            />
          </div>
          <div className="flex-1">
            <label className="flex items-center mb-2 font-semibold">
              <FaLock className="mr-2 text-gray-600" /> CVV
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded text-center"
              placeholder="123"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").substring(0, 3))}
              required
            />
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-gray-400 rounded hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Confirmar Pago
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentModal;
