import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { dateFormatter } from "../../../services/utils";
import ClientSummary from "./ClientSummary";

export default function ClientProfile() {
  const state = useSelector((state) => state);
  const user = state.session.user;
  const [errors, setErrors] = useState("");
  const [client, setClient] = useState(null);
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

  console.log("client:", client);
  return (
    client && (
      <div>
        <h1>{`${client.firstname} ${client.lastname}`}</h1>
        <ClientSummary client={client} />
      </div>
    )
  );
}
