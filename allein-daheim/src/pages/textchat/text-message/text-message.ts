export interface TextMessage {
  content: string;
  sent: Date;
  sender: number;
  receiver: number;
  unread: boolean;
}
