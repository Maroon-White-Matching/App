import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap'
import { Alert } from 'react-bootstrap';

class Login extends React.Component {

    state = {
        email: '',
        password: '',
        cpassword: '',
        name: '',
        error: false,
        errMes: '',
        createAcc: false,
        created: false,
    }

    setName(e) {
        this.setState({
            name: e.target.value
        })
    }

    setEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    setPassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    setCpassword(e) {
        this.setState({
            Cpassword: e.target.value
        })
    }

    async onSubmit(e, email, psswd) {
        e.preventDefault()
        const opts = {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": email.toString().toLowerCase(),
                "password": btoa(psswd)
            })
        }
        const resp = await fetch('https://capstonebackendthien.herokuapp.com/login', opts)
        //const resp = await fetch('http://localhost:5000/login', opts)
        const data = await resp.json()

        if (await resp.status === 200) {
            sessionStorage.setItem("token", await data.access_token)
            this.props.login()
            this.props.setRole(await data.role)
            return await data.access_token
        }else if(await resp.status === 301){
            this.setState({
                error: true,
                errMes: 'User is pending approval.',
            })
            return false
        } else {
            this.setState({
                error: true,
                errMes: 'Incorrect credentials.',
            })
            return false
        }
    }

    async createRequest(name, email, psswd){
        const opts = {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name,
                "username": email.toString().toLowerCase(),
                "password": btoa(psswd)
            })
        }
        await fetch('https://capstonebackendthien.herokuapp.com/create', opts)
        //await fetch('http://localhost:5000/create', opts)
    
    }

    onSubmitCreate(e) {
        e.preventDefault()
        if (this.state.name.length < 3) {
            this.setState({
                error: true,
                errMes: 'Please enter a valid name.',
            })
            return
        }
        if (this.state.email.length < 5) {
            this.setState({
                error: true,
                errMes: 'Please enter a valid email address.',
            })
            return
        }
        if (this.state.password.length < 5) {
            this.setState({
                error: true,
                errMes: 'Please enter a valid password.',
            })
            return
        }
        if (this.state.password === this.state.Cpassword) {
            this.setState({
                created: true,
                error: false,
            })
            this.createRequest(this.state.name, this.state.email, this.state.password)
        } else {
            this.setState({
                error: true,
                errMes: 'Passwords do not match.',
            })
        }
    }

    displayError() {
        if (this.state.error) {
            return (
                <Alert variant="danger" title="wrongCredentialsAlert">{this.state.errMes}</Alert>
            )
        }
    }

    createAccount() {
        this.setState({
            createAcc: true,
        })
    }

    renderForm() {

        return (
            <Form onSubmit={(e) => this.onSubmit(e, this.state.email, this.state.password)} title="loginForm">
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={this.state.email}
                        onChange={(e) => this.setEmail(e)}
                        title="email"
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={this.state.password}
                        onChange={(e) => this.setPassword(e)}
                        title="password"
                    />
                </Form.Group>
                <Button block size="lg" type="submit" variant="dark" title="loginButton">
                    Login
                </Button>
                <Button onClick={() => this.createAccount()} block size="lg" variant="dark" title="CreateAccBttn">
                    Create Account
                </Button>
            </Form>
        )
    }

    renderCreateAcc() {
        return (
            <Form onSubmit={(e) => this.onSubmitCreate(e)} title="CreateAccForm">
                <Form.Group size="lg" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        value={this.state.name}
                        onChange={(e) => this.setName(e)}
                        title="name"
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={this.state.email}
                        onChange={(e) => this.setEmail(e)}
                        title="email"
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={this.state.password}
                        onChange={(e) => this.setPassword(e)}
                        title="password"
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={this.state.Cpassword}
                        onChange={(e) => this.setCpassword(e)}
                        title="cpassword"
                    />
                </Form.Group>
                <Button type="submit" onClick={() => this.createAccount()} block size="lg" variant="dark" title="confirmBtn">
                    Confirm
                </Button>
                <Button onClick={() => this.backToLogin()} block size="lg" variant="dark" title="cancelBtn">
                    Cancel
                </Button>

            </Form>
        )
    }

    backToLogin() {
        this.setState({
            email: '',
            password: '',
            cpassword: '',
            name: '',
            error: false,
            errMes: '',
            createAcc: false,
            created: false,
        })
    }

    which() {
        if (this.state.created) {
            return (
                <Container title="createdMess">
                    <p style={{ fontSize: '25px', maxWidth: '80%' }}>
                        Your account has been created. Please wait until an admin approves it.
                    </p>
                    <Button onClick={() => this.backToLogin()} block size="lg" type="submit" variant="dark" title="BloginButton">
                        Login
                    </Button>
                </Container>
            )
        }
        if (this.state.createAcc) {
            return this.renderCreateAcc()
        } else {

            return this.renderForm()
        }
    }

    render() {
        return (
            <Container align='center'>
                <br />
                <h2>Maroon & White Matching</h2>
                <br />
                <Container align='center' style={{ width: '30%' }}>
                    {this.which()}
                    <br />
                    {this.displayError()}
                </Container>
            </Container>
        )
    }
}

export default Login

