export class AuthModel {
  data: {
    token: string;
    expiryDate: string | Date;
  };

  messages: Array<string>;

  setAuth(auth: AuthModel) {
    this.data = auth.data;
    this.messages = auth.messages;
  }
}
