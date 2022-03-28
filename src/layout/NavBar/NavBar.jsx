import { Button, Container, Navbar } from "react-bootstrap";
import {
    Outlet,
    useNavigate,
    Navigate,
} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CartBadge from "./CartBadge";
import UserBadge from "./UserBadge";
import ToastCard from "../ToastCard/ToastCard";
import Footer from "../Footer/Footer";


export default function NavBar() {

    const navigate = useNavigate()

    return(
        <>
        <div className="d-flex flex-column min-vh-100">
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
            <main className="mt-3 mb-3">
                <Container>
                    <Outlet/>
                </Container>
            </main>
            <Footer/>
        </div>
        <ToastCard/>
        </>
    )
}