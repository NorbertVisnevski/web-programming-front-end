import { useEffect, useState } from "react"
import { Container } from "react-bootstrap";
import useFetch from "use-http";
import ProductList from "../layout/ProductList/ProductList";

export default function ViewProducts() {

    const [products, setProducts] = useState();
    const {get, response} = useFetch()

    useEffect(async()=>{
        const data = await get("product")
        if(response.ok)
        {
            setProducts(data)
        }
    },[])
    return(
        <Container>
            <ProductList products={products}/>
        </Container>
        
    )
}