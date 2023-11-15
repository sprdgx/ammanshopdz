import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
  width:20%;
  height:100%;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = ({themeToggler,theme}) => {

  const location = useLocation();
  const catigorie = location.pathname.split("/")[2];
  const cat = catigorie[0].toUpperCase() + catigorie.slice(1);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  console.log(cat)

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <Container>
      <Navbar themeToggler={themeToggler} theme={theme} />
      <Announcement />
      <Title style={{  color:'teal' }} >{cat}: </Title>
      <FilterContainer>
        <Filter>
          <FilterText>Classer par :</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Nouveautés</Option>
            <Option value="asc">Prix (croissant)</Option>
            <Option value="desc">Prix (décroissant)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Footer />
    </Container>
  );
};

export default ProductList;
