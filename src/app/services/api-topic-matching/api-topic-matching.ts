import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatRequest } from './chat-request/chat-request';
import { ChatRequestResponse } from './chat-request/chat-request-response';


@Injectable({
  providedIn: 'root',
})
export class ApiTopicMatchingProvider {

  public selectedTopicId: number[];

  private readonly apiUrl = 'http://localhost:8080/api';

  private readonly topicsUrl = this.apiUrl + '/topics'
  private readonly chatRequestUrl = this.apiUrl + '/chat-request'
  private readonly chatRequestUserQueryUrl = this.chatRequestUrl + '?user='

  constructor(public http: HttpClient) {
  }


  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.topicsUrl);
  }


  createNewChatRequest(chatRequest: ChatRequest): Observable<ChatRequestResponse> {
    return this.http.post<ChatRequestResponse>(this.chatRequestUrl, chatRequest);
  }


  deleteChatRequest(chatRequest: ChatRequestResponse) {
    return this.deleteChatRequestsById(chatRequest.chatRequestKey.userId);
  }

  deleteChatRequestsById(userId: number) {
    return this.http.delete(this.chatRequestUserQueryUrl + userId);
  }


  getChatRequest(chatRequest: ChatRequestResponse): Observable<ChatRequestResponse> {
    return this.getChatRequestById(chatRequest.chatRequestKey.userId);
  }

  getChatRequestById(userId: number): Observable<ChatRequestResponse> {
    return this.http.get<ChatRequestResponse>(this.chatRequestUserQueryUrl + userId);
  }

}
