import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

const navbar = (props) => {
    const dropdownItems = props.currencyList.map((code) => {
        return <NavDropdown.Item key={code} onClick={() => props.baseHandler(code)}>{code}</NavDropdown.Item> // add onClick={props.setBaseCurrency}
    })

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home">Assignment</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Currencies</Nav.Link>
                </Nav>
                <Nav className="ml-auto">
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        {dropdownItems}
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default navbar;