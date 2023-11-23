import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  border-radius: 10px;
  background-color: #b2dfdb;
  height: auto;
  width: 90%;
  margin-left: 1.4cm;
  gap: 17px;
  ${mobile({
    padding: "10px 5px",
    margin: "50px 10px",
    flexDirection: "column",
  })}
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
