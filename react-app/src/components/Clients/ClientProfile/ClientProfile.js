import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ClientSummary from "./ClientSummary";
import EditClientForm from "./EditClientForm";
import Pools from "./Pools/Pools";
import Repairs from "./Repairs/Repairs";
import { getClientPools } from "../../../store/pools";

export default function ClientProfile() {
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [pools, setPools] = useState([]);
  const [showClientModal, setShowClientModal] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);
  const params = useParams();
  const clientId = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClientPools(clientId)).then((res) => {
      if (!res.error) {
        setLoaded(true);
      } else {
        setError(res.error);
      }
    });
  }, [dispatch]);

  // console.log("clients:", client);
  return (
    loaded && (
      <div className="h-screen">
        <div className="flex flex-col items-center mx-auto max-w-4xl">
          <ClientSummary setShowClientModal={setShowClientModal} />
          <Pools />
          <Repairs />
          <EditClientForm
            showClientModal={showClientModal}
            setShowClientModal={setShowClientModal}
            setModalClosed={setModalClosed}
          />
        </div>
      </div>
    )
  );
}
