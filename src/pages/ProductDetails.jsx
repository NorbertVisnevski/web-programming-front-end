import { useState } from "react"
import { useEffect } from "react"
import useFetch from "use-http"
import { useParams } from "react-router-dom"
import Product from "../components/Product/Product"


export default function ProductDetails(){

    const {productId} = useParams()

    const {response, get} = useFetch()

    const [product, setProduct] = useState()

    useEffect(async()=>{
        const data = await get("product/"+productId)
        if(response.ok)
        {
            setProduct(data)
        }
    },[])

    return(
        <Product product={product}/>
    )
}