import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ClientSummary from "./ClientSummary";
import PoolDetails from "./Pools/PoolDetails";
import EditClientForm from "./EditClientForm";
import Pools from "./Pools/Pools";
import Repairs from "./Repairs/Repairs";

export default function ClientProfile() {
  const state = useSelector((state) => state);
  const user = state.session.user;
  const [errors, setErrors] = useState("");
  const [client, setClient] = useState(null);
  const [pools, setPools] = useState([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);
  const params = useParams();
  const clientId = params.id;

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/clients/${clientId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data && data.errors) {
        setErrors(data.errors);
      }
      setPools(data.pools ? data.pools : data.client.pool);
      setClient(data.client);
    })();
  }, [clientId]);

  // console.log("clients:", client);
  return (
    client && (
      <div className="h-screen">
        <div className="flex flex-col items-center mx-auto max-w-4xl">
          <ClientSummary
            client={client}
            setShowClientModal={setShowClientModal}
          />
          <Pools pools={pools} />
          <Repairs />
          <EditClientForm
            client={client}
            showClientModal={showClientModal}
            setShowClientModal={setShowClientModal}
            setModalClosed={setModalClosed}
          />
        </div>
      </div>
    )
  );
}
