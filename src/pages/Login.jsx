import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { batch, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import useFetch from "use-http";
import { errorMessage } from "../helpers/errorObjectParser";
import { setToken, setUser } from "../redux/user";

export default function Login()
{
    const [errors, setErrors] = useState();
    const [serverMessage, setErrorMessage] = useState()
    const [passwordVisible, setPasswordVisible] = useState("password")
    const navigate = useNavigate()
    const { response, post} = useFetch();
    const dispatch = useDispatch()
    const handleSubmit = async (event) =>
    {
        setErrorMessage()
        event.preventDefault()
        const form = event.target;
        const body = {
            email: form.email.value,
            password: form.password.value,
        }
        const data = await post("user/login", body)
        if(response.ok)
        {
            batch(()=>{
                dispatch(setUser(data.user))
                dispatch(setToken(data.token))
            })
            navigate("/products")
        }
        if(response.status === 401){
            setErrorMessage(data)
        }
        else
        {
            setErrors(data?.errors)
        }
    }

    const handleSignUp = () => {
        navigate("/sign-up")
    }

    const handleTogglePasswordVisible = () => {
        if(passwordVisible==="password"){
            setPasswordVisible("text")
        }
        else{
            setPasswordVisible("password")
        }
    }

    return(

        <Container className="App-login-modal">
            <Form onSubmit={handleSubmit} noValidate>
                <div className="d-flex justify-content-center">
                <div className="card p-3 mt-4">
                    <div className="d-flex justify-content-between">
                        <h2 className="d-inline">Login</h2>
                        <Button onClick={handleSignUp} variant="outline-primary">Sign up</Button>
                    </div>
                    <hr/>
                <Row className="justify-content-md-center mb-3">
                <Form.Group as={Col} md="12" className="mb-2" controlId="email">
                    <Form.Label>Your email</Form.Label>
                    <Form.Control
                        isInvalid={errors?.Email}
                        name="email"
                        type="email"
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage(errors?.Email)}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" className="mb-2"  controlId="password">
                    <Form.Label>Your password</Form.Label>
                    <InputGroup >
                    <Button variant="outline-secondary" onClick={handleTogglePasswordVisible}>{passwordVisible !== "text" ? <FontAwesomeIcon icon="eye-slash"/> : <FontAwesomeIcon icon="eye"/>}</Button>
                    <Form.Control
                        isInvalid={errors?.Password}
                        name="password"
                        type={passwordVisible}
                    />
                    <Form.Control.Feedback type="invalid">{errorMessage(errors?.Password)}</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Col md="12">
                    <Button className="mt-2 btn-block" type="submit">Login</Button>
                </Col>
                <Col md="12">
                    <div style={{color:"var(--bs-danger)", textAlign:"center", marginTop:"1rem"}}>{serverMessage}</div>
                </Col>
                </Row>
                </div>
                </div>
            </Form>
        </Container>
    )
}