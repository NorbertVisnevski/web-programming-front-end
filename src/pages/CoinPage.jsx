import { useEffect } from "react"
import { useState } from "react"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import useFetch from "use-http"
import CoinStats from "../components/CoinStats/CoinStats"
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function CoinPage(){

    const [data, setData] = useState(null)
    const [options, setOptions] = useState([])
    const {response, get} = useFetch()
    const navigate = useNavigate()

    useEffect(async()=>{
        await get("/coins/options")
        if(response.ok){
            setOptions(response.data)
            fetchData(response.data[0])
        }
    },[])

    const fetchData = async (value) => {
        await get("/coins/stats?timePeriod="+value)
        if(response.ok){
            setData(JSON.parse(response.data))
        }
    }

    return(
        <>
        <Row>
            <Col>
            <Card className="mb-3">
                <Card.Header className="hstack justify-content-between align-items-center">
                    <h2 className="mb-0">Coin stats</h2>
                    <Button variant="outline-primary" onClick={()=>navigate("/products")}><FontAwesomeIcon icon="arrow-left"/> Back to main page</Button>
                </Card.Header>
                <Card.Body className="hstack gap-2">
                    <Form>
                        <Form.Label>Interval</Form.Label>
                        <Form.Select onChange={(e)=>fetchData(e.target.value)}>
                            {options.map(option=><option key={option} value={option}>{option}</option>)}
                        </Form.Select>
                    </Form>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        <Row>
            {data &&
                data.data.coins.map(coin=>{
                    return(
                        <Col key={coin.uuid} md="6">
                            <CoinStats key={coin.uuid} coin={coin}/>
                        </Col>
                    )
                })
            }
        </Row>
        </>
    )
}