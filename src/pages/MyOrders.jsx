import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "use-http";
import UserOrders from "../components/UserOrders/UserOrders";
import { selectUser } from "../redux/user";
import { useParams } from 'react-router-dom';

export default function MyOrders(){
    const {userId} = useParams()
    const [orders, setOrders] = useState([])
    const {response,get} = useFetch()
    const user = useSelector(selectUser)
    useEffect(async()=>{
        const data = await get("/order?userId="+userId)
        if(response.ok){
            setOrders(data)
        }
    },[])

    return(
        <UserOrders orders={orders}/>
    )
}