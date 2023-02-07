import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { userRequest } from '../requestMethods';
import { useHistory } from 'react-router';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import {
    addProduct,
    incrementQuantity,
    decrementQuantity,
    removeProduct
} from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import { Add, Remove } from '@material-ui/icons';


require('dotenv').config()
// const KEY = process.env.REACT_APP_STRIPE;

const REACT_APP_STRIPE = "pk_test_51LOZ9gSIYvwKDxCaYp3Aapu4MGbCmlBglBNtKCZB9INze0caSW5gKeDTL8lHfTUjY9rT7s67c32e2giVid3IPj5K0042HoWigq"
const KEY = REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
    width: 95%;
    margin: auto;
    padding: 20px;
    ${mobile({ padding: '10px' })}
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;
    ${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Product = styled.div`
border: 1px solid lightgray;
padding: 10px;
height: 150px;
margin: 10px 5px;
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: 'column' })}
`;

const ProductDetail = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex: 2;
`;

const ImgContainer = styled.div`
    width: 120px;
    height: 150px
    flex: 1;
`;

const Image = styled.img`
    max-width: 120px;
    max-height: 150px
`;

const Details = styled.div`
    padding: auto 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 2;
`;

const ProductName = styled.span`
    font-size: 20px;
    margin: 20px 5px;
    ${mobile({ margin: '5px 15px' })}
`;

const PriceDetail = styled.div`
    margin: 20px 5px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductPrice = styled.div`
    font-size: 20px;
    margin: 5px;
    ${mobile({ margin: '5px 15px' })}
`;

const ProductQuantity = styled.div`
    font-size: 20px;
    margin: 5px;
    padding: 0;
    ${mobile({ margin: '5px 15px' })}
`;

const ProductTotal = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: '20px' })}
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    margin: 10px 5px;
    padding: 20px;
    height: 45vh;
    position: sticky;
    top: 77px;
`;

const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === 'total' && '500'};
    font-size: ${(props) => props.type === 'total' && '24px'};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
    }
`;

const ProductButton = styled.button`
    padding: 10px;
    background-color: transparent;
    border: none;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
`;

const RemoveButton = styled.button`
    padding: 10px;
    background-color: transparent;
    border: none;
    margin-top: 25px;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`;

const Cart = () => {
    const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();

    console.log(cart);

    const getTotalAmount = () => {
        var total = 0
        cart.products.forEach(item => {
            total += item.quantity * item.price
        })
        return total
    }

    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post('/checkout/payment', {
                    tokenId: stripeToken._id,
                    amount: 500,
                });
                history.push('/success', {
                    stripeData: res.data,
                    products: cart,
                });
            } catch { }
        };
        stripeToken && getTotalAmount() > 0 && makeRequest();
    }, [stripeToken, cart, history]);


    const handleCheckout = () => {
        console.log(user);
    };


    return (
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Bottom>
                    <Info>
                        {cart.products.map((product) => (
                            <Product>
                                <ProductDetail>
                                    <ImgContainer>
                                        <Image src={product.img} />
                                    </ImgContainer>
                                    <Details>
                                        <ProductName>
                                            <b>Product:</b> {product.title}
                                        </ProductName>
                                        <ProductPrice>
                                            <b>Price:</b> {product.price} INR
                                        </ProductPrice>
                                        <ProductQuantity>
                                            <b>Quantity:</b>
                                            <ProductButton onClick={() => dispatch(incrementQuantity(product._id))}>
                                                +
                                            </ProductButton>
                                            {"\t"}{product.quantity}{"\t"}
                                            <ProductButton onClick={() => dispatch(decrementQuantity(product._id))}>
                                                -
                                            </ProductButton>
                                            <RemoveButton onClick={() => dispatch(removeProduct(product._id))}>
                                                Remove from Cart
                                            </RemoveButton>
                                        </ProductQuantity>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductTotal>
                                        Product Total
                                        <br />
                                        {product.price * product.quantity} INR
                                    </ProductTotal>
                                </PriceDetail>
                            </Product>
                        ))}
                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>{getTotalAmount()} INR</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>5.90 INR</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>-5.90 INR</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type='total'>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>{getTotalAmount()} INR</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name='Fashonly Shop'
                            image='https://cdn-icons-png.flaticon.com/512/263/263142.png'
                            billingAddress
                            shippingAddress
                            description={`Your total is $${getTotalAmount()}`}
                            amount={getTotalAmount() * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            {user ? (
                                <Button disabled={!user} onClick={handleCheckout}>CHECKOUT NOW</Button>
                            ) : (
                                <Link to="/login">
                                    <Button title="Login to checkout" disabled={!user} onClick={handleCheckout} >CHECKOUT NOW</Button>
                                </Link>
                            )}
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer />
        </Container>
    );
};


export default Cart;