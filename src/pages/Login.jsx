import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { batch, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import useFetch from "use-http";
import { setToken, setUser } from "../redux/user";

export default function Login()
{
    const [error, setError] = useState();
    const [passwordVisible, setPasswordVisible] = useState("password")
    const navigate = useNavigate()
    const { response, post} = useFetch();
    const dispatch = useDispatch()
    const handleSubmit = async (event) =>
    {
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
        else
        {
            setError(data)
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
            <Form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center">
                <div className="card p-3 mt-4">
                    <div className="d-flex justify-content-between">
                        <h2 style={{display:"inline"}}>Login</h2>
                        <Button onClick={handleSignUp} variant="outline-primary">Sign up</Button>
                    </div>
                    <hr/>
                <Row className="justify-content-md-center mb-3">
                <Form.Group as={Col} md="12" className="mb-2" controlId="email">
                    <Form.Label>Your email</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                    />
                </Form.Group>

                <Form.Group as={Col} md="12" className="mb-2"  controlId="password">
                    <Form.Label>Your password</Form.Label>
                    <InputGroup >
                    <Button variant="outline-secondary" onClick={handleTogglePasswordVisible}>{passwordVisible !== "text" ? <FontAwesomeIcon icon="eye-slash"/> : <FontAwesomeIcon icon="eye"/>}</Button>
                    <Form.Control
                        name="password"
                        type={passwordVisible}
                    />
                    </InputGroup>
                </Form.Group>
                <Col md="12">
                    <Button className="mt-2 btn-block" type="submit">Login</Button>
                </Col>
                </Row>
                </div>
                </div>
            </Form>
        </Container>
    //     <div class="row">
	//     <div class="col-sm-4">
    //     <div class="card">
    //     <article class="card-body">
    //     <a href="" class="float-right btn btn-outline-primary">Sign up</a>
    //     <h4 class="card-title mb-4 mt-1">Sign in</h4>
	//     <form>
    //     <div class="form-group">
    //         <label>Your email</label>
    //         <input name="" class="form-control" placeholder="Email" type="email"/>
    //     </div> 
    //     <div class="form-group">
    //         <label>Your password</label>
    //         <input class="form-control" placeholder="******" type="password"/>
    //     </div> 
    //     <div class="form-group"> 
    //     <div class="checkbox">
    //     <label> <input type="checkbox"/> Save password </label>
    //     </div> 
    //     </div>  
    //     <div class="form-group">
    //     <button type="submit" class="btn btn-primary btn-block"> Login  </button>
    //     </div>                                                          
    //     </form>
    //     </article>
    //     </div> 
    // </div>
    // </div>
    )
}