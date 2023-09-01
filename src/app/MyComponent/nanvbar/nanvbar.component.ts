import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './nanvbar.component.html',
  styleUrls: ['./nanvbar.component.css']
})
export class NanvbarComponent implements OnInit {
  user: User | any = null;
  constructor(private authService : AuthService,
               private router : Router,
               private auth: AngularFireAuth,) { }

  ngOnInit() {
    this.auth.authState.subscribe((user) => {
      this.user = user;
      if (user) {
        console.log('Logged-in User Email:', user.email);
      }
    });
  }
  logout()
  {
    this.authService.logout()
    .then(()=>
    {
      console.log("user Logged Out Successfull...");
      this.router.navigate(['signin'])
    })
    .catch(()=>
    {
      console.log("got some error");
    })
  }
 

}
