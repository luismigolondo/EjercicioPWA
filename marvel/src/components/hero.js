import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

var md5 = require('md5');

const Hero = () => {
    const [hero, setHero] = useState("");
    //NOTA, SI NO PUEDE HACER REQUESTS AGREGAR SU PROPIA LLAVE
    const PUBLIC_API_KEY = "0a69e39dc1ef16fc0afb78492180f9bf";
    const PRIVATE_API_KEY = "034ff411a12734c65895c793efeeee8422f098dc";
    const URL = "https://gateway.marvel.com/v1/public/characters";
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    useEffect(() => {
        const ts = Number(new Date());
        const hash = md5(ts + PRIVATE_API_KEY + PUBLIC_API_KEY);
        fetch(URL + `?ts=${ts}&orderBy=name&limit=10&apikey=${PUBLIC_API_KEY}&hash=${hash}`)
            .then(res => res.json())
            .then(res => {
                setHero(res.data.results);
            });
    })

    return (
        <div className="container">
            <h1>
                Marvel Heroes - Luis Miguel Gomez Londono!
            </h1>
            <Container>
                <Row>
                    {hero && hero.map(h => {
                        return (
                            <Col md={4}>
                                <Card>
                                    <Card.Img variant="top" src={h.thumbnail.path + `.${h.thumbnail.extension}`} />
                                    <Card.Body>
                                        <Card.Title>{h.name}</Card.Title>
                                        <Card.Text>{h.description}</Card.Text>
                                        <Button variant="primary" href={h.urls[0].url}>Mas Info</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default Hero;