import useFetch from "use-http";
import { useState } from 'react';
import Select from 'react-select';
import { Form, InputGroup, Spinner } from "react-bootstrap";
import { useEffect } from "react";


export default function UpdateOrderStatus({order}){

    const options = ["Preparing", "In transit", "Delivered", "Canceled"]

    const {response, put} = useFetch()
    const [status, setStatus] = useState(order.status)
    const [disabled, setDisabled] = useState(false)

    const handleFetch = async() => {
        setDisabled(true)
        const data = await put("order",{id:order.id, status:status})
        setDisabled(false)
    }

    useEffect(()=>{
        handleFetch()
    },[status])

    return(
        <>
        <Form.Select value={status} onChange={(e)=>setStatus(e.target.value)} disabled={disabled}>
            {options.map(option=><option key={option} value={option}>{option}</option>)}
        </Form.Select>
        </>
    )
}