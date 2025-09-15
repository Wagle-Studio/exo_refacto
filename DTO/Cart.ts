import { fakeData } from "./fakeData";
import { Artwork } from "../models/Artwork";
import { Book } from "../models/Book";
import { Ticket } from "../models/Ticket";

export type CartTotals = {
  subtotalHT: number;
  taxes: { books: number; tickets: number; artworks: number; total: number };
  discounts: { bulk: number; coupon: number };
  shipping: number;
  totalTTC: number;
  lines: Array<{
    kind: "book" | "ticket" | "artwork";
    qty: number;
    ht: number;
    tvaRate: number;
    tva: number;
    ttc: number;
  }>;
};

export class Cart {
  protected books: Book[] = fakeData.books;
  protected tickets: Ticket[] = fakeData.tickets;
  protected artworks: Artwork[] = fakeData.artworks;

  addBook(book: Book) {
    this.books.push(book);
  }

  addTicket(ticket: Ticket) {
    this.tickets.push(ticket);
  }

  addArtwork(artwork: Artwork) {
    this.artworks.push(artwork);
  }

  getBooksCount() {
    return this.books.length;
  }

  getTicketsCount() {
    return this.tickets.length;
  }

  getArtworksCount() {
    return this.artworks.length;
  }

  findBookByTitle(title: string): Book | undefined {
    return this.books.find((book) => book.getTitle() === title);
  }

  findTicketByTitle(title: string): Ticket | undefined {
    return this.tickets.find((ticket) => ticket.getTitle() === title);
  }

  findArtworkByTitle(title: string): Artwork | undefined {
    return this.artworks.find((artwork) => artwork.getTitle() === title);
  }

  /**
   * Fonctionnelle mais long et difficile à lire ... Je dois partir en vacances dsl
   * Bisou je manvole (+1 si t'as la ref)
   */
  calculateTotals(options?: { couponCode?: string }): CartTotals {
    const getPrice = (item: any): number => {
      if (typeof item.getPrice === "function") {
        return Number(item.getPrice()) || 0;
      }

      return 0;
    };

    const VAT = {
      book: 0.055,
      ticket: 0.1,
      artwork: 0.2,
    };

    const booksHT = this.books.reduce((sum, b) => sum + getPrice(b), 0);
    const ticketsHT = this.tickets.reduce((sum, t) => sum + getPrice(t), 0);
    const artworksHT = this.artworks.reduce((sum, a) => sum + getPrice(a), 0);
    const subtotalHT = round2(booksHT + ticketsHT + artworksHT);

    const booksTVA = round2(booksHT * VAT.book);
    const ticketsTVA = round2(ticketsHT * VAT.ticket);
    const artworksTVA = round2(artworksHT * VAT.artwork);
    const taxesTotal = round2(booksTVA + ticketsTVA + artworksTVA);

    const booksTTC = round2(booksHT + booksTVA);
    const ticketsTTC = round2(ticketsHT + ticketsTVA);
    const artworksTTC = round2(artworksHT + artworksTVA);

    const itemsCount =
      this.books.length + this.tickets.length + this.artworks.length;
    const bulkDiscount = itemsCount > 10 ? round2(subtotalHT * 0.1) : 0;
    let couponDiscount = 0;

    if (options?.couponCode) {
      const code = options.couponCode.trim().toUpperCase();
      if (code === "WELCOME5") couponDiscount = round2(subtotalHT * 0.05);
      if (code === "VIP15") couponDiscount = round2(subtotalHT * 0.15);
    }

    const ttcAvantPort = round2(
      booksTTC + ticketsTTC + artworksTTC - bulkDiscount - couponDiscount
    );

    const shipping = ttcAvantPort < 50 && ttcAvantPort > 0 ? 4.99 : 0;

    const totalTTC = round2(ttcAvantPort + shipping);

    const lines = [
      {
        kind: "book" as const,
        qty: this.books.length,
        ht: round2(booksHT),
        tvaRate: VAT.book,
        tva: booksTVA,
        ttc: booksTTC,
      },
      {
        kind: "ticket" as const,
        qty: this.tickets.length,
        ht: round2(ticketsHT),
        tvaRate: VAT.ticket,
        tva: ticketsTVA,
        ttc: ticketsTTC,
      },
      {
        kind: "artwork" as const,
        qty: this.artworks.length,
        ht: round2(artworksHT),
        tvaRate: VAT.artwork,
        tva: artworksTVA,
        ttc: artworksTTC,
      },
    ];

    return {
      subtotalHT,
      taxes: {
        books: booksTVA,
        tickets: ticketsTVA,
        artworks: artworksTVA,
        total: taxesTotal,
      },
      discounts: { bulk: bulkDiscount, coupon: couponDiscount },
      shipping,
      totalTTC,
      lines,
    };

    function round2(n: number) {
      return Math.round(n * 100) / 100;
    }
  }
}
