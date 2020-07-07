import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user/user';
import { UserMockList } from './user-mock-list';

import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiUsersProvider {

  private myMessageId: number;

  private $userList = new Array<UserBackendCall>();


  constructor(private http: HttpClient) {
    this.myMessageId = 1;
  }

  public getMyMessageId(): number {
    return this.myMessageId;
  }

  public getUser(userId: number): Observable<User> {
    let $user = this.$userList.find(call => call.UserId === userId);

    if ($user) {
      if (!$user.requestRunning() && !$user.hasDataReceived()) {
        $user.get();
      }
    } else {
      $user = new UserBackendCall(userId, this.http);
      this.$userList.push($user);
      $user.get();
    }
    return $user.Data;
  }

}

class UserBackendCall {

  private static readonly UserUrl = 'http://localhost:8080/api/users/';

  public readonly UserId: number;
  public readonly Data = new ReplaySubject<User>(1);

  private _running = false;
  private _dataReceived = false;

  constructor(userId: number,
              private http: HttpClient) {
    this.UserId = userId;
  }

  public requestRunning(): boolean {
    return this._running;
  }

  public hasDataReceived(): boolean {
    return this._dataReceived;
  }

  public get() {
    this._running = true;
    this._dataReceived = false;
    this.http.get<User>(UserBackendCall.UserUrl + this.UserId)
      .subscribe(
        (receivedUser) => this.dataReceived(receivedUser),
        (error) => this.onError(error)
      );
  }

  private dataReceived(data: User) {
    this._dataReceived = true;
    this._running = false;
    this.Data.next(data);
  }

  loadFakeUser(): User {
    let user = UserMockList.find((user) => user.id == this.UserId);
    console.log('loading fake user:')
    console.log(user);
    return user;
  }

  private onError(error) {
    this.dataReceived(this.loadFakeUser());
    this._running = false;
    console.log('UserBackendCall error');
    console.log(error);
  }
}