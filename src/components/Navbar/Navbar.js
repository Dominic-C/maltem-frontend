import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css';

const navbar = (props) => {
    const dropdownItems = props.currencyList.map((code) => {
        return <NavDropdown.Item key={code} onClick={() => props.baseHandler(code)}>{code}</NavDropdown.Item>
    })

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>Assignment</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Currencies</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <NavDropdown title={`Base: ${props.base}`} id="basic-nav-dropdown">
                        {dropdownItems}
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default navbar;