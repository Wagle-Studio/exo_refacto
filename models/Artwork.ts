export interface ArtworkTypeRow {
  id: number | null;
  title: string;
  artist: string;
  year: number;
  medium: string;
  location: string;
  price: number;
}

export class Artwork {
  protected id: number | null;
  protected title: string;
  protected artist: string;
  protected year: number;
  protected medium: string;
  protected location: string;
  protected price: number;

  constructor(
    id: number | null,
    title: string,
    artist: string,
    year: number,
    medium: string,
    location: string,
    price: number
  ) {
    this.id = id;
    this.title = title;
    this.artist = artist;
    this.year = year;
    this.medium = medium;
    this.location = location;
    this.price = price;
  }

  static fromRow(row: ArtworkTypeRow): Artwork {
    return new Artwork(
      row.id,
      row.title,
      row.artist,
      row.year,
      row.medium,
      row.location,
      row.price
    );
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getArtist() {
    return this.artist;
  }

  getYear() {
    return this.year;
  }

  getMedium() {
    return this.medium;
  }

  getLocation() {
    return this.location;
  }

  getPrice() {
    return this.price;
  }
}
