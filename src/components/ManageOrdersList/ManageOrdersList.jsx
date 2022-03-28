import { Button, Container, Table } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import toCurrency from "../../helpers/currencyFromater"
import UpdateOrderStatus from "./UpdateOrderStatus"


export default function ManageOrdersList({orders, onRemove}){

    const navigate = useNavigate()

    return(
        <>
        <Container className="p-0">
        <div className="card">
        <Table bordered className="mb-0">
        <thead>
            <tr>
            <th>#</th>
            <th>Order number</th>
            <th>Status</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody className="align-items-center">
            {orders.map((order,index)=>{return(
                <tr key={order.id}>
                <td style={{maxWidth:"1rem"}}>{index}</td>
                <td style={{maxWidth:"3rem"}}><Button variant="primary" onClick={()=>navigate("/order/"+order.id)}>{order.id}</Button></td>
                <td style={{maxWidth:"25rem"}}><UpdateOrderStatus order={order}/></td>
                <td style={{maxWidth:"15rem"}}><Button variant="danger" onClick={()=>onRemove(order)}>Remove</Button></td>
                </tr>
            )})}
        </tbody>
        </Table>
        </div>
        </Container>
        </>
    )
}