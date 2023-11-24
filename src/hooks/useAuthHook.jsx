import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuthHook = () => {
    return useContext(AuthContext);
};

export default useAuthHook;