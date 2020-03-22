import { Observable } from "rxjs";
import { TextMessage } from "../../textchat/text-message/text-message";

export interface Chat {
  lastMessage: Observable<TextMessage>;
  unreadMessages: Observable<Array<TextMessage>>;
  sender: number;
  receiver: number;
}
