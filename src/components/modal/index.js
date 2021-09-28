import React, { useEffect, useRef } from "react";
import "./modal.scss";

const Modal = (props) => {
  const modalRef = useRef(null);
  const { children, customClassName, toggle, show } = props;

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      window.addEventListener("click", windowOnClick);
    }
    return () => {
      window.removeEventListener("click", windowOnClick);
      document.body.style.overflow = "";
    };
  }, [show]);

  function windowOnClick(event) {
    if (event.target === modalRef.current) {
      toggle();
    }
  }

  return (
    <div id="modal-wrapper" ref={modalRef} className={`modal ${show ? "modal-show" : ""}`}>
      <div className={`modal-content ${customClassName}`}>
        <span onClick={toggle} className="modal-button-close">
          x
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
