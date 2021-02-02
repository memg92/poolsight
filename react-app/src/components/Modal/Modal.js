import React, { useEffect } from "react";

export default function Modal(props) {
  useEffect(() => {
    //helper function to close modal
    const closeModal = () => {
      props.setShowModal(false);
    };

    //listen outside for clicks to close modal
    document.addEventListener("click", closeModal);

    //prevent modal from closing when user clicks inside modal elements
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    //cleanup func: remove event listeners
    return () => document.removeEventListener("click", closeModal);
  }, []);

  return (
    props.showModal && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50">
        <div className="mt-20 mx-auto max-w-xl shadow-lg">
          <div className="modal animate-scale-in-center bg-ghost flex flex-col justify-center rounded-lg px-6 py-4 w-full">
            {props.children}
          </div>
        </div>
      </div>
    )
  );
}
