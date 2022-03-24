import { useSelector } from "react-redux";
import ProductCartList from "../components/ProductCartList/ProductCartList";
import { selectCart, selectTotal } from "../redux/cart";


export default function ProductCart() {

    const cart = useSelector(selectCart)
    return(
        <div className="container p-0">
            <ProductCartList cartList={cart}/>
        </div>
    )
}