import { Repository } from "../libs/Repository";
import { Book } from "../models/Book";

export class PublisherRepository extends Repository<any> {
  protected tableName = "book" as const;
  protected fromRow = Book.fromRow;
}
