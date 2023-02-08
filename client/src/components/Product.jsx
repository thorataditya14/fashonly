import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 240px;
    height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    &:hover ${Info} {
        opacity: 1;
    }
`;

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
    top: 20px
`;

const Image = styled.img`
    height: 65%;
    z-index: 2;
`;

const Name = styled.div`
    margin: 0;
    margin-top: 10px;
`;

const Icon = styled.div`
    width: 120px;
    height: 40px;
    border-radius: 40px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;

const Price = styled.div`
    margin-top: 5px;
`;

const Superscript = styled.span`
    font-size: 12px;
    margin: auto 5px auto 2px;
`;

const Discount = styled.span`
    font-size: 12px;
    margin: auto 5px auto 2px;
`;

const StrikeThrough = styled.s`
    font-size: 12px;
    margin: auto 5px auto 2px;
`;

const ColorContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 15px;
    // width: 20px;
    // height: 20px;
    // border-radius: 50%;
    // border: 1px solid grey;
    // background-color: ${(props) => props.color};
    // cursor: pointer;
`;

const ColorCircle = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid grey;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
`;


const Product = ({ item }) => {
    return (
        <>
            <Container>
                <Circle />
                <Image src={item.img} />
                <Link
                    to={`/product/${item._id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                >
                    <Info>
                        <Icon>
                            Go To Item
                        </Icon>
                    </Info>
                </Link>
                <ColorContainer>
                    {item.color?.map((c) => (
                        <ColorCircle color={c} key={c} />
                    ))}
                </ColorContainer>
                <Name>{item.title}</Name>
                <Price>
                    {item.price * 0.9}
                    <Superscript>INR {"\t\t"}</Superscript>
                    <Discount>
                        <StrikeThrough>{item.price} INR</StrikeThrough>
                        {"\t\t"}(10% off)
                    </Discount>
                </Price>
            </Container>
        </>
    );
};


export default Product;