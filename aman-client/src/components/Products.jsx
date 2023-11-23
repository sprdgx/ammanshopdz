import styled from "styled-components";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div`
  // padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #b2dfdb;
  margin-top: 1cm;
  margin-left: 4%;
  border-radius: 20px;
  overflow: hidden;
  width: 90%;
  ${mobile({
    flexDirection: "column",
    margin: "0",
    marginLeft: "17px",
    padding: "10px 0",
  })}

  /* Ensure each product takes up one-third of the container */
  & > div {
    flex: 0 0 calc(33.33% - 10px); /* 10px is the space between products, adjust as needed */
    margin-bottom: 20px;
  }
`;

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat ? `${BASE_URL}products?category=${cat}` : `${BASE_URL}products`
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
