import { Repository } from "../libs/Repository"
import { Book } from "../models/Book"

export class BookRepository extends Repository<Book> {
  protected tableName = "book" as const
  protected fromRow = Book.fromRow
}
