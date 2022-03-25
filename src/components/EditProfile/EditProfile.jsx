import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "use-http";
import { errorMessage } from "../../helpers/errorObjectParser";
import { clearCart, selectCart } from "../../redux/cart";
import { useNavigate } from 'react-router-dom';


export default function EditProfile(){

    const cart = useSelector(selectCart)

    const {response, post,cache} = useFetch()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        const form = event.target;
        const body = {
            name: form.name.value.trim(),
            surname: form.surname.value.trim(),
            country: form.country.value.trim(),
            city: form.city.value.trim(),
            street: form.street.value.trim(),
            houseNumber: Number(form.house.value),
            phoneNumber: form.phone.value.trim(),
            zipCode: form.code.value.trim(),
        }
        return
        console.log(body)
        const data = await post("order",body)
        if(response.ok)
        {
            dispatch(clearCart)
            navigate("/products")
        }
        console.log(data)
        cache.clear()
    }

    return(
        <Container>
            <Form onSubmit={handleSubmit}>
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
                        type="text"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage()}</Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row>
                    <Col md="4">
                        <Button className="mb-2" type="submit">
                            Save
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}