import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "use-http";
import ManageOrdersList from "../components/ManageOrdersList/ManageOrdersList";
import { selectUser } from "../redux/user";


export default function ManageOrders(){

    const [orders, setOrders] = useState([])
    const {response,get,del} = useFetch()
    const user = useSelector(selectUser)
    useEffect(async()=>{
        const data = await get("/order/all")
        if(response.ok){
            setOrders(data)
        }
    },[])

    const handleOnRemove = async (order) => {
        const data = await del("/order/"+order.id)
        if(response.ok){
            setOrders(orders.filter(x => x.id !== order.id))
        }
    }

    return(
        <ManageOrdersList orders={orders} onRemove={handleOnRemove}/>
    )
}