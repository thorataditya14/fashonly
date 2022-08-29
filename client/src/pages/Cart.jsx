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


const KEY = process.env.REACT_APP_STRIPE;


const Container = styled.div``;

const Wrapper = styled.div`
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
    ${mobile({ flexDirection: 'column' })}
`;

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: 'column' })}
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span`
    font-size: 20px;
    margin: 5px;
    ${mobile({ margin: '5px 15px' })}
`;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductQuantity = styled.div`
    font-size: 20px;
    margin: 5px;
    ${mobile({ margin: '5px 15px' })}
`;

const ProductPrice = styled.div`
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
    padding: 20px;
    height: 50vh;
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

const Cart = () => {
    const user = useSelector((state) => state.user.currentUser);

    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const history = useHistory();

    console.log(cart);



    const onToken = (token) => {
        setStripeToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post('/checkout/payment', {
                    tokenId: stripeToken.id,
                    amount: 500,
                });
                history.push('/success', {
                    stripeData: res.data,
                    products: cart,
                });
            } catch { }
        };
        stripeToken && cart.total > 0 && makeRequest();
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
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName>
                                            <b>Product:</b> {product.title}
                                        </ProductName>
                                        <ProductQuantity>
                                            <b>Quantity:</b> {product.quantity}
                                        </ProductQuantity>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductPrice>
                                        $ {product.price * product.quantity}
                                    </ProductPrice>
                                </PriceDetail>
                            </Product>
                        ))}
                        <Hr />
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type='total'>
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name='Fashonly Shop'
                            image='https://cdn-icons-png.flaticon.com/512/263/263142.png'
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            {user ? (
                                <Button disabled={!user} onClick={handleCheckout}>CHECKOUT NOW</Button>
                            ) : (
                                <Link to="/login">
                                    <Button title="Login to checkout" disabled={!user} onClick={handleCheckout}>CHECKOUT NOW</Button>
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