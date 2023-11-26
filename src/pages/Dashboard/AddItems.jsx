import { useForm } from "react-hook-form";
import SectionTitle from "../Shared/SectionTitle";
import { toast } from "react-toastify";
import axios from "axios";
import RequiredFieldErrorMsg from "../../components/RequiredFieldErrorMsg";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const img_upload_key = import.meta.env.VITE_IMGBB_API_KEY;
const img_api = `https://api.imgbb.com/1/upload?expiration=15552000&key=${img_upload_key}`;

const AddItems = () => {
  const [categoryErrVisible, setCategoryErrVisible] = useState(false);
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddItem = async (data) => {
    setCategoryErrVisible(false);
    if (data.category === "default") {
      setCategoryErrVisible(true);
      return;
    }
    // upload image to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    if (data.image[0].size > 5120000) {
      toast.error("Image size cannot be more than 5MB.");
      return;
    }
    // const res = await axiosPublic.post(img_api, imageFile, {
    const { data: imageData } = await axios.post(img_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (imageData.success) {
      // now send the menu item data to the server with the image url
      const menuItem = {
        name: data.name,
        recipe: data.recipe,
        image: imageData.data.display_url,
        imageOtherInfo: {
          imageId: imageData.data?.id,
          original: imageData.data?.image?.url || null,
          medium: imageData.data?.medium?.url || null,
          thumb: imageData.data?.thumb?.url || null,
          delete_url: imageData.data?.delete_url || null,
        },
        category: data.category,
        price: parseFloat(data.price),
      };
      // use secure api to add item to menu
      const menuRes = await axiosSecure.post("/menu", menuItem);
      // show success msg upon menu insertion
      if (menuRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `"${menuItem.name}" successfully added to the menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <section>
      <SectionTitle heading="Add An Item" subHeading="What's New" />
      <div className="my-12 p-12 bg-gray-100 rounded-xl">
        <form onSubmit={handleSubmit(handleAddItem)} className="space-y-4">
          {/* name */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              autoComplete="off"
              placeholder="Item Name Here"
              className="input w-full"
            />
            {errors.name?.type === "required" && <RequiredFieldErrorMsg />}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* category */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue="default"
                {...register("category")}
                className="select select-bordered w-full">
                <option value="default" disabled>
                  Choose Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
              {categoryErrVisible && (
                <span className="text-red-500">Please choose a category</span>
              )}
            </div>
            {/* price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                min={0}
                step={0.01}
                placeholder="Item Price"
                className="input w-full"
              />
              {errors.price?.type === "required" && <RequiredFieldErrorMsg />}
            </div>
          </div>
          {/* Recipe Details */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Details*</span>
            </label>
            <textarea
              type="text"
              {...register("recipe", { required: true })}
              placeholder="Recipe Details"
              className="input w-full h-28 py-3"></textarea>
            {errors.recipe?.type === "required" && <RequiredFieldErrorMsg />}
          </div>
          <div className="form-control w-full">
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.JPG,.JPEG,.PNG,.GIF,.WEBP,.WebP,.SVG"
              {...register("image", { required: true })}
              className="file-input w-full max-w-xs"
            />
            {errors.image?.type === "required" && <RequiredFieldErrorMsg />}
            <p>
              <span className="font-bold">Max 5MB </span>
              <span className="text-sm italic">
                (Formats: .jpg, .jpeg, .png, .gif, .webp, .svg, .JPG, .JPEG,
                .PNG, .GIF, .WEBP, .WebP, .SVG)
              </span>
            </p>
          </div>
          <button type="submit" className="btn btn-outline">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddItems;
