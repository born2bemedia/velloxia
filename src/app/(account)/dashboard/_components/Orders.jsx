import React, { useState, useEffect } from "react";
import useOrderStore from "@/stores/orderStore"; // Import the order store
import useAuthStore from "@/stores/authStore";
import Link from "next/link"; // Use the standard Next.js Link component

function Orders() {
  const { currentUser, fetchCurrentUser } = useAuthStore();
  const { getOrdersByUser } = useOrderStore(); // Use getOrdersByUser from the Zustand store
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
      {loading && <p>Loading orders...</p>}
      {error && <p>{error}</p>}
      {orders && (
        <div className="orders-wrap">
          <table className="orders">
            <thead>
              <tr>
                <th>Date</th>
                <th>Order ID</th>
                <th>Service</th>

                <th>Total, €</th>
                <th>Order Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>#{order.id}</td>
                  <td>
                    {order.order_status !== "cancelled" &&
                      order.products.map((product) => (
                        <span
                          key={product.id}
                          target="_blank"
                          href={"#"}
                          className=""
                        >
                          {product.title}<br/>
                        </span>
                      ))}
                  </td>

                  <td>{order.amount}</td>
                  <td>
                    {order.order_status === "cancelled" ? (
                      <div className="cancelled">Cancelled</div>
                    ) : (
                      <div className="completed">Completed</div>
                    )}
                  </td>
                  <td>
                    {order.invoice ? (
                     <Link href={`${order.invoice.url}`} target="_blank"><img src="/images/download.svg"/></Link>
                    ) : (
                     <span><img src="/images/inactive.svg"/></span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
