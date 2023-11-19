import { useState } from "react";
import "./newProduct.css";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setStock] = useState("");
  const [img, setImg] = useState("");
  const [categories, setCat] = useState([]);
  const [details, setDetails] = useState([]);
  const [detailInput, setDetailInput] = useState("");
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    addProduct(dispatch, { title, desc, price,  inStock: parseInt(inStock), img, categories,  detail: details });
  };

  const handleImgChange = (e) => {
    setImg(e.target.value);
  };

  const addDetail = () => {
    const separatorIndex = titleInput.indexOf(':'); // Find the separator ":"
  
    if (separatorIndex !== -1) {
      const title = titleInput.substring(0, separatorIndex).trim();
      const description = titleInput.substring(separatorIndex + 1).trim();
  
      if (title !== '' && description !== '') {
        const newDetail = `${title}: ${description}`;
        setDetails([...details, newDetail]); // Add new detail to the array
        setTitleInput(''); // Clear the input field after adding
      }
    }
  };
  
  
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
  
    // Display the input as is without parsing
    setTitleInput(inputValue);
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="text"
            onChange={handleImgChange} 
          />
          {img && <img src={img} alt="Product" style={{ maxWidth: "100px", maxHeight: "100px" }} />}
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={(e) => setTitle(e.target.value)} 
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={(e) => setDesc(e.target.value)} 
          />
        </div>
        <div className="addProductItem">
          <label>Details</label>
          <div>
            <input
              type="text"
              placeholder="Title: Description..."
              value={titleInput}
              onChange={handleInputChange}
            />
            <button type="button" onClick={addDetail}>Add</button>
          </div>
          <ul>
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={(e) => setPrice(e.target.value)} 
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" onChange={(e) => setCat(e.target.value)} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <input
            name="inStock"
            type="number"
            placeholder="Enter stock quantity"
            value={inStock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
