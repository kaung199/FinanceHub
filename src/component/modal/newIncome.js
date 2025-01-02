import React, { useState } from "react";
import ReactDom from "react-dom";

export default function NewIncomeModal({ children }) {
  return ReactDom.createPortal(
    <>{children}</>,
    document.getElementById("modal")
  );
}
