import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import RepairDetails from "./RepairDetails";
import { deleteRepair } from "../../../../store/repairs";
import { dateFormatter } from "../../../../services/utils";

export default function RepairCard({ repair }) {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const openDetails = () => {
    if (showDetails) {
      setShowDetails(false);
    }
    setShowDetails(true);
  };

  //handle change in showDetails state and listen for clicks to close tbale
  useEffect(() => {
    if (!showDetails) return;

    const closeDetails = () => {
      setShowDetails(false);
    };

    //listen for click to close details
    document.addEventListener("click", closeDetails);

    //stop propagation at the details level
    const details = document.querySelector(".details") || null;
    if (details) {
      details.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    //remove listener so that card can be reopened after
    return () => {
      document.removeEventListener("click", closeDetails);
    };
  }, [showDetails]);

  const handleDelete = (e) => {
    e.stopPropagation();
    return dispatch(deleteRepair(repair.id));
  };

  return (
    <>
      <div
        onClick={openDetails}
        className="flex flex-col border-pnavy border-l-4 border-opacity-40 transition duration-200 ease-in-out hover:border-opacity-80 hover:shadow-md hover:bg-gray-50 w-full mb-4"
      >
        <div className="flex justify-between w-full px-4 pt-1  items-center pb-2 cursor-pointer">
          <div className="flex items-center">
            <i className="fas fa-chevron-circle-down pr-3 text-pnavy"></i>
            <div className="pr-3 font-medium">
              {dateFormatter(repair.created_at)}
            </div>
            <div className="text-lg font-medium">{repair.title}</div>
          </div>
          <div className="flex items-center">
            <div className="text-sm italic pr-4">{`Updated: ${dateFormatter(
              repair.updated_at
            )}`}</div>
            <i
              onClick={handleDelete}
              className="fas fa-trash opacity-50 hover:opacity-100 cursor-pointer"
            ></i>
          </div>
        </div>
        {showDetails && <RepairDetails repair={repair} />}
      </div>
    </>
  );
}
