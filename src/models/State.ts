import { User } from "./User";
import { Post } from "./Post";

export class State {
    logged: boolean;
    user: User;
    post: Post;
    postCollection: Post[];
    errorAlertVisible: boolean;
    errorAlertText: string;
    infoAlertVisible: boolean;
    infoAlertText: string;
    constructor(logged: boolean, user: User, post: Post, postCollection: Post[], errorAlertVisible: boolean, errorAlertText: string, infoAlertVisible: boolean, infoAlertText: string) {
        this.logged = logged;
        this.user = user;
        this.post = post;
        this.postCollection = postCollection;
        this.errorAlertVisible = errorAlertVisible;
        this.errorAlertText = errorAlertText;
        this.infoAlertVisible = infoAlertVisible;
        this.infoAlertText = infoAlertText;
    }
};