import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useFetch from 'use-http'
import toCurrency from "../../helpers/currencyFromater"


export default function OrderDetails(){

    const navigate = useNavigate()
    const {orderId} = useParams()
    const {response, get} = useFetch()
    const [order, setOrder] = useState(null)

    useEffect(async()=>{
        const data = await get("order/"+orderId)
        if(response.ok)
        {
            setOrder(data)
        }
    },[])

    return(
        <>
        {order && <Container>
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h3 className="d-inline mb-0">{`Order ticket: ${order.id}`}</h3>
                    <Button variant="outline-primary" onClick={()=>navigate(-1)}><FontAwesomeIcon icon="arrow-left"/> Back</Button>
                </div>
                <div className="card-body">
                    <Row>
                        <Col md="6" className='mb-2'>
                            <h4>{`Total: ${toCurrency(order.total)}`}</h4>
                            <h4>{`Ordered on: ${new Date(order.orderTime).toString()}`}</h4>
                            <h5>{`Ship to: ${order.name} ${order.surname} ${order.phoneNumber}, ${order.country} ${order.city} ${order.street} ${order.houseNumber}, ${order.zipCode}`}</h5>
                        </Col>
                        <Col md="6">
                            <h5>Products:</h5>
                            <hr className="mt-1"/>
                            {order.subOrders.map(sub=>
                            <div key={sub.id}>
                                <Link to={"/product/"+sub.product.id}>{sub.product.caption}</Link> x{sub.count}
                                <hr className="mt-1"/>
                            </div>)}
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>}
        </>
    )
}