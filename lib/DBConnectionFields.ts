// Developer:
// Purpose:

export class DBConnectionFields {
  host: string = "";
  user: string = "";
  password: string = "";
  database: string = "";

  constructor(host: string, user: string, password: string, database: string) {
    this.host = host;
    this.user = user;
    this.password = password;
    this.database = database;
  }
}
