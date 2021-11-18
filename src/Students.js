import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'

class Students extends React.Component {

    state = {
        students: [1,2,3],
    }

    componentDidMount() {
        this.fillstudents('hola')
    }

    async fillstudents(msg) {
        const opts = {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
        }

        const resp = await fetch('https://maroon-white-backend.herokuapp.com/retrieve', opts)
        //const resp = await fetch('http://localhost:5000/retrieve', opts)
        const data = await resp.json()
        this.setState({
            students: data
        })
        return true
    }

    //name
    //email
    //role
    //college

    studentsTable() {
        return (
            <Container style={{display: "inline-block" }}>
                <Table striped bordered hover variant="dark" title="studentsTable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Feeback Style</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.students.length>0 && this.state.students.map((student, index) => {
                            if (student['Role:'] === 'Fellow') {
                                return (
                                    <tr key={index}>
                                        <td>{student['Full Name (First Middle Last)']}</td>
                                        <td>{student['Email Address']}</td>
                                        <td>{student['How do you prefer to give or receive feedback?']}</td>
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
                <h2 title="title">Students </h2>
                <br />
                {this.studentsTable()}
            </Container>
        )
    }

}


export default Students;