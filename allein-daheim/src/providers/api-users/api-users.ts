import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user/user';
import { Observable, ReplaySubject } from 'rxjs';
/*
  Generated class for the ApiUsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiUsersProvider {

  private url = 'http://localhost:8080/api/users/';

  private myMessageId: number;

  private users: Array<User>;

  constructor(private http: HttpClient) {
    this.users = new Array<User>();
    this.myMessageId = 1;
  }

  public getMyMessageId(): number {
    return this.myMessageId;
  }

  public getUser(userId: number): Observable<User> {
    let $result = new ReplaySubject<User>(1);
    let user = this.users.find((user) => user.id == userId);
    if (user === undefined) {
      this.loadUser(userId).subscribe((user) => {
        console.log(user);
        if (user) {
          this.users.push(user);
        }
        $result.next(user);
      }, (error) => {
        console.log(error);
        $result.next({ name: 'Unbekannt', id: userId, lastSeen: null });
      });
    }
    // return stored object or null instantly to show data or tell that there are none
    $result.next(user);
    return $result;
  }

  private loadUser(userId: number): Observable<User> {
    console.log('lade user vom backend: ' + userId);
    return this.http.get<User>(this.url + userId);
  }

}
