import * as dotenv from "dotenv";
dotenv.config();
import { MySqlDB } from "./lib/MySqlDB.js";
const mySqlDB = new MySqlDB();
async function showBook(bookId) {
    const result = await mySqlDB.query("SELECT title, total_copies, available_copies FROM books WHERE book_id = ?", [bookId]);
    const book = result[0][0];
    console.log(`"${book.title}" -> total: ${book.total_copies}, available: ${book.available_copies}`);
}
async function main() {
    console.time("Benchmark");
    const connectResponse = await mySqlDB.connect();
    console.log(connectResponse);
    if (connectResponse.isConnected) {
        const bookId = 1;
        const patronId = 1;
        console.log("=========================");
        console.log("= Starting book totals  =");
        console.log("=========================");
        await showBook(bookId);
        console.log("========================");
        console.log("= Patron borrows book  =");
        console.log("========================");
        await mySqlDB.query("UPDATE books SET available_copies = available_copies - 1 WHERE book_id = ?", [bookId]);
        await mySqlDB.query("INSERT INTO loans (patron_id, book_id, loan_date, due_date) VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY))", [patronId, bookId]);
        await showBook(bookId);
        console.log("========================");
        console.log("= Patron returns book  =");
        console.log("========================");
        await mySqlDB.query("UPDATE books SET available_copies = available_copies + 1 WHERE book_id = ?", [bookId]);
        await mySqlDB.query("UPDATE loans SET return_date = CURDATE() WHERE patron_id = ? AND book_id = ? AND return_date IS NULL", [patronId, bookId]);
        await showBook(bookId);
        const disConnectResponse = await mySqlDB.disConnect();
        console.log(disConnectResponse);
    }
    console.timeEnd("Benchmark");
}
main();
//# sourceMappingURL=index.js.map