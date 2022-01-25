import React from "react";
import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import { Row, Col } from "react-bootstrap";

const Posts: React.FC = function (): JSX.Element {
    return (
        <div>
            <Row>
                <Col xs={4}>
                    <PostForm />
                </Col>
                <Col xs={8}>
                    <PostList />
                </Col>
            </Row>
        </div>
    );
};

export default Posts;