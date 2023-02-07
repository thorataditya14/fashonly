import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Announcement from '../components/Announcement';
import { mobile } from '../responsive';
import { useState } from 'react';
import { login } from '../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";


const Container = styled.div`
    width: 100vw;
    height: calc(100vh - 60px - 30px - 260px);
    background-color: #fcf5f5;
    // background: linear-gradient(
    //         rgba(255, 255, 255, 0),
    //         rgba(255, 255, 255, 0.2)
    //     ),
    //     url('http://nairobiwire.com/wp-content/uploads/2020/02/mageto.jpg') center;
    // background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    border: 1px solid lightgray;
    box-shadow: 5px 5px 10px 5px lightgray;
    ${mobile({ width: '75%' })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 10px auto;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
    &:hover {
        box-shadow: 5px 5px 10px 5px lightgray;
    }
    &:disabled {
        color: green;
        cursor: not-allowed;
    }
`;

const Error = styled.span`
    color: red;
    marging 5px auto;
`;


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isFetching, error } = useSelector((state) => {
        return state.user
    });
    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, { username, password });
    };


    return (
        <>
            <Navbar />
            <Announcement />
            <Container>
                <Wrapper>
                    <Title>SIGN IN</Title>
                    <Form>
                        <Input
                            placeholder='username'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Input
                            placeholder='password'
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                        {error && <Error>Something went wrong...</Error>}
                        <Link to="/register"
                            style={{
                                fontSize: "12px",
                                color: "black",
                                cursor: "pointer"
                            }}
                        >
                            CREATE NEW ACCOUNT
                        </Link>
                    </Form>
                </Wrapper>
            </Container>
            <Footer />
        </>
    );
};


export default Login;