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

  // [1] REFACTO

  addBook(book: Book) {
    this.books.push(book);
  }

  addTicket(ticket: Ticket) {
    this.tickets.push(ticket);
  }

  addArtwork(artwork: Artwork) {
    this.artworks.push(artwork);
  }

  // REMPLACE LES MÉTHODES `addBook`, `addTicket` et `addArtwork` PRECEDENTES
  addItem(item: Book | Ticket | Artwork): void {
    if (item instanceof Book) this.books.push(item);
    if (item instanceof Ticket) this.tickets.push(item);
    if (item instanceof Artwork) this.artworks.push(item);
  }

  // [2] REFACTO

  getBooksCount() {
    return this.books.length;
  }

  getTicketsCount() {
    return this.tickets.length;
  }

  getArtworksCount() {
    return this.artworks.length;
  }

  // REMPLACE LES MÉTHODES `getBooksCount`, `getTicketsCount` et `getArtworksCount` PRECEDENTES
  getItemCount(itemType: "book" | "ticket" | "artwork"): number {
    if (itemType === "ticket") return this.tickets.length;
    if (itemType === "artwork") return this.artworks.length;

    // On retourne le compte des livres par "défaut, non pas car c'est pertinent
    // mais parceque le typage de `itemType` nous assure de ne traiter que les cas `book`, `ticket` et `artwork`
    // alors si ce n'est ni un `ticket` ni un `artwork` c'est nécessairement un `book`
    return this.books.length;
  }

  // [3] REFACTO

  findBookByTitle(title: string): Book | undefined {
    return this.books.find((book) => book.getTitle() === title);
  }

  findTicketByTitle(title: string): Ticket | undefined {
    return this.tickets.find((ticket) => ticket.getTitle() === title);
  }

  findArtworkByTitle(title: string): Artwork | undefined {
    return this.artworks.find((artwork) => artwork.getTitle() === title);
  }

  // REMPLACE LES MÉTHODES `findBookByTitle`, `findTicketByTitle` et `findArtworkByTitle` PRECEDENTES
  findItemByTitle(
    itemType: "book" | "ticket" | "artwork",
    title: string
  ): Book | Ticket | Artwork | undefined {
    const collections = {
      book: this.books,
      ticket: this.tickets,
      artwork: this.artworks,
    };

    return collections[itemType].find((item) => item.getTitle() === title);
  }

  // [4] DÉCOUPAGE
  // J'ai mis les "sous-fonctions" utiles à la fonction principale en "private" car uniquement nécessaire au sein de la classe

  calculateTotals(options?: { couponCode?: string }): CartTotals {
    const calculResults = this.calculateVATAndTotal();
    const calculDiscount = this.calculDiscount(calculResults, options);

    const ttcAvantPort = this.round2(
      calculResults.booksTTC +
        calculResults.ticketsTTC +
        calculResults.artworksTTC -
        calculDiscount.bulkDiscount -
        calculDiscount.couponDiscount
    );

    const shipping = ttcAvantPort < 50 && ttcAvantPort > 0 ? 4.99 : 0;
    const totalTTC = this.round2(ttcAvantPort + shipping);
    const lines = this.buildLines(calculResults);

    return {
      subtotalHT: calculResults.subtotalHT,
      taxes: {
        books: calculResults.booksTVA,
        tickets: calculResults.ticketsTVA,
        artworks: calculResults.artworksTVA,
        total: calculResults.taxesTotal,
      },
      discounts: {
        bulk: calculDiscount.bulkDiscount,
        coupon: calculDiscount.couponDiscount,
      },
      shipping,
      totalTTC,
      lines,
    };
  }

  // Idéalement on déclarait les TVA ailleurs et sous une forme différente (fichier de configuration YAML)
  private VAT = {
    book: 0.055,
    ticket: 0.1,
    artwork: 0.2,
  };

  private getPrice = (item: any): number => {
    if (typeof item.getPrice === "function") {
      return Number(item.getPrice()) || 0;
    }

    return 0;
  };

  private round2(n: number) {
    return Math.round(n * 100) / 100;
  }

  private calculateVATAndTotal() {
    const booksHT = this.books.reduce((sum, b) => sum + this.getPrice(b), 0);
    const ticketsHT = this.tickets.reduce(
      (sum, t) => sum + this.getPrice(t),
      0
    );
    const artworksHT = this.artworks.reduce(
      (sum, a) => sum + this.getPrice(a),
      0
    );

    const booksTVA = this.round2(booksHT * this.VAT.book);
    const ticketsTVA = this.round2(ticketsHT * this.VAT.ticket);
    const artworksTVA = this.round2(artworksHT * this.VAT.artwork);

    const booksTTC = this.round2(booksHT + booksTVA);
    const ticketsTTC = this.round2(ticketsHT + ticketsTVA);
    const artworksTTC = this.round2(artworksHT + artworksTVA);

    const subtotalHT = this.round2(booksHT + ticketsHT + artworksHT);
    const taxesTotal = this.round2(booksTVA + ticketsTVA + artworksTVA);

    return {
      booksTVA,
      booksHT,
      booksTTC,
      ticketsTVA,
      ticketsHT,
      ticketsTTC,
      artworksTVA,
      artworksHT,
      artworksTTC,
      subtotalHT,
      taxesTotal,
    };
  }

  private buildLines(calculResults: Record<string, number>): {
    kind: "book" | "ticket" | "artwork";
    qty: number;
    ht: number;
    tvaRate: number;
    tva: number;
    ttc: number;
  }[] {
    return [
      {
        kind: "book" as const,
        qty: this.books.length,
        ht: this.round2(calculResults.booksHT),
        tvaRate: this.VAT.book,
        tva: calculResults.booksTVA,
        ttc: calculResults.booksTTC,
      },
      {
        kind: "ticket" as const,
        qty: this.tickets.length,
        ht: this.round2(calculResults.ticketsHT),
        tvaRate: this.VAT.ticket,
        tva: calculResults.ticketsTVA,
        ttc: calculResults.ticketsTTC,
      },
      {
        kind: "artwork" as const,
        qty: this.artworks.length,
        ht: this.round2(calculResults.artworksHT),
        tvaRate: this.VAT.artwork,
        tva: calculResults.artworksTVA,
        ttc: calculResults.artworksTTC,
      },
    ];
  }

  private calculDiscount(
    calculResults: Record<string, number>,
    options?: { couponCode?: string }
  ) {
    const itemsCount =
      this.books.length + this.tickets.length + this.artworks.length;

    const bulkDiscount =
      itemsCount > 10 ? this.round2(calculResults.subtotalHT * 0.1) : 0;

    let couponDiscount = 0;

    if (options?.couponCode) {
      const code = options.couponCode.trim().toUpperCase();
      if (code === "WELCOME5")
        couponDiscount = this.round2(calculResults.subtotalHT * 0.05);
      if (code === "VIP15")
        couponDiscount = this.round2(calculResults.subtotalHT * 0.15);
    }

    return {
      bulkDiscount,
      couponDiscount,
    };
  }
}
