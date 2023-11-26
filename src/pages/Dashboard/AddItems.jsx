import { useForm } from "react-hook-form";
import SectionTitle from "../Shared/SectionTitle";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import axios from "axios";

const img_upload_key = import.meta.env.VITE_IMGBB_API_KEY;
const img_api = `https://api.imgbb.com/1/upload?expiration=15552000key=${img_upload_key}`;

const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  // const axiosPublic = useAxiosPublic();

  const handleAddItem = async (data) => {
    // console.log(data);
    // upload image to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    console.log(imageFile.image);
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
    console.log(imageData.data);
    reset();
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
              {...register("name")}
              autoComplete="off"
              placeholder="Item Name Here"
              className="input w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {/* category */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                defaultValue="selected"
                {...register("category")}
                className="select select-bordered w-full">
                <option value="selected">Choose Category</option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            {/* price */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                {...register("price")}
                min={0}
                step={0.01}
                placeholder="Item Price"
                className="input w-full"
              />
            </div>
          </div>
          {/* Recipe Details */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Details*</span>
            </label>
            <textarea
              type="text"
              {...register("recipe")}
              placeholder="Recipe Details"
              className="input w-full h-28 py-3"></textarea>
          </div>
          <div className="form-control w-full flex-row items-center gap-2">
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.JPG,.JPEG,.PNG,.GIF,.WEBP,.WebP,.SVG"
              {...register("image")}
              className="file-input w-full max-w-xs"
            />
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
