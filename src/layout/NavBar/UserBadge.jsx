import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Dropdown, DropdownButton, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function UserBadge() {

    return(
        <>
            <Nav>
                <NavDropdown
                id="nav-dropdown-dark"
                title={<><FontAwesomeIcon icon="user" size="lg" inverse style={{marginRight:10}}/>{"User"}</>}
                menuVariant="dark"
                >
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        </>
    )
}