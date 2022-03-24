import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/cart";
import { useNavigate } from "react-router-dom";

export default function CartBadge() {
    const cart = useSelector(selectCart)
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate("/cart")
    }

    return(
        <Button style={{borderRadius:"50%", height:"36px", width:"36px"}} variant="dark" onClick={handleNavigate}>
            <span className="fa-layers fa-fw">
                <FontAwesomeIcon icon="shopping-cart" inverse size="lg"  transform="left-6"/>
                {cart.length > 0 && <FontAwesomeIcon icon="circle" color="var(--bs-danger)" transform="shrink-6 up-11 right-9"/>}
            </span>
        </Button>
    )
}