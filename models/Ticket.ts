export interface TicketTypeRow {
  id: number | null;
  title: string;
  description: string;
  status: string;
  priority: number;
  created_at: Date;
  price: number;
}

export class Ticket {
  protected id: number | null;
  protected title: string;
  protected description: string;
  protected status: string;
  protected priority: number;
  protected createdAt: Date;
  protected price: number;

  constructor(
    id: number | null,
    title: string,
    description: string,
    status: string,
    priority: number,
    createdAt: Date,
    price: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.createdAt = createdAt;
    this.price = price;
  }

  static fromRow(row: TicketTypeRow): Ticket {
    return new Ticket(
      row.id,
      row.title,
      row.description,
      row.status,
      row.priority,
      row.created_at,
      row.price
    );
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getStatus() {
    return this.status;
  }

  getPriority() {
    return this.priority;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getPrice() {
    return this.price;
  }
}
