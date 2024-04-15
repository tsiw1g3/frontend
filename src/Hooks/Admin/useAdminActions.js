import api from "Config/http";
import { useState } from "react";

export default function useAdminActions() {
  const [loading, setLoading] = useState(false);

  const generateInvitationLink = () => {
    setLoading(true);

    api
      .post("/invite", {
        user_id: localStorage.getItem("userId"),
        invite_hash: Math.random(),
      })
      .then(function (response) {
        const baseUrl = window.location.hostname;

        navigator.clipboard.writeText(
          `${baseUrl}/#/register?inv=` + response.data.data
        );
        alert(
          `O link de convite: ${baseUrl}/register?inv=` +
            response.data.data +
            " foi copiado"
        );
      })
      .finally(() => setLoading(false));
  };

  return { loading, generateInvitationLink };
}
