import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authServices: AuthService,
    private auth: AngularFireAuth, 
  ) {}

  ngOnInit() {
    this.auth.authState.subscribe((user: User | any) => {
      if (user) {
        console.log('Current User:', user);
        console.log('User UID:', user.uid);
        console.log('User Email:', user.email);
        this.router.navigate(['']); 
      } else {
        
        console.log('User not logged in.');
      }
    });
   
  
  }


  login() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    this.authServices.login(this.username, this.password).then(
      (user: any) => {
        console.log('user is authenticated', user);
        this.router.navigate(['']);
      },
      (error: any) => {
        console.log('Error during login', error);
      }
    );
  }

  forgotPassword() {
    console.log('Forgot Password clicked');
  }

  createAccount() {
    this.router.navigate(['signup']);
    console.log('Create Account clicked');
  }
}

