import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the ApiTopicMatchingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiTopicMatchingProvider {
  apiUrl = 'http://localhost:8080/api';

  constructor(public http: HttpClient) {
    console.log('Hello ApiTopicMatchingProvider Provider');
  }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.apiUrl+'/topics');
  }

  getUsers(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.apiUrl+'/users');
  }

  // optional addTopic():
  // addUser(data) {
  //   return new Promise((resolve, reject) => {
  //     this.http.post(this.apiUrl+'/users', JSON.stringify(data))
  //       .subscribe(res => {
  //         resolve(res);
  //       }, (err) => {
  //         reject(err);
  //       });
  //   });
  // }
}
