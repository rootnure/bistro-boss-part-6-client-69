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
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const { createUser, updateUserInfo } = useAuthHook();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name, email, photo, password }) => {
    createUser(email, password)
      .then(() => {
        const userInfo = {
          email,
          name,
          role: "user",
        };
        // create user entry in the database
        axiosPublic.post("/users", userInfo);
        updateUserInfo(name, photo).then(() => {
          reset();
          navigate("/", { replace: true });
          toast.success("Successfully Registered", {
            position: "top-center",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | SignUp</title>
      </Helmet>
      <main
        className="min-h-screen p-[7.5%]"
        style={{ backgroundImage: `url(${bgImg})` }}>
        <div
          className={`min-h-[75vh] border-2 bg-transparent shadow-2xl py-6 md:p-[5%] grid grid-cols-1 md:grid-cols-2 gap-x-16`}>
          <div className="grid content-center order-first md:order-last">
            <img
              src={authImage}
              alt="Authentication Art Image"
              className="w-full"
            />
          </div>
          <div className="h-full flex items-center">
            <div className="w-full">
              <h2 className="text-4xl font-bold text-center">Register</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                {/* name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">
                      Name<span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    name="name"
                    autoComplete="off"
                    placeholder="Full Name"
                    className="input input-bordered px-6"
                    required
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      This field is required
                    </span>
                  )}
                </div>
                {/* photo */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">Photo</span>
                  </label>
                  <input
                    type="text"
                    {...register("photo")}
                    name="photo"
                    autoComplete="off"
                    placeholder="Image URL (Direct Link)"
                    className="input input-bordered px-6"
                  />
                </div>
                {/* email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">
                      Email<span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    })}
                    name="email"
                    autoComplete="off"
                    placeholder="Your Email"
                    className="input input-bordered px-6"
                    required
                  />
                  {errors.email?.type === "required" && (
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="text-sm text-red-500">
                      Please enter a valid email
                    </span>
                  )}
                </div>
                {/* password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">
                      Password<span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 64,
                      pattern:
                        /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()_+\-=[\]{};'~`:"\\|,.<>/?])/,
                    })}
                    name="password"
                    placeholder="Enter your password"
                    className="input input-bordered px-6"
                    required
                  />
                  {errors.password?.type === "required" && (
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-sm text-red-500">
                      Must be at lest 6 characters or long
                    </span>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <span className="text-sm text-red-500">
                      Cannot be more than 64 character long
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-sm text-red-500">
                      Password must have one uppercase, one lowercase, one digit
                      and one special character
                    </span>
                  )}
                </div>
                {/* captcha */}
                <div className="form-control mt-2">
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
                <div>
                  <p className="text-sm">
                    <span className="text-red-500 text-lg">*</span>required
                  </p>
                </div>
                {/* submit */}
                <div className="form-control mt-6">
                  <WoodenBtn disabled={disabled}>
                    {disabled ? "Verify Captcha First" : "Register"}
                  </WoodenBtn>
                </div>
              </form>
              <div className="flex flex-col items-center text-center">
                <p className="text-[#D1A054]">
                  Already Registered?{" "}
                  <Link to="/login" className="font-bold">
                    Go to log in
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

export default Register;
