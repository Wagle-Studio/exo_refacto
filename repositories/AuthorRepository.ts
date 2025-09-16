import { Repository } from "../libs/Repository"
import { Author } from "../models/Author"

export class AuthorRepository extends Repository<Author> {
  protected tableName = "author" as const
  protected fromRow = Author.fromRow
}
