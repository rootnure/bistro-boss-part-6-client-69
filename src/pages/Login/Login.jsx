import { Helmet } from "react-helmet-async";
import bgImg from "../../assets/login-register-bg/auth-bg.png";
import authImage from "../../assets/others/authentication2.png";
import WoodenBtn from "../../components/WoodenBtn";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { useEffect, useRef, useState } from "react";
import useAuthHook from "../../hooks/useAuthHook";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin";
import { toast } from "react-toastify";

const Login = () => {
  const { passwordLogin } = useAuthHook();
  const navigate = useNavigate();
  const location = useLocation();

  const captchaRef = useRef();
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    loadCaptchaEnginge(6, "#D1A0541F", "#B73", "lower");
  }, []);

  const handleValidateCaptcha = () => {
    const userCaptchaValue = captchaRef.current.value;
    if (validateCaptcha(userCaptchaValue)) {
      setDisabled(false);
    } else {
      captchaRef.current.value = "";
      setDisabled(true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    passwordLogin(email, password)
      .then(() => {
        navigate(location?.state?.from?.pathname || "/", { replace: true });
        toast.success("Login Successfully", {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => console.error(err));
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet>
      <main
        className="min-h-screen p-[7.5%]"
        style={{ backgroundImage: `url(${bgImg})` }}>
        <div
          className={`min-h-[75vh] border-2 bg-transparent shadow-2xl py-6 md:p-[5%] grid grid-cols-1 md:grid-cols-2 gap-x-16`}>
          <div className="grid content-center mt-16 md:mt-0">
            <img
              src={authImage}
              alt="Authentication Art Image"
              className="w-full"
            />
          </div>
          <div className="order-first md:order-last h-full flex items-center">
            <div className="w-full">
              <h2 className="text-4xl font-bold text-center">Login</h2>
              <form onSubmit={handleLogin} className="card-body">
                {/* email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    autoComplete="off"
                    placeholder="Your Email"
                    className="input input-bordered px-6"
                    required
                  />
                </div>
                {/* password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered px-6"
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                {/* captcha */}
                <div className="form-control">
                  <label className="label mx-4">
                    <LoadCanvasTemplate reloadText="Refresh Captcha" />{" "}
                    {disabled || (
                      <p className="text-xl font-bold text-green-600 text-right">
                        Success
                      </p>
                    )}
                  </label>
                  <input
                    onKeyUp={(e) =>
                      e.key === "Enter" ? handleValidateCaptcha() : ""
                    }
                    ref={captchaRef}
                    type="text"
                    name="captcha"
                    placeholder="Type the text above"
                    className="input input-bordered px-6"
                    required
                  />
                  <button
                    type="button"
                    onClick={handleValidateCaptcha}
                    className="btn btn-outline btn-sm">
                    I Am Human
                  </button>
                </div>
                <div className="form-control mt-6">
                  <WoodenBtn disabled={disabled}>
                    {disabled ? "Verify Captcha First" : "SignIn"}
                  </WoodenBtn>
                </div>
              </form>
              <div className="flex flex-col items-center text-center">
                <p className="text-[#D1A054]">
                  New Here?{" "}
                  <Link to="/register" className="font-bold">
                    Create a New Account
                  </Link>
                </p>
                <h3 className="py-3">or sign in with</h3>
                <SocialLogin></SocialLogin>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
