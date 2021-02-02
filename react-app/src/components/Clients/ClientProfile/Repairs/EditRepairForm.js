import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editRepair } from "../../../../store/repairs";
import Modal from "../../../Modal/Modal";

export default function EditRepairForm({ repair, showModal, setShowModal }) {
  const pools = useSelector((state) => state.poolAPI.clientPools);
  const [error, setError] = useState("");
  const [poolId, setPoolId] = useState(repair.pool_id);
  const [title, setTitle] = useState(repair.title);
  const [description, setDescription] = useState(repair.description);
  const dispatch = useDispatch();

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    return dispatch(editRepair(repair.id, poolId, title, description)).then(
      (res) => {
        if (!res.ok && res.error) {
          return setError(res.error);
        }
        return setShowModal(false);
      }
    );
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <form
        className="flex flex-col w-full  text-pnavy text-opacity-90"
        onSubmit={handleEditSubmit}
      >
        <h1 className="text-xl font-bold pb-2 mb-2 border-b-2 border-pnavy border-opacity-40">
          Edit Repair
        </h1>
        <div className="flex flex-col mt-2">
          <div className="flex items-center w-full mb-4 mr-1">
            <div className="pr-2 w-36">Pool Address:</div>
            <select
              className="form-select text-sm w-full rounded border-gray-300 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 "
              type="text"
              value={title}
              onChange={(e) => setPoolId(e.target.value)}
              required
            >
              {pools.map((pool) => {
                return (
                  <option key={pool.id} value={pool.id}>
                    {`${pool.street}, ${pool.city}, ${pool.state}`}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex">
            <div className="flex flex-col w-full mr-1">
              <div className="">Title</div>
              <input
                className="form-input text-sm mb-4 rounded border-gray-300 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 "
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col w-full ml-1">
              <div className="">Description</div>
              <input
                className="form-input text-sm mb-4 rounded border-gray-300 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button
          className="m-1 max-w-sm self-center w-full bg-pnavy text-ghost py-1.5 rounded hover:opacity-90"
          type="submit"
        >
          Submit
        </button>
      </form>
    </Modal>
  );
}
