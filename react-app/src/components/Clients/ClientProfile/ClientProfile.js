import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ClientSummary from "./ClientSummary";
import Pools from "./Pools/Pools";
import Repairs from "./Repairs/Repairs";
import { getClientPools } from "../../../store/pools";
import LoadingPools from "./Pools/LoadingPools";
import LoadingClient from "./LoadingClient";
import MultiErrorHandler from "../../Errors/MultiErrorHandler";

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
    <div className="h-full mb-10">
      <div className="flex flex-col items-center mx-auto max-w-4xl">
        <div className="w-full">
          {errors && <MultiErrorHandler errors={errors} />}
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
