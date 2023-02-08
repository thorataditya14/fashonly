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
    incrementQuantity,
    decrementQuantity,
    removeProduct
} from '../redux/cartRedux';
import { useDispatch } from 'react-redux';


require('dotenv').config()
// const KEY = process.env.REACT_APP_STRIPE;

const REACT_APP_STRIPE = "pk_test_51LOZ9gSIYvwKDxCaYp3Aapu4MGbCmlBglBNtKCZB9INze0caSW5gKeDTL8lHfTUjY9rT7s67c32e2giVid3IPj5K0042HoWigq"
const KEY = REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
    width: 90%;
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
    justify-content: center;
    ${mobile({ flexDirection: 'column' })}
    `;

const Info = styled.div`
    align-items: center;
    flex: 3;
    display: flex;
    flex-direction: column;
    // gap: 10px;
`;

const Product = styled.div`
    border: 1px solid lightgray;
    padding: 10px;
    height: 210px;
    width: 80%;
    margin: 10px 5px;
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: 'column' })}
`;

const ProductDetail = styled.div`
    height: 210px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 30px;
    flex: 7;
`;

const ImgContainer = styled.div`
    width: 160px;
    height: 200px;
    border: 1px solid lightgray;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Details = styled.span`
    height: 145px;
    display: flex;
    gap: 10px;
    padding: 10px 5px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    position: relative;
    width: 75%;
`

const ProductName = styled.span`
    font-size: 24px;
    ${mobile({ margin: '5px 15px' })}
    padding: 10px auto;
    position: absolute;
    top: 10px;
`;

const ProductPrice = styled.div`
    font-size: 16px;
    // margin: 5px;
    ${mobile({ margin: '5px 15px' })}
    // margin: 10px 0;
`;

const ProductQuantity = styled.div`
    font-size: 16px;
    // margin: 5px;
    // padding: 0;
    ${mobile({ margin: '5px 15px' })}
`;

const PriceDetail = styled.div`
    height: 160px;
    margin: 15px 5px;
    padding: 10px 0;
    flex: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    // margin: 10px 0;
    // border: 1px solid;
    font-size: 18px;
    font-weight: 600;
`;

const ProductTotal = styled.div`
    font-size: 24px;
    width: 90%;
    text-align: center;
    margin-top: 5px;
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
    margin-bottom: 5px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
    &:disabled {
        cursor: not-allowed;
    }
`;

const ProductButton = styled.button`
    background-color: transparent;
    border: none;
    font-weight: 600;
    font-size: 16px;
    // margin: 5px;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
    }
`;

const RemoveButton = styled.button`
    // width: 90%
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
    }, [stripeToken, cart, history, getTotalAmount]);


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
                                            <Link to={`/product/${product._id}`}
                                                style={{
                                                    color: "black"
                                                }}
                                            >
                                                <b>{product.title}</b>
                                            </Link>
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
                                        </ProductQuantity>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    Product Total
                                    <ProductTotal>
                                        {product.price * product.quantity} INR
                                    </ProductTotal>
                                    <RemoveButton onClick={() => dispatch(removeProduct(product._id))}>
                                        Remove from Cart
                                    </RemoveButton>
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
                            <SummaryItemPrice>500 INR</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>-500 INR</SummaryItemPrice>
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