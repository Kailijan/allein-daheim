import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatRequest } from './chat-request/chat-request';


@Injectable()
export class ApiTopicMatchingProvider {

  apiUrl = 'http://localhost:8080/api';

  constructor(public http: HttpClient) {
  }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.apiUrl + '/topics');
  }

  createNewChatRequest(chatRequest: ChatRequest): Observable<ChatRequest[]> {
    return this.http.post<ChatRequest[]>(this.apiUrl + '/topics', chatRequest);
  }

}
