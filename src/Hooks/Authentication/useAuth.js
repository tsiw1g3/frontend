import { MyContext } from "Context";
import { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export function useAuth() {
  const { loginUser, isLoggedIn } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const signIn = useCallback(
    (user) => {
      setLoading(true);
      loginUser(user)
        .then((response) => {
          if (response) {
            const {
              data: { id, token, role, name },
            } = response;

            localStorage.setItem("loginToken", token);
            localStorage.setItem("userId", id);
            localStorage.setItem("role", role);
            localStorage.setItem("nome", name);

            history.push("dashboard");
            window.location.reload();
          } else alert("Usuário ou senha incorretos");
        })
        .finally(() => setLoading(false));
    },
    [loginUser, history]
  );

  const signOut = () => {
    // logoutUser();
  };

  return { loading, isLoggedIn, signIn, signOut };
}
