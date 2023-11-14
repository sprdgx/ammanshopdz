import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  border-radius: 20px;
  background-color : teal;
  height: 400px;
  width: 89%;
  margin-left:4%;
  ${mobile({ padding: "0px", flexDirection:"column", height:'800px', width:'85%', marginLeft:'7%', })}

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
