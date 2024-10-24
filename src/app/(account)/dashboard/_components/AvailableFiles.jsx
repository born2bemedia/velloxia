import React, { useEffect, useState } from "react";
import Link from "next/link";
import useOrderStore from "@/stores/orderStore"; // Import the Zustand store
import useAuthStore from "@/stores/authStore"; // Import Auth Zustand store

function AvailableFiles() {
  const { currentUser } = useAuthStore(); // Access currentUser from Zustand
  const { getOrdersByUser } = useOrderStore(); // Access orders and actions from Zustand
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  useEffect(() => {
    if (!currentUser) return;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const ordersData = await getOrdersByUser(currentUser.email); // Fetch orders using Zustand
        setOrders(ordersData);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [currentUser, getOrdersByUser]);

  return (
    <div>
      {loading && <p className="">Loading orders...</p>}
      {error && <p className="">{error}</p>}
      {orders && (
        <div className="orders-wrap">
          <table className="orders files">
            <thead>
              <tr>
                <th>Service</th>
                <th>Date</th>

                <th>Documents</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(
                (order) =>
                  // Render row only if there are files available
                  order.files?.length > 0 && (
                    <tr key={order.id}>
                      <td>
                        {order.order_status !== "cancelled" &&
                          order.products.map((product) => (
                            <span key={product.id}>
                                {product.title}
                                <br />
                              </span>
                          ))}
                      </td>
                      <td>{formatDate(order.createdAt)}</td>

                      <td>
                        {order.files.map((file, index) => (
                          <span key={index} className="files-col">
                            <Link
                              key={file.id}
                              href={`${file.url}`}
                              target="_blank"
                            >
                              <img src="/images/download.svg" />
                              {file.name}
                            </Link>
                          </span>
                        ))}
                      </td>
                      <td>
                        <Link href="/" className="reorder">
                          Order Again
                        </Link>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AvailableFiles;
