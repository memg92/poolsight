import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ClientSummary from "./ClientSummary";
import PoolDetails from "./PoolDetails";
import EditClientForm from "./EditClientForm";

export default function ClientProfile() {
  const state = useSelector((state) => state);
  const user = state.session.user;
  const [errors, setErrors] = useState("");
  const [client, setClient] = useState(null);
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
      const client = await res.json();
      if (client && client.errors) {
        setErrors(client.errors);
      }
      setClient(client.client);
    })();
  }, [clientId]);

  // console.log("client:", client);
  return (
    client && (
      <div className="h-screen">
        <div className="flex flex-col items-center mx-auto max-w-4xl">
          <ClientSummary
            client={client}
            setShowClientModal={setShowClientModal}
          />
          <PoolDetails client={client} />
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
