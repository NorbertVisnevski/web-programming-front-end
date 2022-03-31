import { Card, Col, Row } from "react-bootstrap";
import { Sparklines, SparklinesCurve, SparklinesLine, SparklinesNormalBand, SparklinesReferenceLine, SparklinesSpots } from "react-sparklines";



export default function CoinStats({coin}){

    return(
        <Card className="mb-3">
            <Card.Header>
                <div className="hstack justify-content-between">
                <h4>{coin.name}</h4>
                <img src={coin.iconUrl} style={{width:35, height:35}}/>
                </div>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col md="5">
                    <Card.Text style={{display:"inline"}}>
                        {"Change: "}
                        <text style={{color: coin.change >= 0 ? "green": "red"}}>{coin.change > 0 ? "+"+coin.change: coin.change}</text>
                        <br/>
                        <a target="_blank" href={coin.coinrankingUrl}>Source</a>
                    </Card.Text>
                    </Col>
                    <Col md="7">
                    <Sparklines data={coin.sparkline}>
                        <SparklinesLine style={{fill: "none"}}/>
                        <SparklinesNormalBand />
                        <SparklinesReferenceLine type="median"/>
                        <SparklinesSpots/>
                    </Sparklines>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}