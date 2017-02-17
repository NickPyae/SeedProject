import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    loginModalDisplay: string;
    signupModalDisplay: string;

    constructor() {  
        this.loginModalDisplay = this.loginModalDisplay || 'none';
        this.signupModalDisplay = this.signupModalDisplay || 'none';
    }

    ngOnInit() {
       
    }  

    showLoginModal() {
        this.loginModalDisplay = 'block';
    }

    showSignupModal() {
         this.signupModalDisplay = 'block';
    }

    loginToAccount(form: NgForm) {
        console.log(form.value);
        this.loginModalDisplay = 'none';
        form.reset();
    }    

    signup(form: NgForm) {
        console.log(form.value);
        this.signupModalDisplay = 'none';
        form.reset();
    }

    cancel() {
        this.loginModalDisplay = 'none';
        this.signupModalDisplay = 'none';
    }
}