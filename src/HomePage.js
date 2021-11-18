import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import image from './logo.jpg'
import Image from 'react-bootstrap/Image'

class HomePage extends React.Component {
    render() {
        return (
            <div align='center' className='container'>
                <br />
                <h2 title="title">Maroon & White </h2>
                <br />
                <div>
                    <p style={{ fontSize: '25px', maxWidth: '60%' }}>
                        Welcome to the Maroon & White Leadership Program matching application!
                        Go to the stats tab to view results. Admins can go to the settings tab to
                        run the algorythm or manage users. 
                    </p>
                </div>
                <br />
                <Container>
                    <Image src={image} thumbnail />
                </Container>
            </div>
        )
    }

}


export default HomePage;