import EditProductFields from '../components/EditProductFields/EditProductFields';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "use-http";


export default function EditProduct(){

    const {productId} = useParams()
    const {response, get} = useFetch()
    const [product, setProduct] = useState()

    useEffect(async()=>{
        if(productId){
            const data = await get("product/"+productId)
            if(response.ok)
            {
                setProduct(data)
            }
        }
    },[productId])

    return(
        <EditProductFields product={product} setProduct={setProduct}/>
    )
}