import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class Search extends React.Component {

    state = {
        searchVal: '',
        people: [{ 'Full Name (First Middle Last)': 'Loading...', 'Role:': 'Coach' }],
        show: false,
        showVal: [],
    }

    componentDidMount() {
        this.populatePeople()
    }

    async populatePeople(msg) {
        const opts = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
        }

        const resp = await fetch('https://maroon-white-backend.herokuapp.com/retrieve', opts)
        //const resp = await fetch('http://localhost:5000//retrieve', opts)
        const data = await resp.json()
        this.setState({
            people: data
        })
    }

    SearchBar() {
        const BarStyling = { color: "white", width: "50rem", background: "#212529", border: "none", padding: "1rem" };
        return (
            <Container align='center'>
                <input
                    style={BarStyling}
                    key="random1"
                    title="search"
                    value={this.state.searchVal}
                    placeholder={"Search by name"}
                    onChange={(e) => this.setState({ searchVal: e.target.value })}
                />
            </Container>
        );
    }

    showModal(id) {
        this.setState({ show: true, showVal: this.state.people[id] })
    }

    resTable() {

        return (
            <Container align='center'>
                <Table striped bordered hover variant="dark" title="matchesTable">
                    <thead>
                        <tr>
                            <th style={{ width: '1000px' }}>Name</th>
                            <th style={{ width: '1000px' }}>Student/Mentor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.people.length>0 && this.state.people.map((res, index) => {
                            if (res['Full Name (First Middle Last)'].toLowerCase().includes(this.state.searchVal.toLowerCase())) {
                                return (
                                    <tr key={index}>
                                        <td id={'row' + index} onClick={() => this.showModal(index)}>{res['Full Name (First Middle Last)']}</td>
                                        <td id={'row2' + index} onClick={() => this.showModal(index)}>{res['Role:']}</td>
                                    </tr>
                                )
                            } else {
                                return ('')
                            }

                        })}
                    </tbody>
                </Table>
            </Container>
        )
    }

    handleClose() {
        this.setState({
            show: false,
        })
    }

    render() {
        return (
            <Container align='center'>
                <br />
                <h2 title="title">Search </h2>
                <br />
                {this.SearchBar()}
                <br />
                <br />
                {this.resTable()}
                <Modal title="modal" show={this.state.show}>
                    <Modal.Header>
                        <Modal.Title>{this.state.showVal['Full Name (First Middle Last)']}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <p>Role: {this.state.showVal['Role:']}</p>
                            <p>Email: {this.state.showVal['Email Address']}</p>
                            <p>Feedback Preference: {this.state.showVal['How do you prefer to give or receive feedback?']}</p>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" id="close" onClick={() => this.handleClose()}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    }

}


export default Search;