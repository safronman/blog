export class User {
    email: string;
    password: string;
    returnSecureToken?: boolean;
}

export class FbAuthResponse {
    idToken: string;
    expiresIn: string;
}

export class Post {
    id?: string;
    title: string;
    text: string;
    author: string;
    date: Date;
}
