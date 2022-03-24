import { Col, Container, Form, Row } from "react-bootstrap";
import { errorMessage } from "../../helpers/errorObjectParser";


export default function CreateOrder(){

    

    return(
        <Container>
            <Form>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage()}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="surname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        name="surname"
                        type="text"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage()}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="phone">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                        name="phone"
                        type="tel"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage()}</Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        name="country"
                        type="text"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage()}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        name="city"
                        type="text"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage()}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="street">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        name="street"
                        type="text"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage()}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="house">
                    <Form.Label>House number</Form.Label>
                    <Form.Control
                        name="house"
                        type="number"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage()}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="code">
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control
                        name="code"
                        type="number"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage()}</Form.Control.Feedback>
                </Form.Group>
                </Row>
            </Form>
        </Container>
    )
}