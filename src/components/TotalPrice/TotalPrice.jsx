import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import toCurrency from "../../helpers/currencyFromater";
import { selectTotal } from "../../redux/cart";
import './TotalPrice.css';

export default function TotalPrice({children}) {
    const total = useSelector(selectTotal)
    return(
        <Container className="total-container">
            {children}
            <div style={{margin:"1.5rem"}}></div>
            <div>
            <h4 className="total-text">Total</h4>
            <div className="total-divider"/>
            <h5 className="total-text">{toCurrency(total)}</h5>
            </div>
        </Container>
    )
}