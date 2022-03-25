import { Button, Container, Table } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom'
import toCurrency from "../../helpers/currencyFromater"


export default function ManageOrdersList({orders}){

    return(
        <>
        <Container className="p-0">
        <div className="card">
        <Table responsive className="mb-0">
        <thead>
            <tr>
            <th>#</th>
            <th>Order number</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order,index)=>{return(
                <tr key={order.id}>
                <td style={{maxWidth:"1rem"}}>{index}</td>
                <td style={{maxWidth:"1rem"}}><Link to={"/order/"+order.id}>{order.id}</Link></td>
                <td style={{maxWidth:"1rem"}}>{order.status}</td>
                </tr>
            )})}
        </tbody>
        </Table>
        </div>
        </Container>
        </>
    )
}