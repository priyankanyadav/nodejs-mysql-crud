// Developer:
// Purpose:

import mysql, { Connection } from "mysql2/promise";
import { DBConnectionFields } from "./DBConnectionFields.js";

export class MySqlDB {
  dbConnectionFields: DBConnectionFields;
  connection: Connection | null = null;

  constructor() {
    this.dbConnectionFields = new DBConnectionFields(
      String(process.env.SQL_HOST),
      String(process.env.SQL_USER),
      String(process.env.SQL_PASSWORD),
      String(process.env.SQL_DB_NAME),
    );
  }

  async connect() {
    let connectResponse = {
      isConnected: false,
      message: "",
    };

    try {
      this.connection = await mysql.createConnection({
        host: this.dbConnectionFields.host,
        user: this.dbConnectionFields.user,
        password: this.dbConnectionFields.password,
        database: this.dbConnectionFields.database,
      });

      connectResponse.isConnected = true;
      connectResponse.message = `Connected to: ${this.dbConnectionFields.database}.`;
    } catch (error: any) {
      connectResponse.message = `Could not connect to: ${this.dbConnectionFields.database}.`;
    } finally {
      return connectResponse;
    }
  }

  async query(sqlStatement: string, options: [] = []) {
    let queryResult: any;

    if (this.connection != null) {
      queryResult = await this.connection.query(sqlStatement, options);
    }

    return queryResult;
  }

  async disConnect() {
    let disConnectResponse = {
      isDisconnected: false,
      message: "",
    };

    try {
      if (this.connection != null) {
        await this.connection.end();
      }

      disConnectResponse.isDisconnected = true;
      disConnectResponse.message = `Disconnected to: ${this.dbConnectionFields.database}.`;
    } catch (error) {
      disConnectResponse.message = `Could not disconnect to: ${this.dbConnectionFields.database}.`;
    } finally {
      return disConnectResponse;
    }
  }
}
