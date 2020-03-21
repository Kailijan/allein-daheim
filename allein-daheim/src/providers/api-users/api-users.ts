import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiUsersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiUsersProvider {

  private users = [
    { name: 'peter', id: 1 }
  ]

  constructor() {
    console.log('Hello ApiUsersProvider Provider');
  }

  public getUser(userId: number) {
    const filteredUsers = this.users.filter((user) => user.id == userId);
    if (filteredUsers.length == 0)
      return undefined;
    return filteredUsers[0];
  }

  public addUser(userId: number, userName: string) {
    this.users.push({ id: userId, name: userName });
  }

}
