import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editRepair } from "../../../../store/repairs";

export default function EditRepairForm({
  repair,
  showRepairModal,
  setShowRepairModal,
}) {
  const pools = useSelector((state) => state.poolAPI.clientPools);
  const [error, setError] = useState("");
  const [poolId, setPoolId] = useState(repair.pool_id);
  const [title, setTitle] = useState(repair.title);
  const [description, setDescription] = useState(repair.description);
  const dispatch = useDispatch();

  useEffect(() => {
    const modal = document.querySelector(".modal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }
  }, [showRepairModal]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    return dispatch(editRepair(repair.id, poolId, title, description)).then(
      (res) => {
        if (!res.ok && res.error) {
          return setError(res.error);
        }
        return setShowRepairModal(false);
      }
    );
  };

  return (
    showRepairModal && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50">
        <div className="mt-20 mx-auto max-w-xl shadow-lg">
          <div className="modal bg-ghost flex flex-col justify-center rounded-lg px-6 py-4 w-full">
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
          </div>
        </div>
      </div>
    )
  );
}
