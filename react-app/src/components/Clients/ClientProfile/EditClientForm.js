import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StateOptions from "../ClientForm/StateOptions";
import { editClient } from "../../../store/clients";

export default function EditClientForm({
  showClientModal,
  setShowClientModal,
}) {
  const client = useSelector((state) => state.clientAPI.client);
  const [error, setError] = useState("");
  const [firstname, setFirstname] = useState(client.firstname);
  const [lastname, setLastname] = useState(client.lastname);
  const [street, setStreet] = useState(client.street);
  const [city, setCity] = useState(client.city);
  const [state, setState] = useState(client.state);
  const [email, setEmail] = useState(client.email);
  const [phone, setPhone] = useState(client.phone);
  const dispatch = useDispatch();

  useEffect(() => {
    //helper function to close modal
    const closeModal = () => {
      setShowClientModal(false);
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
    return () => {
      document.removeEventListener("click", (e) => {
        e.stopPropagation();
      });
      document.removeEventListener("click", closeModal);
    };
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    return dispatch(
      editClient(
        client.id,
        firstname,
        lastname,
        street,
        city,
        state,
        phone,
        email
      )
    ).then((res) => {
      if (!res.ok && res.error) {
        return setError(res.error);
      } else {
        setShowClientModal(false);
      }
    });
  };

  return (
    showClientModal && (
      <div className="fixed z-40 top-0 left-0 w-full h-full bg-black bg-opacity-50">
        <div className="mt-20 mx-auto max-w-xl shadow-lg">
          <div className="modal z-40 animate-scale-in-center bg-ghost flex flex-col justify-center rounded-lg px-6 py-4 w-full">
            <form
              className="flex flex-col w-full text-pnavy text-opacity-90"
              onSubmit={handleEditSubmit}
            >
              <h1 className="text-xl font-bold pb-2 mb-2 border-b-2 border-pnavy border-opacity-40">
                Edit Client
              </h1>
              <div className="flex mt-2">
                <div className="flex flex-col w-full mr-1">
                  <div className="">First Name</div>
                  <input
                    className="form-input text-sm mb-4 rounded border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50 "
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col w-full ml-1">
                  <div className="">Last Name</div>
                  <input
                    className="form-input text-sm mb-4 rounded border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="">Street</div>
              <input
                className="form-input text-sm mb-4 rounded border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50"
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
              />

              <div className="flex">
                <div className="flex flex-col w-full mr-1">
                  <div className="">City</div>
                  <input
                    className="form-input text-sm mb-4 rounded border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col w-full ml-1">
                  <div className="">State</div>
                  <select
                    className="form-select text-sm mb-4 rounded border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  >
                    <StateOptions />
                  </select>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col w-full mr-1">
                  <div className="">Email</div>
                  <input
                    className="form-input text-sm mb-4 rounded border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col w-full ml-1">
                  <div className="">Phone</div>
                  <input
                    className="form-input text-sm mb-4 rounded border-gray-200 focus:border-pblue focus:bg-blue-50 border-2 border-opacity-50"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
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
