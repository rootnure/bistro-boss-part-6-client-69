import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa6";
import useAuthHook from "../../hooks/useAuthHook";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { googleSignIn } = useAuthHook();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const handleGoogleSingIn = () => {
    googleSignIn().then(({ user }) => {
      if (user) {
        const newUser = {
          name: user.displayName,
          email: user.email,
          role: "user",
        };
        axiosPublic.post("/users", newUser).then(() => {
          toast.success("Login Successfully");
          navigate(location?.state?.from?.pathname || "/", { replace: true });
        });
      }
    });
  };
  return (
    <div className="flex justify-evenly w-1/2 mx-auto">
      {/* TODO: create fb app and enable fb login */}
      <button
        disabled
        className="btn rounded-full border-2 border-black py-2 text-2xl hover:border-black hover:bg-gray-700 hover:text-white"
        title="Facebook">
        <FaFacebookF></FaFacebookF>
      </button>
      <button
        onClick={handleGoogleSingIn}
        className="btn rounded-full border-2 border-black py-2 text-2xl hover:border-black hover:bg-gray-700 hover:text-white"
        title="Google">
        <FaGoogle></FaGoogle>
      </button>
      {/* TOOD: create github app and enable github login */}
      <button
        disabled
        className="btn rounded-full border-2 border-black py-2 text-2xl hover:border-black hover:bg-gray-700 hover:text-white"
        title="Github">
        <FaGithub></FaGithub>
      </button>
    </div>
  );
};

export default SocialLogin;
