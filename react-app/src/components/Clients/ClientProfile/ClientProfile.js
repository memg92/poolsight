import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ClientSummary from "./ClientSummary";
import Pools from "./Pools/Pools";
import Repairs from "./Repairs/Repairs";
import { getClientPools } from "../../../store/pools";
import LoadingPools from "./Pools/LoadingPools";
import LoadingClient from "./LoadingClient";

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
        setLoaded(true);
        setErrors(res.error);
      }
    });
  }, [dispatch]);

  return loaded ? (
    <div className="h-screen z-0">
      <div className="flex flex-col items-center mx-auto max-w-4xl">
        <div className="w-full">
          {errors && (
            <ul className="mx-auto m-4 p-4 bg-red-100 text-red-900 border-2 border-red-900 rounded">
              <div className="font-semibold">
                We encountered the following errors:
              </div>
              {Array.isArray(errors) ? (
                errors.map((error, i) => (
                  <li className="list-disc list-inside" key={i}>
                    {error}
                  </li>
                ))
              ) : (
                <li className="list-disc list-inside">{errors}</li>
              )}
            </ul>
          )}
        </div>
        {!errors && (
          <>
            <ClientSummary
              showClientModal={showClientModal}
              setShowClientModal={setShowClientModal}
            />
            <Pools />
            <Repairs />
          </>
        )}
      </div>
    </div>
  ) : (
    <div className="h-screen z-0">
      <div className="flex flex-col items-center mx-auto max-w-4xl">
        <LoadingClient />
        <LoadingPools />
      </div>
    </div>
  );
}
