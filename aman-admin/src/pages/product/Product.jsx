import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { updateProduct } from "../../redux/apiCalls";
import './product.css'
import { useNavigate } from 'react-router-dom';
import FileBase64 from 'react-file-base64';


export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setStock] = useState("");
  const [img, setImg] = useState("");
  const [not, setNot] = useState(null);


  const dispatch = useDispatch();
  const navigate = useNavigate();


  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  useEffect(() => {
    setStock(product.inStock);
  }, [product.inStock]);

  const handleClick = (e) => {
    try {
      e.preventDefault();
      const updatedStock = inStock === '' ? product.inStock : parseInt(inStock);
      updateProduct(productId, dispatch, { title, desc, price, inStock: updatedStock, img });
      setNot('Product Edited successfully');
      setTimeout(() => {
        setNot(null);
        navigate('/products');
      }, 3000); 
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };


  const handleImgChange = (file) => {
    setImg(file.base64);
  };

  return (
    <div className="product">
      {not && (
        <div className="customNotification">
          {not}
        </div>
      )}
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} height={100} width={100} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder={product.title} onChange={(e) => setTitle(e.target.value)} />
            <label>Product Description</label>
            <input type="text" placeholder={product.desc} onChange={(e) => setDesc(e.target.value)} />
            <label>Price</label>
            <input type="text" placeholder={product.price} onChange={(e) => setPrice(e.target.value)} />
            <label>Stock</label>
            <input
            name="inStock"
            type="number"
            placeholder={product.inStock}
            value={inStock}
            onChange={(e) => setStock(e.target.value)}
          />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              {img && <img src={img} alt="Product" className="productUploadImg" />}
              <FileBase64
               multiple={false}
               onDone={handleImgChange}
              />
            </div>
            </div>
            <button className="productButton" onClick={handleClick}>Update</button>
        </form>
      </div>
    </div>
  );
}
