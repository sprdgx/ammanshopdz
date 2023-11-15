import React, { useEffect, useState } from 'react';
import { userRequest } from "../../requestMethods";
import { DataGrid } from "@mui/x-data-grid";
import './orders.css'
import { getOrders } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("/orders");
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // Call the function to fetch orders
    getOrders();
  }, [dispatch]);

  const handleConfirmOrder = async (orderId) => {
    try {
      const res = await userRequest.put(`/orders/confirm/${orderId}`);
      // Handle the response or update the state accordingly
      console.log("Order confirmed:", res.data);
      // You may want to refresh the orders after confirmation
      getOrders(); // Make sure getOrders has access to dispatch
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };


  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        if (params.row.products && params.row.products.length > 0) {
          return (
            <div className="productListItem">
              {params.row.products.map((product, index) => (
                <div key={index} className="productBlock">
                  <img
                    className="productListImg"
                    src={product.image}
                    height={60}
                    width={60}
                    alt=""
                  />
                  {product.quantity}
                </div>
              ))}
            </div>
          );
        } else {
          return <div>No products</div>;
        }
      },
    },
    {
      field: "clientInfo",
      headerName: "Client Info",
      width: 370,
      renderCell: (params) => {
        return (
          <div className="clientInfo">
            <p>Name: {params.row.clientName}</p>
            <p>Phone: {params.row.clientNumber}</p>
            <p>Address: {params.row.clientAddress}</p>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => {
        const totalPrice =
          params.row.price !== undefined ? `${params.row.price} DA` : "N/A";
        return <div>{totalPrice}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        const isConfirmed = params.row.confirmed;

        return (
          <div className='action'>
            {isConfirmed ? (
              <span className="confirmed" >Confirmed</span>
            ) : (
                <button
                  className="confirmedbutton"
                  onClick={() => handleConfirmOrder(params.row._id)}
                  disabled={isConfirmed}
                >
                  Confirm Order
                </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={orders}
        columns={columns}
        disableSelectionOnClick
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
        autoHeight
        rowHeight={200}
        sx={{
          width: "100%",
          overflow: "hidden",
        }}
      />
    </div>
  );
}
