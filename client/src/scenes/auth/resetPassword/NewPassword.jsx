import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { privateInstance } from "../../../utils/apiInstances";
import Expired from "./Expired";
import ChangePwd from "./ChangePwd";

export default function NewPassword() {
  const [render, setRender] = useState(false);
  const [expired, setExpired] = useState(false);

  const location = useLocation();
  const ticket = location.search.split("=")[1];

  useEffect(() => {
    privateInstance
      .get(`/api/v1/mail/verifyticket/${ticket}`)
      .then(() => setExpired(false))
      .catch(() => setExpired(true))
      .finally(() => setRender(true));
  }, []);

  if (!ticket) return <Expired />;

  return <>{render && <>{expired ? <Expired /> : <ChangePwd />}</>}</>;
}
