import React, { useState } from "react";
import { useDispatch } from "react-redux";
import RepairDetails from "./RepairDetails";
import { deleteRepair } from "../../../../store/repairs";
import { dateFormatter } from "../../../../services/utils";
import EditRepairForm from "./EditRepairForm";

export default function RepairCard({ repair }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showRepairModal, setShowRepairModal] = useState(false);

  const dispatch = useDispatch();

  const toggleDetails = (e) => {
    if (showDetails) {
      setShowDetails(false);
    } else {
      setShowDetails(true);
    }
  };

  const closeModal = () => {
    setShowRepairModal(false);
    document.removeEventListener("click", closeModal);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setShowRepairModal(true);
    return document.addEventListener("click", closeModal);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    return dispatch(deleteRepair(repair.id));
  };

  return (
    <>
      <div
        className="flex flex-col border-pnavy border-l-4 border-opacity-40 transition duration-200 ease-in-out hover:border-opacity-80 hover:shadow-md hover:bg-gray-50
        w-full mb-4"
      >
        <div
          onClick={toggleDetails}
          className="flex justify-between w-full px-4 pt-1  items-center pb-2 cursor-pointer"
        >
          <div className="flex items-center">
            <i
              className={`fas ${
                showDetails ? "fa-chevron-circle-up" : "fa-chevron-circle-down"
              } pr-3 text-pnavy`}
            ></i>
            <div className="pr-3 font-medium">
              {dateFormatter(repair.created_at)}
            </div>
            <div className="text-lg font-medium">{repair.title}</div>
          </div>
          <div className="flex items-center">
            <div className="text-sm italic pr-3">{`Updated: ${dateFormatter(
              repair.updated_at
            )}`}</div>
            <i
              onClick={handleEditClick}
              className="fas fa-edit opacity-50 hover:opacity-100 cursor-pointer pr-2"
            ></i>
            <i
              onClick={handleDelete}
              className="fas fa-trash opacity-50 hover:opacity-100 cursor-pointer"
            ></i>
          </div>
        </div>
        {showDetails && <RepairDetails repair={repair} />}
      </div>
      {
        <EditRepairForm
          repair={repair}
          showRepairModal={showRepairModal}
          setShowRepairModal={setShowRepairModal}
        />
      }
    </>
  );
}
