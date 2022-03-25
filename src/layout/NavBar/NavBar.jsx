import { Button, Container, Navbar } from "react-bootstrap";
import {
    Outlet,
    useNavigate,
} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartBadge from "./CartBadge";
import UserBadge from "./UserBadge";


export default function NavBar() {

    const navigate = useNavigate()

    return(
        <>
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
            <Navbar.Brand role="button" onClick={()=>navigate("/products")}>
                <img
                alt=""
                src="/logo192.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                Atomic
            </Navbar.Brand>
            <div className="hstack gap-2">
                <CartBadge/>
                <UserBadge/>
            </div>
            </Container>
        </Navbar>
        <div className="mt-3">
            <Outlet/>
        </div>
        </>
    )
}