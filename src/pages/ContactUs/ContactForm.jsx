import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { FaTelegramPlane } from "react-icons/fa";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import useAuthHook from "../../hooks/useAuthHook";

const ContactForm = () => {
  const { user } = useAuthHook();
  const captchaRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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

  const handleContactUsFormSubmit = (data) => {
    console.log(data);
    // TODO: send data to DB
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(handleContactUsFormSubmit)}
        className="card-body p-16 bg-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name*</span>
            </label>
            <input
              type="text"
              defaultValue={user && user?.displayName}
              {...register("name", { required: true })}
              placeholder="Enter Your Name"
              className="input"
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email*</span>
            </label>
            <input
              type="email"
              defaultValue={user && user?.email}
              {...register("email", { required: true })}
              placeholder="Enter Your Email"
              className="input"
            />
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>
        {/* phone number */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone*</span>
          </label>
          <input
            type="text"
            defaultValue={user && user?.phone}
            {...register("phone", { required: true })}
            placeholder="Enter Your Phone Number"
            className="input"
          />
          {errors.phone && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* message */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Message*</span>
          </label>
          <textarea
            type="text"
            {...register("message", { required: true })}
            placeholder="Enter Your Message Here"
            className="input h-40 p-4"></textarea>
          {errors.message && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        {/* captcha */}
        <div className="form-control flex-row">
          <label className="label mx-4 w-1/4">
            <LoadCanvasTemplate reloadText="Refresh Captcha" />
            {disabled || (
              <p className="text-xl font-bold text-green-600 text-right">
                Success
              </p>
            )}
          </label>
          <div className="flex items-center gap-2">
            <input
              onKeyUp={(e) =>
                e.key === "Enter" ? handleValidateCaptcha() : ""
              }
              ref={captchaRef}
              type="text"
              name="captcha"
              placeholder="Type the captcha text here"
              className="input input-bordered px-4"
              required
            />
            <button
              type="button"
              onClick={handleValidateCaptcha}
              className="btn btn-outline">
              I Am Human
            </button>
          </div>
        </div>
        <div className="form-control mt-12">
          <button
            disabled={disabled}
            className="btn flex items-center w-fit mx-auto  bg-gradient-to-r from-yellow-800 to-yellow-600 hover:from-yellow-700 hover:to-yellow-600 text-white">
            Send Message <FaTelegramPlane className="text-xl" />
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
