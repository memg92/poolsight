import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ClientSummary from "./ClientSummary";
import Pools from "./Pools/Pools";
import Repairs from "./Repairs/Repairs";
import { getClientPools } from "../../../store/pools";

export default function ClientProfile() {
  const [errors, setErrors] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const params = useParams();
  const clientId = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientPools(clientId)).then((res) => {
      if (!res.error) {
        setLoaded(true);
      } else {
        setErrors(res.error);
      }
    });
  }, [dispatch]);

  // console.log("clients:", client);
  return (
    loaded && (
      <div className="h-screen">
        <div className="flex flex-col items-center mx-auto max-w-4xl">
          <div className="w-full">
            {errors && (
              <ul className="mx-auto m-4 p-4 bg-red-100 text-red-900 border-2 border-red-900 rounded">
                <div className="font-semibold">
                  We encountered the following errors, please try again later:
                </div>
                {errors.map((error, i) => (
                  <li className="list-disc list-inside" key={i}>
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ClientSummary
            showClientModal={showClientModal}
            setShowClientModal={setShowClientModal}
          />
          <Pools />
          <Repairs />
        </div>
      </div>
    )
  );
}
