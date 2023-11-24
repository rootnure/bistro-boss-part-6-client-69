import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import useAuthHook from "../../hooks/useAuthHook";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa6";
import "./AllUsers.css";

const AllUsers = () => {
  const { user } = useAuthHook();
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleDeleteUser = (id, name) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { data } = await axiosSecure.delete(`/users/${id}`);
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Successfully deleted "${name}" from the Database`);
        }
      }
    });
  };

  const handleMakeAdmin = async (id, name) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `"${name}" will be admin after the action!`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin!",
    });
    if (result.isConfirmed) {
      const { data } = await axiosSecure.patch(`/users/admin/${id}`);
      if (data.modifiedCount > 0) {
        refetch();
        toast.success(`User "${name}" as an admin now!`);
      }
    }
  };

  return (
    <section>
      <div className="flex justify-evenly text-4xl">
        <h2>All Users</h2>
        <h2>Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="table zebra-table w-full">
          {/* head */}
          <thead className="bg-amber-500">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          {/* body */}
          <tbody>
            {users.map(({ _id, name, email, role }, idx) => (
              <tr key={_id}>
                <th>{idx + 1}</th>
                <td>{name}</td>
                <td>{email}</td>
                <td className="uppercase">
                  {role === "admin" ? (
                    role
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(_id, name)}
                      title={`Assign "${name}" as admin`}
                      className="btn bg-amber-500 hover:bg-amber-600 text-white text-2xl">
                      <FaUser />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    disabled={
                      email.toLowerCase() === user.email.toLowerCase() ||
                      role === "admin"
                    }
                    onClick={() => handleDeleteUser(_id, name)}
                    title={`Delete "${name}" from database`}
                    className="btn bg-red-600 hover:bg-red-700 text-white text-2xl">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllUsers;
