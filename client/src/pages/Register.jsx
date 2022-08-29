import styled from 'styled-components';
import { mobile } from '../responsive';
import { Link } from "react-router-dom";
import { publicRequest } from '../requestMethods';
import { useState } from 'react';


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.2)
    ),
    url('http://nairobiwire.com/wp-content/uploads/2020/02/mageto.jpg') center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 30%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: '75%' })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    &:disabled {
        color: green;
        cursor: not-allowed;
    }
`;


const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const data = {
        username,
        email,
        password
    };

    const handleSubmit = () => {
        try {
            publicRequest.post("/auth/register", data);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type='text'
                        placeholder='username'
                        onChange={(e) => setUsername(e.target.value.toLowerCase())}
                    />
                    <Input
                        type='email'
                        placeholder='email'
                        onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    />
                    <Input
                        type='password'
                        placeholder='password'
                        onChange={(e) => setPassword(e.target.value.toLowerCase())}
                    />
                    <Input
                        type='password'
                        placeholder='confirm password'
                    />
                    <Agreement>
                        By creating an account, I consent to the processing of my personal data in accordance with the
                        <b><u> PRIVACY POLICY </u></b>
                    </Agreement>
                    <Button type='submit'>CREATE</Button>
                </Form>
                <Link to="/login"
                    style={{
                        fontSize: "12px",
                        color: "black",
                        cursor: "pointer"
                    }}
                >
                    LOGIN TO ACCOUNT
                </Link>
            </Wrapper>
        </Container>
    );
};


export default Register;