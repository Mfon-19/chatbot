export interface Message {
  text: string;
  isUser: boolean;
  file?: File;
}