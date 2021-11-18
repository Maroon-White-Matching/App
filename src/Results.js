import React from 'react';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from 'react-bootstrap';
import BarChart from './BarChart'
import PieChart from './PieChart';
import Table from 'react-bootstrap/Table'

class Results extends React.Component {

    state = {
        id: [0,1],
        coach: ['Loading'],
        fellow: ['Loading'],
    }

    componentDidMount() {
        this.getMatches()
    }

    async getMatches() {
        const opts = {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
        }
        const resp = await fetch("https://capstonebackendthien.herokuapp.com/finalMatches", opts)
        //const resp = await fetch("http://localhost:5000/finalMatches", opts)
        const data = await resp.json()
        this.setState({
            id: data.id,
            coach: data.coach,
            fellow: data.fellow
        })
    }

    matchesTable() {

        return (
            <Container>
                <h3>Matches</h3>
                <Table striped bordered hover variant="dark" title="matchesTable">
                    <thead>
                        <tr>
                            <th>Coach</th>
                            <th>Fellow</th>
                        </tr>
                    </thead>
                    <tbody>
                            {this.state.id && this.state.id.map((id, index) => (
                                <tr key={index}>
                                    <td>{this.state.coach[index]}</td>
                                    <td>{this.state.fellow[index]}</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </Container>
        )
    }

    render() {
        return (
            <Container align='center'>
                <br />
                <h2>Stats</h2>
                <br />
                <Row>
                    <Col><BarChart title='BarChart' val1={10} val2={10} val3={15} val4={10} val5={10}/></Col>
                    <Col><PieChart title='PieChart' val1={10} val2={10}/></Col>
                </Row>
                <br />
                <br />
                {this.matchesTable()}
            </Container>
        )
    }

}


export default Results;