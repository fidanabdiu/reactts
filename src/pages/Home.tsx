import React from "react";
import { Row, Col } from "react-bootstrap";

const Home: React.FC = function (): JSX.Element {
    return (
        <div>
            <Row>
                <Col xs={4}></Col>
                <Col xs={4}>
                    <h1>WELCOME TO THE HOME PAGE</h1>
                </Col>
                <Col xs={4}></Col>
            </Row>
        </div>
    );
};

export default Home;