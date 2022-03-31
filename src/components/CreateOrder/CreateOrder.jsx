import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "use-http";
import { errorMessage } from "../../helpers/errorObjectParser";
import { clearCart, selectCart } from "../../redux/cart";
import { useNavigate } from 'react-router-dom';
import { selectUser } from "../../redux/user";
import { useState } from "react";
import { batch } from "react-redux";
import { setMessage } from "../../redux/info";


export default function CreateOrder(){

    const cart = useSelector(selectCart)
    const user = useSelector(selectUser)

    const {response, post} = useFetch()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errors, setErrors] = useState()

    const handleSubmit = async (event) =>
    {
        event.preventDefault();
        const form = event.target;
        const body = {
            buyerId:user.id,
            name: form.name.value.trim(),
            surname: form.surname.value.trim(),
            country: form.country.value.trim(),
            city: form.city.value.trim(),
            street: form.street.value.trim(),
            houseNumber: Number(form.house.value),
            phoneNumber: form.phone.value.trim(),
            zipCode: form.code.value.trim(),
            subOrders: cart.map(entry=>{return{productId:entry.product.id,count:entry.count}}),
        }
        const data = await post("order",body)
        if(response.ok)
        {
            batch(()=>{
                dispatch(clearCart())
                dispatch(setMessage("Order created"))
            })
            navigate("/products")
        }
        else{
            setErrors(data?.errors)
        }
    }

    return(
        <Container>
            <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        defaultValue={user?.name}
                        isInvalid={errors?.Name}
                        name="name"
                        type="text"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage(errors?.Name)}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="surname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control
                        defaultValue={user?.surname}
                        isInvalid={errors?.Surname}
                        name="surname"
                        type="text"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage(errors?.Surname)}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="phone">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                        defaultValue={user?.phoneNumber}
                        isInvalid={errors?.PhoneNumber}
                        name="phone"
                        type="tel"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage(errors?.PhoneNumber)}</Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row className="mb-3">
                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        defaultValue={user?.country}
                        isInvalid={errors?.Country}
                        name="country"
                        type="text"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage(errors?.Country)}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        defaultValue={user?.city}
                        isInvalid={errors?.City}
                        name="city"
                        type="text"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage(errors?.City)}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="street">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        defaultValue={user?.street}
                        isInvalid={errors?.Street}
                        name="street"
                        type="text"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage(errors?.Street)}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="house">
                    <Form.Label>House number</Form.Label>
                    <Form.Control
                        defaultValue={user?.houseNumber}
                        isInvalid={errors?.HouseNumber}
                        name="house"
                        type="number"
                        min={0}
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage(errors?.HouseNumber)}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" lg="4" xl="3" controlId="code">
                    <Form.Label>Postal code</Form.Label>
                    <Form.Control
                        defaultValue={user?.zipCode}
                        isInvalid={errors?.ZipCode}
                        name="code"
                        type="text"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage(errors?.ZipCode)}</Form.Control.Feedback>
                </Form.Group>
                </Row>
                <Row>
                    <Col md="4">
                        <Button className="mb-2" type="submit">
                            Order
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}