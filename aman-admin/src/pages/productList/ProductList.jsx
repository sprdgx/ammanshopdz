import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import Login from '../login/Login'
import './productList.css'

export default function ProductList() {

  const localStorageData = localStorage.getItem("persist:root");
  const userData = localStorageData ? JSON.parse(JSON.parse(localStorageData).user) : null;

  const isAdmin = userData?.currentUser?.isAdmin;

  const [not, setNot] = useState(null);


  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    try {
    deleteProduct(id, dispatch);
    setNot('Product successfully Deleted');
    setTimeout(() => {
      setNot(null);
    }, 3000); 
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        const titleWords = params.row.title.split(" ");
        const shortenedTitle = titleWords.slice(0, 2).join(" "); // Get the first two words
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} height={40} width={40} alt="" />
            {shortenedTitle}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListedit">Edit</button>
            </Link>
            <button
                className="deletedbutton"
                onClick={() => handleDelete(params.row._id)}
              >
                Delete Product
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      {isAdmin ? (
        <>
          {not && (
            <div className="customNotification">
              {not}
            </div>
          )}
          <Link to="/newproduct">
            <button className="productAddButtonn">Create</button>
          </Link>
          <DataGrid
            rows={products}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={8}
            checkboxSelection
            sx={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          />
        </>
      ) : (
        <Login/>
      )}
    </div>
  );
}
