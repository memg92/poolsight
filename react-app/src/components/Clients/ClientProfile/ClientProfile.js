import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ClientSummary from "./ClientSummary";
import Pools from "./Pools/Pools";
import Repairs from "./Repairs/Repairs";
import { getClientPools } from "../../../store/pools";
import LoadingPools from "./Pools/LoadingPools";
import LoadingClient from "./LoadingClient";
import { getClient } from "../../../store/clients";

export default function ClientProfile() {
  const [loaded, setLoaded] = useState(false);
  const params = useParams();
  const clientId = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientPools(clientId)).then((res) => {
      if (res.error) {
        dispatch(getClient(clientId)).then(() => {
          setLoaded(true);
        });
      }
      setLoaded(true);
    });
  }, [dispatch, clientId]);

  return loaded ? (
    <div className="h-full mb-10">
      <div className="flex flex-col items-center mx-auto max-w-4xl">
        <ClientSummary />
        <Pools />
        <Repairs />
      </div>
    </div>
  ) : (
    <div className="h-screen">
      <div className="flex flex-col items-center mx-auto max-w-4xl">
        <LoadingClient />
        <LoadingPools />
      </div>
    </div>
  );
}
