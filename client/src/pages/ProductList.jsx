import styled from 'styled-components'
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Footer from '../components/Footer'
import NewsLetter from '../components/NewsLetter'
import { mobile } from '../responsive';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';


const Container = styled.div`
    height: 60px;
`;

const Title = styled.h1`
    margin: 20px;
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: '0 20px', display: 'flex', flexDirection: 'column' })}
`;

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: '0' })}
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: '10px 0' })}
`;

const Option = styled.option`
    margin: 20px;
`;


export default function ProductList() {

    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest");

    const handleFilters = (e) => {
        const value = e.target.value;
        setFilters({
            [e.target.name]: value.toLowerCase(),
            ...filters
        });
    };

    const me = "ed";
    me.toLowerCase()

    const handleSort = (e) => {
        setSort(e.target.value);
    };

    return (
        <Container>
            <Announcement/>
            <Navbar/>
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>
                        Filter Products:
                    </FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled>Color</Option>
                        <Option>White</Option>
                        <Option>Black</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Yellow</Option>
                        <Option>Green</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled>Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>
                        Sort Products:
                    </FilterText>
                    <Select onChange={handleSort}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (asc)</Option>
                        <Option value="desc">Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort}/>
            <NewsLetter/>
            <Footer/>
        </Container>
    )
}
