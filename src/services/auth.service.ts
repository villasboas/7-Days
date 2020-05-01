import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Constructor Method
   *
   */
  constructor(public af: AngularFireAuth) {}

  /**
   * Do login
   *
   */
  public login({ email, password }) {
    return this.af.signInWithEmailAndPassword(email, password);
  }

  /**
   * Creates a new account
   *
   */
  public signup({ email, password }) {
    return this.af.createUserWithEmailAndPassword(email, password);
  }
}
