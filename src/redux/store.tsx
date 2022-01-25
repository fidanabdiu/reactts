import { createStore } from "redux";
import { State } from "../models/State";
import { Post } from "../models/Post";
import { User } from "../models/User";
import { Action } from "../models/Action";
import { Actions } from "../models/Enums";
import { LOCALSTORAGE_KEY } from "../models/Constants";

const INITIAL_STATE = new State(false, new User("", ""), new Post("", "", ""), [], false, "", true, "INITIAL STATE");
const reducer = function (state: State = INITIAL_STATE, action: Action): State {
    if (action.type === Actions.ERROR) {
        return new State(state.logged,
            new User(state.user.username, state.user.password),
            new Post(state.post.id, state.post.title, state.post.body),
            state.postCollection,
            true,
            action.payload,
            false,
            "");
    }
    else if (action.type === Actions.INFO) {
        return new State(state.logged,
            new User(state.user.username, state.user.password),
            new Post(state.post.id, state.post.title, state.post.body),
            state.postCollection,
            false,
            "",
            true,
            action.payload);
    }
    else if (action.type === Actions.USERNAME_CHANGED) {
        return new State(state.logged,
            new User(action.payload, state.user.password),
            new Post(state.post.id, state.post.title, state.post.body),
            state.postCollection,
            false,
            "",
            true,
            "USERNAME CHANGED SUCCESSFULLY");
    }
    else if (action.type === Actions.PASSWORD_CHANGED) {
        return new State(state.logged,
            new User(state.user.username, action.payload),
            new Post(state.post.id, state.post.title, state.post.body),
            state.postCollection,
            false,
            "",
            true,
            "PASSWORD CHANGED SUCCESSFULLY");
    }
    else if (action.type === Actions.LOGGED_IN) {
        return new State(true,
            new User(action.payload.username, action.payload.password),
            new Post(state.post.id, state.post.title, state.post.body),
            state.postCollection,
            false,
            "",
            true,
            "LOGGED IN SUCCESSFULLY");
    }
    else if (action.type === Actions.LOGGED_OUT) {
        return new State(false,
            new User("", ""),
            new Post("", "", ""),
            [],
            false,
            "",
            true,
            "LOGGED OUT SUCCESSFULLY");
    }
    else if (action.type === Actions.POST_CLEARED) {
        return new State(state.logged,
            new User(state.user.username, state.user.password),
            new Post("", "", ""),
            state.postCollection,
            false,
            "",
            true,
            "POST CLEARED SUCCESSFULLY");
    }
    else if (action.type === Actions.TITLE_CHANGED) {
        return new State(state.logged,
            new User(state.user.username, state.user.password),
            new Post(state.post.id, action.payload, state.post.body),
            state.postCollection,
            false,
            "",
            true,
            "TITLE CHANGED SUCCESSFULLY");
    }
    else if (action.type === Actions.BODY_CHANGED) {
        return new State(state.logged,
            new User(state.user.username, state.user.password),
            new Post(state.post.id, state.post.title, action.payload),
            state.postCollection,
            false,
            "",
            true,
            "BODY CHANGED SUCCESSFULLY");
    }
    else if (action.type === Actions.POST_CREATED) {
        let newPostCollection = [...state.postCollection, action.payload];
        return new State(state.logged,
            new User(state.user.username, state.user.password),
            new Post(action.payload.id, action.payload.title, action.payload.body),
            newPostCollection,
            false,
            "",
            true,
            "POST CREATED SUCCESSFULLY");
    }
    else if (action.type === Actions.POST_UPDATED) {
        let newPostCollection = [...state.postCollection];
        let index = newPostCollection.findIndex(x => x.id === action.payload.id);
        newPostCollection.splice(index, 1);
        newPostCollection.splice(index, 0, action.payload);
        return new State(state.logged,
            new User(state.user.username, state.user.password),
            new Post(action.payload.id, action.payload.title, action.payload.body),
            newPostCollection,
            false,
            "",
            true,
            "POST UPDATED SUCCESSFULLY");
    }
    else if (action.type === Actions.POSTS_FETCHED) {
        return new State(state.logged,
            new User(state.user.username, state.user.password),
            new Post(state.post.id, state.post.title, state.post.body),
            action.payload,
            false,
            "",
            true,
            "POSTS FETCHED SUCCESSFULLY");
    }
    else if (action.type === Actions.POST_EDITED) {
        return new State(state.logged,
            new User(state.user.username, state.user.password),
            new Post(action.payload.id, action.payload.title, action.payload.body),
            state.postCollection,
            false,
            "",
            true,
            "POST SELECTED SUCCESSFULLY");
    }
    else if (action.type === Actions.POST_DELETED) {        
        let newPostCollection = [...state.postCollection];
        let index = newPostCollection.findIndex(x => x.id === action.payload);
        newPostCollection.splice(index, 1);
        return new State(state.logged,
            new User(state.user.username, state.user.password),
            new Post("", "", ""),
            newPostCollection,
            false,
            "",
            true,
            "POST DELETED SUCCESSFULLY");
    }
    else {
        return getState();
    }
};
const store = createStore(reducer);
const stateChangedHandler = function (): void {
    let state = store.getState();
    let stateJson = JSON.stringify(state);
    localStorage.setItem(LOCALSTORAGE_KEY, stateJson);
    console.log(state);
};
store.subscribe(stateChangedHandler);
function getState(): State {
    let stateJson = localStorage.getItem(LOCALSTORAGE_KEY);
    if (stateJson === null) {
        stateJson = JSON.stringify(INITIAL_STATE);
        localStorage.setItem(LOCALSTORAGE_KEY, stateJson);
    }
    let state = JSON.parse(stateJson);
    return state;
};
export default store;