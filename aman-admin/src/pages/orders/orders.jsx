import React, { useEffect, useState } from 'react';
import { userRequest } from "../../requestMethods";
import { DataGrid } from "@mui/x-data-grid";
import './orders.css'
import { getOrders as fetchOrders } from '../../redux/apiCalls';
import { getOrders } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [not, setNot] = useState(null);
  const dispatch = useDispatch();

  const handleDeleteOrder = async (orderId) => {
    try {
      await userRequest.delete(`/orders/${orderId}`);
      setNot('Order deleted successfully');
      fetchOrders(dispatch);
      setTimeout(() => {
        setNot(null);
        window.location.reload();
      }, 3000); 
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  useEffect(() => {
    const getOrders = async (dispatch) => {
      try {
        const res = await userRequest.get("/orders");
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // Call the function to fetch orders
    getOrders(dispatch);
  }, [dispatch]);

  const handleConfirmOrder = async (orderId) => {
    try {
      const res = await userRequest.put(`/orders/confirm/${orderId}`);
      console.log("Order confirmed:", res.data);
      setNot('Order Confirmed successfully');
      getOrders();
      setTimeout(() => {
        setNot(null);
        window.location.reload();
      }, 3000); 
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
      width: 250,
      renderCell: (params) => {
        const isConfirmed = params.row.confirmed;
    
        return (
          <div className='action'>
            {isConfirmed ? (
              <>
              <span className="confirmed">Confirmed</span>
              <button
                className="deletedbutton"
                onClick={() => handleDeleteOrder(params.row._id)}
              >
                Delete Order
              </button>
              </>
            ) : (
              <>
                <button
                  className="confirmedbutton"
                  onClick={() => handleConfirmOrder(params.row._id)}
                  disabled={isConfirmed}
                >
                  Confirm Order
                </button>
                <button
                className="deletedbutton"
                onClick={() => handleDeleteOrder(params.row._id)}
                >
                Delete Order
              </button>
              </>
            )}
          </div>
        );
      },
    },
    
  ];

  return (
    <div className="productList">
      {not && (
        <div className="customNotification">
          {not}
        </div>
      )}
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
