import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from "../firbase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const passwordLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserInfo = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo ? photo : "https://i.ibb.co/yp2YxZf/Profile.png",
    });
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const authValues = {
    user,
    loading,
    createUser,
    passwordLogin,
    updateUserInfo,
    googleSignIn,
    logOut,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(false);
      setUser(currentUser);
      if (currentUser) {
        // get token and store in client side
        const userInfo = {
          email: currentUser.email,
        };
        const { data } = await axiosPublic.post("/jwt", userInfo);
        if (data.token) {
          localStorage.setItem("access-token", data.token);
        }
      } else {
        // TODO: remove token (if token stored in the client side like LS, Caching, In Memory)
        localStorage.removeItem("access-token");
      }
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
