import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Actions } from "../models/Enums";
import { State } from "../models/State";
import { Post } from "../models/Post";
import { Card, Form, Button } from 'react-bootstrap';

const PostForm: React.FC = function (): JSX.Element {
    const post = useSelector(function (state: State): Post {
        return state.post;
    });
    const dispatch = useDispatch();
    const newHandler = function () {
        dispatch({ type: Actions.POST_CLEARED });
    };
    const titleChangedHandler = function (event: React.ChangeEvent<HTMLInputElement>): void {
        dispatch({ type: Actions.TITLE_CHANGED, payload: event.target.value });
    };
    const bodyChangedHandler = function (event: React.ChangeEvent<HTMLInputElement>): void {
        dispatch({ type: Actions.BODY_CHANGED, payload: event.target.value });
    };
    const saveHandler = function () {
        if (post.title.trim().length === 0) {
            dispatch({ type: Actions.ERROR, payload: "TITLE IS REQUIRED" });
            return;
        }
        if (post.body.trim().length === 0) {
            dispatch({ type: Actions.ERROR, payload: "BODY IS REQUIRED" });
            return;
        }
        let url = "https://reactjs-e78ff-default-rtdb.firebaseio.com/posts";
        url += post.id === "" ? ".json" : "/" + post.id + ".json";
        fetch(url, {
            method: post.id === "" ? "POST" : "PUT",
            body: JSON.stringify({ title: post.title, body: post.body }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then(function (data) {
                    if (post.id === "") {
                        dispatch({ type: Actions.POST_CREATED, payload: { id: data.name, title: post.title, body: post.body } });
                    }
                    else {
                        dispatch({ type: Actions.POST_UPDATED, payload: { id: post.id, title: post.title, body: post.body } });
                    }
                });
            }
            else {
                dispatch({ type: Actions.ERROR, payload: "ERROR WHILE COMMUNICATING WITH THE API" });
            }
        });
    };
    return (
        <Card style={{ margin: "10px" }}>
            <Card.Header>POST</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="ID" value={post.id} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="ENTER TITLE" value={post.title} onChange={titleChangedHandler} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control as="textarea" placeholder="ENTER BODY" value={post.body} onChange={bodyChangedHandler} rows={3} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button variant="light" type="button" onClick={newHandler}>NEW</Button>
                        <Button variant="light" type="button" onClick={saveHandler}>SAVE</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default PostForm;