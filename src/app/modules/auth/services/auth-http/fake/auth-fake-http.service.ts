import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../../../../../environments/environment";
import { UsersTable } from "../../../../../_fake/users.table";
import { AuthModel } from "../../../models/auth.model";
import { UserModel } from "../../../models/user.model";

const API_USERS_URL = `${environment.apiUrl}/Account/login`;

@Injectable({
  providedIn: "root",
})
export class AuthHTTPService {
  constructor(private http: HttpClient) {}

  // public methods
  login(email: string, password: string): Observable<any> {
    const notFoundError = new Error("Not Found");
    if (!email || !password) {
      return of(notFoundError);
    }

    return this.loginBase({ username: email, password }).pipe(
      map((result: AuthModel) => {
        // if (result.length <= 0) {
        //   return notFoundError;
        // }

        // const user = result.find((u) => {
        //   return (
        //     u.email.toLowerCase() === email.toLowerCase() &&
        //     u.password === password
        //   );
        // });
        // if (!user) {
        //   return notFoundError;
        // }

        const auth = new AuthModel();
        auth.data.token = result.data.token;
        auth.data.expiryDate = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
        return auth;
      })
    );
  }

  // createUser(user: UserModel): Observable<any> {
  //   user.roles = [2]; // Manager
  //   user.authToken = "auth-token-" + Math.random();
  //   user.refreshToken = "auth-token-" + Math.random();
  //   user.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
  //   user.pic = "./assets/media/avatars/300-1.jpg";

  //   return this.http.post<UserModel>(API_USERS_URL, user);
  // }

  // forgotPassword(email: string): Observable<boolean> {
  //   return this.loginBase({}).pipe(
  //     map((result: UserModel[]) => {
  //       const user = result.find(
  //         (u) => u.email.toLowerCase() === email.toLowerCase()
  //       );
  //       return user !== undefined;
  //     })
  //   );
  // }

  // getUserByToken(token: string): Observable<UserModel | undefined> {
  //   const user = UsersTable.users.find((u: UserModel) => {
  //     return u.authToken === token;
  //   });

  //   if (!user) {
  //     return of(undefined);
  //   }

  //   return of(user);
  // }

  loginBase(body: {
    username: string;
    password: string;
  }): Observable<AuthModel> {
    return this.http.post<AuthModel>(API_USERS_URL, body);
  }
}
