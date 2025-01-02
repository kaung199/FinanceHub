import React, { useEffect } from "react";
import ReactDom from "react-dom";
export default function DetailedModal({ children }) {
  return ReactDom.createPortal(
    <>{children}</>,
    document.getElementById("modal")
  );
}
