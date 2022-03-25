import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import toCurrency from "../../helpers/currencyFromater";
import { addToCart } from "../../redux/cart";
import { useNavigate } from 'react-router-dom';


export default function Product({product}){

    const dispatch = useDispatch()

    const navigate = useNavigate()


    const handleAddToCart = () => {
        dispatch(addToCart(product))
    }

    const handleEdit = () => {
        navigate("/edit/product/"+product.id)
    }

    return(
        <>
        {product && <Container>
            <div className="card mt-3 overflow-hidden">
            <Row>
            <Col md="6">
            <img src="https://thumbs.dreamstime.com/b/pizza-slice-1268733.jpg" style={{height: "100%", width: "100%", objectFit: "contain"}}/>
            </Col>
            <Col md="6" className="card-body">
            <h3>{product.caption}</h3> 
            {product.categories.map(category=><Badge className="category-badge" key={category.id} pill>{category.name}</Badge>)}
            <h4>Description</h4>
            {product.description}
            <div className="vstack mt-3 mb-3 align-items-flex-end">
                <div direction="horizontal" gap={2} className="hstack gap-3 card-actions-big">
                <Button variant="outline-dark active disabled">{"Stock: "+product.stock}</Button>
                <Button variant="outline-dark active disabled">{toCurrency(product.price)}</Button>
                <Button disabled={product.stock <= 0} onClick={handleAddToCart}>Add to cart  <FontAwesomeIcon icon="cart-shopping"/></Button>
                </div>
            </div>
            <Button onClick={handleEdit}>Edit <FontAwesomeIcon icon="wrench"/></Button>
            </Col>
            </Row>
            </div>
        </Container>}
        </>
    )
}