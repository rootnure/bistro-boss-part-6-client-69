import { FaTrashAlt } from "react-icons/fa";
import useMenu from "../../hooks/useMenu";
import SectionTitle from "../Shared/SectionTitle";
import { FaPencil } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Shared/Loading";

const ManageItems = () => {
  const [menu, loading, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = async (id, name) => {
    console.log({ id, name });
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (isConfirmed) {
      const { data } = await axiosSecure.delete(`/menu/${id}`);
      if (data.deletedCount > 0) {
        // refetch data to update ui
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `"${name}" successfully deleted form database`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <SectionTitle heading="Manage All Items" subHeading="Hurry Up" />
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            {/* body */}
            <tbody>
              {menu.map(({ _id, name, image, price }, idx) => (
                <tr key={_id}>
                  <th>{idx + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={image} alt={name} />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{name}</td>
                  <td>${price.toFixed(2)}</td>
                  <td>
                    <button
                      title={`Delete "${name}" from database`}
                      className="btn bg-amber-600 hover:bg-amber-700 text-white text-2xl">
                      <FaPencil />
                    </button>
                  </td>
                  <th>
                    <button
                      onClick={() => handleDeleteItem(_id, name)}
                      title={`Delete "${name}" from database`}
                      className="btn bg-red-600 hover:bg-red-700 text-white text-2xl">
                      <FaTrashAlt />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageItems;
