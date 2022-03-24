import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart, subtractFromCart } from "../../redux/cart";
import './ProductCartList.css'

export default function ActionButtons({product,count}){

    const dispatch = useDispatch()

    const handleRemove = () => {
        dispatch(subtractFromCart(product))
    }
    const handleAdd = () => {
        dispatch(addToCart(product))
    }

    return(
        <div className="box">
            <Button className="action-btn" variant="outline-secondary" size="sm" onClick={handleRemove}>
                <FontAwesomeIcon icon="minus"/>
            </Button>
            <div className="action-counter">
                {count}
            </div>
            <Button className="action-btn" variant="outline-secondary" size="sm" onClick={handleAdd}>
                <FontAwesomeIcon icon="plus"/>
            </Button>
        </div>
    )
}