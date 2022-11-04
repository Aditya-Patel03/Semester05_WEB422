import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useState} from 'react';

function MainNav() {

  const router = useRouter();
  const [route, handleRoute] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push('/artwork?title=true&q=${route}');
  }

  return (
    <>
    <Navbar className='fixed-top navbar-dark bg-dark' bg="dark" expand="lg">
      <Container>
        <Navbar.Brand > Patel Aditya Dharmesh</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/search">Advance Search</Nav.Link>
          </Nav>

          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>  
        </Navbar.Collapse>
        
      </Container>
    </Navbar><br/><br/>
    
    </>
  );
}

export default MainNav;