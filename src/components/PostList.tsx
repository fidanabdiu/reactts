import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'react-bootstrap';
import { State } from "../models/State";
import { Post } from '../models/Post';
import { Actions } from "../models/Enums";

const PostList: React.FC = function (): JSX.Element {
    const postCollection = useSelector(function (state: State): Post[] {
        return state.postCollection;
    });
    const dispatch = useDispatch();
    useEffect(function () {
        getHandler();
    }, []);
    const getHandler = function () {
        fetch("https://reactjs-e78ff-default-rtdb.firebaseio.com/posts.json").then(function (response) {
            if (response.status === 200) {
                response.json().then(function (data) {
                    let newPostCollection = [];
                    for (const key in data) {
                        newPostCollection.push({
                            id: key,
                            title: data[key].title,
                            body: data[key].body
                        });
                    }
                    dispatch({ type: Actions.POSTS_FETCHED, payload: newPostCollection });
                });
            }
            else {
                dispatch({ type: Actions.ERROR, payload: "ERROR WHILE COMMUNICATING WITH THE API." });
            }
        });
    };
    const editHandler = function (event: React.MouseEvent<HTMLButtonElement>): void {
        let id = event.currentTarget.id.split('|')[1];
        let post = postCollection.find(x => x.id === id);
        dispatch({ type: Actions.POST_EDITED, payload: post });
    };
    const deleteHandler = function (event: React.MouseEvent<HTMLButtonElement>): void {
        let id = event.currentTarget.id.split('|')[1];
        let url = "https://reactjs-e78ff-default-rtdb.firebaseio.com/posts/" + id + ".json";
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (response) {
            if (response.status === 200) {
                response.json().then(function (data) {
                    dispatch({ type: Actions.POST_DELETED, payload: id });
                });
            }
            else {
                dispatch({ type: Actions.ERROR, payload: "ERROR WHILE COMMUNICATING WITH THE API." });
            }
        });
    };
    return (
        <Card style={{ margin: "10px" }}>
            <Card.Header>POST LIST</Card.Header>
            <Card.Body>
                {
                    postCollection.length === 0
                        ?
                        <h3>THERE ARE NO POSTS. YOU CAN START CREATING THEM.</h3>
                        :
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>ID</th>
                                    <th>TITLE</th>
                                    <th>BODY</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    postCollection.map(x => {
                                        return <tr key={x.id}>
                                            <td><button id={"edit|" + x.id} type="button" className="btn btn-light" onClick={editHandler}>EDIT</button></td>
                                            <td><button id={"delete|" + x.id} type="button" className="btn btn-light" onClick={deleteHandler}>DELETE</button></td>
                                            <td>{x.id}</td>
                                            <td>{x.title}</td>
                                            <td>{x.body}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                }
            </Card.Body>
        </Card>
    );
};

export default PostList;