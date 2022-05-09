import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngxs/store';
import { FetchUser, Logout } from 'src/app/shared/store/user.actions';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.apiURL;

  constructor(
    private fireAuth: AngularFireAuth,
    private httpClient: HttpClient,
    private store: Store,
  ) {}


  completeRegister(data: User) {
    return this.httpClient.post<User>(`${this.API_URL}/users/register/`, data).subscribe()
  }

  SignIn(data: User) {
    return this.fireAuth.signInWithEmailAndPassword(data.useremail, data.password!).then(() => {
      this.store.dispatch(new FetchUser())
    })
  }

  SignUp(data: User) {
    return this.fireAuth.createUserWithEmailAndPassword(data.useremail, data.password!).then((user) => {
      let userData = {
        "uid": user!.user!.uid,
        "useremail": data.useremail,
        "username": data.username,
      }

        this.completeRegister(userData)
    }).then(() => {
      this.store.dispatch(new FetchUser())
    })
  }

  SignOut() {
    this.store.dispatch(new Logout());
    return this.fireAuth.signOut()
  }

  
}
