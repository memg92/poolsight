import React from "react";

export default function ClientSummary({ client }) {
  return (
    <div>
      <div>
        <div>Address</div>
        <div>{`${client.street}`}</div>
        <div>{`${client.city}, ${client.state}`}</div>
        <div>{client.email}</div>
        <div>{client.phone}</div>
      </div>
      <div>
        <div>Pool Details</div>
      </div>
    </div>
  );
}
