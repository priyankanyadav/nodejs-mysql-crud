import { Connection } from "mysql2/promise";
import { DBConnectionFields } from "./DBConnectionFields.js";
export declare class MySqlDB {
    dbConnectionFields: DBConnectionFields;
    connection: Connection | null;
    constructor();
    connect(): Promise<{
        isConnected: boolean;
        message: string;
    }>;
    query(sqlStatement: string, options?: []): Promise<any>;
    disConnect(): Promise<{
        isDisconnected: boolean;
        message: string;
    }>;
}
//# sourceMappingURL=MySqlDB.d.ts.map