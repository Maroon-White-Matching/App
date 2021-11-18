import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

class Mentors extends React.Component {

    state = {
        mentors: [1,2,3],
    }

    componentDidMount() {
        this.fillmentors('hola')
    }

    async fillmentors(msg) {
        const opts = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
        }

        const resp = await fetch('https://capstonebackendthien.herokuapp.com/retrieve', opts)
        //const resp = await fetch('http://localhost:5000/retrieve', opts)
        const data = await resp.json()
        this.setState({
            mentors: data
        })
        return true
    }

    mentorsTable() {
        return (
            <Container style={{display: "inline-block" }}>
                <Table striped bordered hover variant="dark" title="mentorsTable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Feeback Style</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.mentors.length>0 && this.state.mentors.map((mentor, index) => {
                            if (mentor['Role:'] === 'Coach') {
                                return (
                                    <tr key={index}>
                                        <td>{mentor['Full Name (First Middle Last)']}</td>
                                        <td>{mentor['Email Address']}</td>
                                        <td>{mentor['How do you prefer to give or receive feedback?']}</td>
                                    </tr>
                                )
                            }else{
                                return ''
                            }
                        })}
                    </tbody>
                </Table>
            </Container>
        )
    }

    render() {
        return (
            <Container align='center'>
                <br />
                <h2 title="title">Mentors </h2>
                <br />
                {this.mentorsTable()}
            </Container>
        )
    }

}


export default Mentors;