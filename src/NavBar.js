import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import HomePage from './HomePage';
import Results from './Results';
import Container from 'react-bootstrap/Container'
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';
import Settings from './Settings';
import Login from './Login'
import Students from './Students'
import Mentors from './Mentors'
import Search from './Search'

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }
  a, .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    &:hover {
      color: white;
    }
  }
`;

function NavigationBar(logout) {
    return (
        <Styles>
            <Navbar expand="lg" title="navbar">
                <Navbar.Brand><Link to="/">Maroon and White Matching</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/stats">Stats</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/students">Students</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/mentors">Mentors</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/search">Search</Link>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/settings">Settings</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="#" onClick={logout} title='logoutBtn'>Logout</Link>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles >
    )
}

function NavigationBarU(logout) {
    return (
        <Styles>
            <Navbar expand="lg" title="navbarU">
                <Navbar.Brand><Link to="/">Maroon and White Matching</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/stats">Stats</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/students">Students</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/mentors">Mentors</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="/search">Search</Link>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Item>
                            <Nav.Link>
                                <Link to="#" onClick={logout} title='logoutBtn'>Logout</Link>
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles >
    )
}

class NavBar extends React.Component {
    state = {
        token: sessionStorage.getItem("token"),
        role: null,

    }

    logout() {
        this.setState({
            token: null
        })
        sessionStorage.setItem("token", null)
    }

    render() {
        if (this.state.token === null || this.state.token === undefined || this.state.token === 'null') {
            return <Login login={() => this.setState({ token: sessionStorage.getItem("token") })} setRole={(role) => this.setState({ role: role })} />
        } else {
            if (this.state.role === 'admin' || this.props.role === 'admin') {
                return (
                    <>
                        <Router title="router">
                            {NavigationBar(() => this.logout())}
                            <Container title="cont">
                                <Switch title="switch">
                                    <Route exact path="/" component={HomePage} />
                                    <Route path="/stats" component={Results} />
                                    <Route path="/settings" component={Settings} />
                                    <Route path="/students" component={Students} />
                                    <Route path="/mentors" component={Mentors} />
                                    <Route path="/search" component={Search} />
                                    <Route component={HomePage} />
                                </Switch>
                            </Container>
                        </Router>
                    </>
                )
            } else {
                return (
                    <>
                        <Router title="routerU">
                            {NavigationBarU(() => this.logout())}
                            <Container title="contU">
                                <Switch title="switch">
                                    <Route exact path="/" component={HomePage} />
                                    <Route path="/stats" component={Results} />
                                    <Route path="/students" component={Students} />
                                    <Route path="/mentors" component={Mentors} />
                                    <Route path="/search" component={Search} />
                                    <Route component={HomePage} />
                                </Switch>
                            </Container>
                        </Router>
                    </>
                )
            }
        }
    }

}

export default NavBar;