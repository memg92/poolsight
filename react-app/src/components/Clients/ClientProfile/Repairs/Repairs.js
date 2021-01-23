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
    <div className="my-2 px-6 py-4 text-pnavy text-opacity-90 w-full max-w-4xl">
      <div className="flex justify-between items-center pb-2">
        <h1 className="text-3xl font-semibold">Repair History</h1>
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
      {repairs.length ? (
        <div></div>
      ) : (
        <div className={formOpen ? "hidden" : "py-2"}>
          <h1 className="text-pnavy mb-2">
            You have no repairs for this client.
          </h1>
          <div
            onClick={toggleForm}
            className="text-ghost font-bold p-1 w-28 text-center bg-pnavy bg-opacity-80 hover:bg-opacity-90 cursor-pointer rounded"
          >
            Add a repair!
          </div>
        </div>
      )}
      {repairs.map((repair) => {
        return <RepairCard key={repair.id} repair={repair} />;
      })}
    </div>
  );
}
