import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../shared/interfaces/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

    submitted = false;
    message = '';

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    constructor(
        public authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            if (params['loginAgain']) {
                this.message = 'Please login';
            }
        });
    }

    onSubmit() {
        console.log(this.loginForm.value);

        this.submitted = true;

        const user: User = {
            email: this.loginForm.value.email,
            password: this.loginForm.value.password
        };

        this.authService.logIn(user)
            .subscribe((res) => {
                this.loginForm.reset();
                this.router.navigate(['/admin', 'dashboard']);
                this.submitted = false;
            }, () => {
                this.submitted = false;
            });
    }
}

