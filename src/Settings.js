import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import RangeSlider from 'react-bootstrap-range-slider';
import Alert from 'react-bootstrap/Alert'

class Settings extends React.Component {

    state = {
        id: [0],
        name: ['Loading'],
        role: ['Loading'],
        show: false,
        sId: null,
        value: [0, 0, 0],
        alert: null,
        results: null,
    }

    componentDidMount() {
        this.getUsers('hola')
    }

    async getUsers(msg) {
        const opts = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
        }

        try {
            const resp = await fetch('https://capstonebackendthien.herokuapp.com/users', opts)
            //const resp = await fetch('http://localhost:5000/users', opts)
            const data = await resp.json()
            this.setState({
                id: data.id,
                name: data.name,
                role: data.role
            })
            return true
        } catch {
            sessionStorage.setItem("token", null)
            this.forceUpdate()
            return false
        }
    }

    async makeAdmin(idI, valueI) {
        let json = { "id": idI, "value": valueI }
        json = JSON.stringify(json)
        const opts = {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token")
            },
            body: json
        }


        const resp = await fetch('https://capstonebackendthien.herokuapp.com/update', opts)
        //const resp = await fetch('http://localhost:5000/update', opts)
        const respJ = await resp.json()
        this.getUsers(respJ)


    }

    confirmDelete(idI) {
        this.setState({
            sId: idI,
            show: true,
        })
    }

    async delete(idI) {
        let json = { "id": idI }
        json = JSON.stringify(json)
        const opts = {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token")
            },
            body: json
        }

        const resp = await fetch('https://capstonebackendthien.herokuapp.com/delete', opts)
        //const resp = await fetch('http://localhost:5000/delete', opts)
        const respJ = await resp.json()
        this.getUsers(respJ)

        this.handleClose()
    }

    handleClose() {
        this.setState({
            sId: null,
            show: false,
        })
    }

    setValue(val, ind) {
        let vals = [...this.state.value];
        vals[ind] = val
        this.setState({
            value: vals,
        })
    }

    async runAlgo() {
        let json = { "ccr": this.state.value[0].toString(), "cl": this.state.value[1].toString(), "cr": this.state.value[2].toString() }
        json = JSON.stringify(json)
        const opts = {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token")
            },
            body: json
        }


        const resp = await fetch('https://capstonebackendthien.herokuapp.com/results', opts)
        //const resp = await fetch('http://localhost:5000/results', opts)
        const respJ = await resp.json()
        this.setState({ results: respJ })
        this.setState({ alert: resp.status })

    }

    displayError(prop) {
        if (this.state.alert === null && prop !== 200 && prop !== 400) {

        } else if (this.state.alert === 200 || prop === 200) {
            return (
                <>
                    <br />
                    <br />
                    <Alert variant="success" title="wrongCredentialsAlert">Matches Succesfully Computed.</Alert>
                </>
            )
        } else {
            return (
                <>
                    <br />
                    <br />
                    <Alert variant="danger" title="wrongCredentialsAlert">An error occured.</Alert>
                </>
            )
        }
    }

    render() {
        return (
            <Container align='center'>
                <br />
                <h2>Settings</h2>
                <br />
                <Container style={{ maxWidth: '50%' }}>
                    <h3>Challenge and Critical Reflection</h3>
                    <RangeSlider
                        title="slider1"
                        value={this.state.value[0]}
                        onChange={changeEvent => this.setValue(changeEvent.target.value, 0)}
                        max='10'
                        step={0.5}
                    />
                    <h3>Competence and Learning</h3>
                    <RangeSlider
                        title="slider2"
                        value={this.state.value[1]}
                        onChange={changeEvent => this.setValue(changeEvent.target.value, 1)}
                        max='10'
                        step={0.5}
                    />
                    <h3>Compatability and Relationship</h3>
                    <RangeSlider
                        title="slider3"
                        value={this.state.value[2]}
                        onChange={changeEvent => this.setValue(changeEvent.target.value, 2)}
                        max='10'
                        step={0.5}
                    />
                    <Button variant="dark" title="run" onClick={() => this.runAlgo()}>Run Matching Algorithm</Button>
                    {this.displayError()}
                </Container>
                <br />
                <br />

                <Container>
                    <h3>Users</h3>
                    <Table striped bordered hover variant="dark" title="users">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.id.map((id, index) => (
                                <tr key={index}>
                                    <td>{this.state.name[index]}</td>
                                    <td>{this.state.role[index]}</td>
                                    <td><Button title="makeAdmin" variant="dark" onClick={() => this.makeAdmin(id, 'admin')}>Make Admin</Button>{' '}<Button variant="dark" onClick={() => this.makeAdmin(id, 'user')}>Make User</Button>{' '}<Button title='deleteAcc' variant="dark" onClick={() => this.confirmDelete(id)}>Delete Account</Button>{' '}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Container>
                <Modal title="modal" show={this.state.show}>
                    <Modal.Header>
                        <Modal.Title>Warning</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this account?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" title="close" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                        <Button variant="primary" title="confirm" onClick={() => this.delete(this.state.sId)}>
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }

}


export default Settings;