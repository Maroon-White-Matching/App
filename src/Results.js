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
        coach: [],
        fellow: [],
        OPN: 0,
        AGR: 0,
        CON: 0,
        EXT: 0,
        NEU: 0,
        Coaches: 0,
        Fellows: 0,
    }

    componentDidMount() {
        this.getMatches()
        this.getStats()
    }

    async getStats(){
        const opts = {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
        }
        const resp = await fetch("https://maroon-white-backend.herokuapp.com/stats", opts)
        const data = await resp.json()
        this.setState({
            OPN: data.OPN,
            AGR: data.AGR,
            CON: data.CON,
            EXT: data.EXT,
            NEU: data.NEU,
            Coaches: data.Coaches,
            Fellows: data.Fellows,
        })
    }
    

    async getMatches() {
        const opts = {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token")
            }
        }
        const resp = await fetch("https://maroon-white-backend.herokuapp.com/finalMatches", opts)
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
                    <Col><BarChart title='BarChart' val1={this.state.AGR} val2={this.state.CON} val3={this.state.EXT} val4={this.state.NEU} val5={this.state.OPN}/></Col>
                    <Col><PieChart title='PieChart' val1={this.state.Coaches} val2={this.state.Fellows}/></Col>
                </Row>
                <br />
                <br />
                {this.matchesTable()}
            </Container>
        )
    }

}


export default Results;