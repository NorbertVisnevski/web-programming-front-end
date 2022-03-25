import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "use-http";
import UserOrders from "../components/UserOrders/UserOrders";
import { selectUser } from "../redux/user";


export default function MyOrders(){

    const [orders, setOrders] = useState([])
    const {response,get} = useFetch()
    const user = useSelector(selectUser)
    useEffect(async()=>{
        const data = await get("/order?userId="+user.id)
        if(response.ok){
            setOrders(data)
        }
    },[])

    return(
        <UserOrders orders={orders}/>
    )
}