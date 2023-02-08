import React from 'react';
import styled from 'styled-components';
import { Badge } from '@material-ui/core';
import { Search, ShoppingCartOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { mobile } from '../responsive';
import { useEffect, useState } from "react";
import { logout } from '../redux/apiCalls';
import { publicRequest } from '../requestMethods';


const Container = styled.div`
    height: 60px;
    ${mobile({ height: '50px' })}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    ${mobile({ flexDirection: 'column' })}
`;

const Left = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    margin-left: 80px;
    justify-content: left;
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 6px;
    width: 90%;
    justify-content: space-between;
`;

const Input = styled.input`
    width: 100%;
    border: none;
    height: 15px;
    outline: none;
    ${mobile({ width: '50px' })}
`;

const SearchResult = styled.div`
    width: 90%;
    z-index:3;
    position: absolute;
    top: 30px;
    border-radius: 0 0 10px 10px;
    border-top: 1px solid #e0e0e0;
    box-shadow: 2px 3px 5px -1px rgb(0 0 0 / 30%);
`;

const SearchItem = styled.div`
    text-align: left;
    height: 25px;
    padding: 10px 30px;
    background-color: white;
    border-radius: 0 0 4px 4px;
`;

const Center = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
    text-decoration: none;
    text-align: center;
    ${mobile({ fontSize: '24px' })}
`;

const Right = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: right;
    margin-right: 80px;
    ${mobile({ flex: 2, justifyContent: 'center' })}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;

const Username = styled.div`
    font-size: 14px;
    margin-left: 25px;
    ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;

const Navbar = () => {
    const quantity = useSelector((state) => state.cart.quantity);
    const user = useSelector((state) => state.user.currentUser);

    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await publicRequest.get(`/products/search?q=${query}`);
                setData(res.data);
            }
            catch { }
        };
        if (query.length > 0) fetchData();
    }, [query]);



    const dispatch = useDispatch();

    const handleClick = (e) => {
        logout(dispatch);
    };


    return (
        <Container id='navbar'>
            <Wrapper>

                <Left>
                    <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                        <Logo>Fashonly</Logo>
                    </Link>
                </Left>

                <Center>
                    <SearchContainer>
                        <Input
                            placeholder='Search for products, categories and more'
                            onChange={(e) => setQuery(e.target.value.toLowerCase())}
                        />
                        <Search style={{ color: 'gray', fontSize: 20, height: 15, width: 15 }} />
                    </SearchContainer>

                    <SearchResult>
                        {data && data.slice(0, 10).map(((item) => (
                            <Link
                                to={`/product/${item._id}`}
                                style={{ textDecoration: 'none', color: 'black' }}
                            >
                                <SearchItem>{item.title}</SearchItem>
                            </Link>
                        )))}
                    </SearchResult>
                </Center>

                <Right>
                    {user ? (
                        <>
                            <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
                                <MenuItem
                                    onClick={handleClick}
                                >
                                    Logout
                                </MenuItem>
                            </Link>
                            <Username>
                                <b>Hello {user.username}!</b>
                            </Username>
                        </>
                    ) : (
                        <>
                            <Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>
                                <MenuItem>REGISTER</MenuItem>
                            </Link>

                            <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
                                <MenuItem>SIGN IN</MenuItem>
                            </Link>
                        </>
                    )}
                    <Link to='/cart' style={{ textDecoration: 'none', color: 'black' }}>
                        <MenuItem>
                            <Badge badgeContent={quantity} color='primary'>
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>

            </Wrapper>
        </Container>
    );
};


export default Navbar;