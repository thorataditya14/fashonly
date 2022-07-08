import styled from "styled-components";
import Product from "./Product"
import { popularProducts } from "../data";


const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position: relative;
`;


export default function Products() {
    return (
        <Container>
            {
                popularProducts.map((item) => (
                    <Product item={item}/>
                ))
            }
        </Container>
    )
}
