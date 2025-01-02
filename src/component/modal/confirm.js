import React from "react";
import ReactDom from "react-dom";
export default function ConfirmModal({ children }) {
  return ReactDom.createPortal(
    <>{children}</>,
    document.getElementById("modal")
  );
}
