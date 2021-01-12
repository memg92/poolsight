import React, { useState } from "react";
import { useSelector } from "react-redux";
import NewRepairForm from "./NewRepairForm";
import RepairCard from "./RepairCard";

export default function Repairs() {
  const [formOpen, setFormOpen] = useState(false);
  const repairs = useSelector((state) => state.repairAPI.clientRepairs);

  const toggleForm = () => {
    if (formOpen) {
      return setFormOpen(false);
    }
    setFormOpen(true);
  };

  return (
    <div className="my-2 px-6 py-4 text-pnavy text-opacity-90 w-full max-w-3xl">
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-2xl font-semibold">Repair History</h1>
        <i
          className={`${
            formOpen ? "fas fa-minus" : "fas fa-plus"
          } text-pnavy cursor-pointer hover:bg-pblue hover:bg-opacity-70 p-0.5 rounded`}
          onClick={toggleForm}
        ></i>
      </div>
      {formOpen && (
        <NewRepairForm formOpen={formOpen} setFormOpen={setFormOpen} />
      )}
      {repairs.map((repair) => {
        return <RepairCard key={repair.id} repair={repair} />;
      })}
    </div>
  );
}
