import { Container, Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
    Link,
    useNavigate,
  } from "react-router-dom";
import toCurrency from "../../helpers/currencyFromater";
import TotalPrice from "../TotalPrice/TotalPrice";
import ActionButtons from "./ActionButtons";
import './ProductCartList.css';

export default function ProductCartList({cartList}){
    const navigate = useNavigate();
    return(
        <>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Product</th>
            <th>Price</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {cartList.map(({product, count},index)=>{return(
                <tr key={product.id}>
                <td style={{maxWidth:"1rem"}}>{index}</td>
                <td style={{maxWidth:"5rem"}}><Link to={"/product/details/"+product.id}>{product.caption}</Link></td>
                <td style={{maxWidth:"3rem"}}>{toCurrency(product.price*count)}</td>
                <td style={{maxWidth:"5rem"}}><ActionButtons product={product} count={count}/></td>
                </tr>
            )})}
            <br/>
        </tbody>
        </Table>
        <TotalPrice>
            <Button style={{width:"15rem"}} disabled={cartList.length === 0} onClick={()=>navigate("/make/order")}>
                Continue to checkout
            </Button>
        </TotalPrice>
        </>
    )
}