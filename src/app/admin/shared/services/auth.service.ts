import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {FbAuthResponse, User} from '../interfaces/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {

    public error$: Subject<string> = new Subject<string>();

    constructor(private http: HttpClient) {
    }

    get token(): string {
        const expDate = new Date(localStorage.getItem('fb-token-exp'));
        if (new Date() > expDate) {
            this.logOut();
            return null;
        }

        return localStorage.getItem('fb-token-id');
    }

    logIn(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                tap(this.setToken),
                catchError(this.handleError.bind(this))
            );
    }

    logOut() {
        this.setToken(null);
    }

    isAuth(): boolean {
        return !!this.token;
    }

    private setToken(res: FbAuthResponse | null) {
        if (res) {
            const expareDate = new Date(new Date().getTime() + Number(res.expiresIn) * 1000);
            localStorage.setItem('fb-token-id', res.idToken);
            localStorage.setItem('fb-token-exp', expareDate.toString());
        } else {
            localStorage.clear();
        }
    }

    private handleError(err: HttpErrorResponse) {
        const {message} = err.error.error;

        switch (message) {
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Email not found');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Invalid password');
                break;
            case 'USER_DISABLED':
                this.error$.next('User disabled');
                break;
        }

        return throwError(err);
    }

}
