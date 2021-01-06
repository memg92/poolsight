import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Dashboard() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setLoaded(true));
  }, [dispatch]);

  return <div></div>;
}
