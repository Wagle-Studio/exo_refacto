export interface BookTypeRow {
  id: number | null;
  title: string;
  author_id: number;
  publisher_id: number;
  category_id: number;
  publication_year: number;
  price: number;
}

export class Book {
  protected id: number | null;
  protected title: string;
  protected authorId: number;
  protected publisherId: number;
  protected categoryId: number;
  protected publicationYear: number;
  protected price: number;

  constructor(
    id: number | null,
    title: string,
    authorId: number,
    publisherId: number,
    categoryId: number,
    publicationYear: number,
    price: number
  ) {
    this.id = id;
    this.title = title;
    this.authorId = authorId;
    this.publisherId = publisherId;
    this.categoryId = categoryId;
    this.publicationYear = publicationYear;
    this.price = price;
  }

  static fromRow(row: BookTypeRow): Book {
    return new Book(
      row.id,
      row.title,
      row.author_id,
      row.publisher_id,
      row.category_id,
      row.publication_year,
      row.price
    );
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getAuthorId() {
    return this.authorId;
  }

  getPublisherId() {
    return this.publisherId;
  }

  getCategoryId() {
    return this.categoryId;
  }

  getPublicationYear() {
    return this.publicationYear;
  }

  getPrice() {
    return this.price;
  }
}
