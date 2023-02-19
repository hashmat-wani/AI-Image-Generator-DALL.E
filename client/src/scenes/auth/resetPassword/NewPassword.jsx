import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { instance } from "../../../utils/apiInstances";
import Expired from "./Expired";
import ChangePwd from "./ChangePwd";

export default function NewPassword() {
  const [render, setRender] = useState(false);
  const [expired, setExpired] = useState(false);

  const location = useLocation();
  const ticket = location.search.split("=")[1];

  useEffect(() => {
    instance
      .get(`/api/v1/mail/verifyticket/${ticket}`)
      .then(() => setExpired(false))
      .catch(() => setExpired(true))
      .finally(() => setRender(true));
  }, []);

  if (!ticket) return <Expired />;

  return <>{render && <>{expired ? <Expired /> : <ChangePwd />}</>}</>;
}
