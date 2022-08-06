import './menu.css';
import { Nav, Navbar, Container } from 'react-bootstrap'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'



const Menu = () => {



  let userProfile = JSON.parse(sessionStorage.getItem('usersArray'));



  if (userProfile != null) {

    return (

      <div className='menu'>

        <Navbar collapseOnSelect expand="sm" >
          <Container>
            <a href='/'><Navbar.Brand ><img src={require("../images/snage.png").default} alt="icon"></img></Navbar.Brand></a>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">

              <Nav className="me-auto">
                <Nav.Link style={{ color: "#00000094", fontSize: "17px", fontFamily: "cursive" }} href="/">Home</Nav.Link>
              </Nav>

              <Navbar.Collapse className="justify-content-end link">
                <Nav.Link href="/Profile">Hello {userProfile.userName} Let`s Play (Profile)</Nav.Link>
              </Navbar.Collapse>

            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )
  }




  else {

    return (
      <div className='menu'>


        <Navbar collapseOnSelect expand="sm" >
          <Container>
            <a href='/'><Navbar.Brand ><img src={require("../images/snage.png").default} alt="icon"></img></Navbar.Brand></a>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">

              <Nav className="me-auto">
                <Nav.Link style={{ color: "#00000094", fontSize: "17px", fontFamily: "cursive" }} href="/">Home</Nav.Link>
              </Nav>

              <Navbar.Collapse className="justify-content-end link">
                <Nav.Link href='/Register'>Register</Nav.Link>
              </Navbar.Collapse>

            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    )

  }


}


export default Menu;