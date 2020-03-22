import { ChatRequest } from "./chat-request";

export interface ChatRequestResponse {
  chatRequestKey: ChatRequest;
  expires: Date;
}
