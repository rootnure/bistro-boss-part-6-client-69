import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import SectionTitle from "../Shared/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Cart = () => {
  const [cart, refetch] = useCart();
  const axiosSecure = useAxiosSecure();
  const totalPrice = cart.reduce(
    (total, currItem) => total + currItem.price,
    0
  );

  const handleDeleteItem = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/cart/${id}`).then(({ data }) => {
          if (data.deletedCount > 0) {
            toast.success(`"${name}" successfully deleted from the cart`);
            refetch();
          }
        });
      }
    });
  };

  return (
    <section className="">
      <SectionTitle heading="Wanna Add More?" subHeading="My Cart" />
      <div className="bg-white p-8 rounded-lg">
        <div className="flex justify-between text-4xl font-cinzel font-extrabold">
          <h2>Total Orders: {cart.length}</h2>
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
          <button className="btn text-2xl bg-amber-500 border-none text-white">
            Pay
          </button>
        </div>
        <div className="overflow-x-auto mt-6">
          <table className="table text-center">
            {/* head */}
            <thead className="bg-amber-500 text-white uppercase">
              <tr>
                <th>#</th>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* body */}
            <tbody>
              {cart.map(({ _id, price, name, image }, idx) => (
                <tr key={_id}>
                  <th>{idx + 1}</th>
                  <td>
                    <figure className="h-12">
                      <img
                        src={image}
                        alt={`${name} image`}
                        className="mx-auto max-w-full max-h-full rounded-xl"
                      />
                    </figure>
                  </td>
                  <td>{name}</td>
                  <td className="text-center">${price.toFixed(2)}</td>
                  <th>
                    <button
                      onClick={() => handleDeleteItem(_id, name)}
                      title={`Delete ${name} from cart`}
                      className="btn bg-red-600 hover:bg-red-700 text-white text-2xl">
                      <FaTrashAlt />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Cart;
