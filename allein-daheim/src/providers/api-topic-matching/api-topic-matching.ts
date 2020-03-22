import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class ApiTopicMatchingProvider {

  apiUrl = 'http://localhost:8080/api';

  constructor(public http: HttpClient) {
  }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.apiUrl+'/topics');
  }

}
