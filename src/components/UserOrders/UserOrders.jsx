import { Button, Container, Table } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import toCurrency from "../../helpers/currencyFromater"


export default function UserOrders({orders}){

    const navigate = useNavigate()

    const handleClick = (id) => {
        navigate("/order/"+id)
    }

    return(
        <>
        <Container className="p-0">
        <div className="card">
        <Table striped bordered hover className="mb-0">
        <thead>
            <tr>
            <th>#</th>
            <th>Order number</th>
            <th>Status</th>
            <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order,index)=>{return(
                <tr key={order.id} onClick={()=>handleClick(order.id)} role="button">
                <td style={{maxWidth:"1rem"}}>{index}</td>
                <td style={{maxWidth:"1rem"}}>{order.id}</td>
                <td style={{maxWidth:"1rem"}}>{order.status}</td>
                <td style={{maxWidth:"1rem"}}>{toCurrency(order.total)}</td>
                </tr>
            )})}
        </tbody>
        </Table>
        </div>
        </Container>
        </>
    )
}