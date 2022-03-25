import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, DropdownButton, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logOut, selectUser } from "../../redux/user";

export default function UserBadge() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleRedirect = (url) => {
        navigate(url)
    }

    const user = useSelector(selectUser)

    return(
        <>
            <Nav>
                {user ?
                <NavDropdown
                align="end"
                id="nav-dropdown-dark"
                title={<><FontAwesomeIcon icon="user" size="lg" inverse style={{marginRight:10}}/>{user?.name}</>}
                menuVariant="dark"
                >
                <NavDropdown.Item onClick={()=>handleRedirect("/profile")}>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>handleRedirect("/my-orders")}>My orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Header>Admin functions</NavDropdown.Header>
                <NavDropdown.Item onClick={()=>handleRedirect("/manage-orders")}>Manage orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={()=>dispatch(logOut(()=>{navigate("/");window.location.reload(false)}))}>Log out</NavDropdown.Item>
                </NavDropdown>
                : <Button variant="dark" onClick={()=>navigate("/login")}><FontAwesomeIcon icon="user" size="lg" inverse style={{marginRight:10}}/>Login</Button>
                }
            </Nav>
        </>
    )
}