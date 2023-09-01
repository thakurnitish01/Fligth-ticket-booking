import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '@angular/fire/auth';
import { Observable, map, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth,
             private firestore: AngularFirestore) {}

  createNewUser(email: string, password: string): Promise<User> | any {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string): Promise<User> | any {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password);
  }
  logout(): Promise<void> {
    return this.firebaseAuth.signOut();
  }
  isLoggedIn(): Observable<User | any> {
    return this.firebaseAuth.authState;
  }
  isUserAuthenticated(): boolean {
    return !!this.firebaseAuth.currentUser;
  }
  getCurrentUserId(): string | any {
    return this.firebaseAuth.currentUser;
    
  }
  
  // Get the current user's role from the database
  getUserRole(): Observable<string | null> {
    return this.firebaseAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore.collection('users').doc<any>(user.uid).valueChanges()
          .pipe(map((userData) => userData?.role));
          
        } else {
          return new Observable<string | any>((observer) => observer.next(null));
        }
      })
    );
  }
}