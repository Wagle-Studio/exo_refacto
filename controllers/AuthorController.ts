import { Controller } from "../libs/Controller";
import { AuthorRepository } from "../repositories/AuthorRepository";

export class AuthorController extends Controller {
  // Route GET `/authors` - liste des auteurs
  public async browseAuthors() {
    const repository = new AuthorRepository();
    const authors = await repository.findAllAuthors();

    this.response.render("pages/authors/browse.ejs", {
      authors: authors,
    });
  }
}
