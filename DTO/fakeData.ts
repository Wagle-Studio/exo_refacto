import { Artwork } from "../models/Artwork";
import { Book } from "../models/Book";
import { Ticket } from "../models/Ticket";

export const fakeData = {
  artworks: [
    new Artwork(
      1,
      "Starry Night",
      "Vincent van Gogh",
      1889,
      "Oil on canvas",
      "MoMA, New York",
      1500
    ),
    new Artwork(
      2,
      "Mona Lisa",
      "Leonardo da Vinci",
      1503,
      "Oil on wood",
      "Louvre, Paris",
      8500
    ),
    new Artwork(
      3,
      "The Persistence of Memory",
      "Salvador Dalí",
      1931,
      "Oil on canvas",
      "MoMA, New York",
      550
    ),
  ],

  books: [
    new Book(1, "1984", 1, 101, 201, 1949, 12),
    new Book(2, "Pride and Prejudice", 2, 102, 202, 1813, 9),
    new Book(3, "Kafka on the Shore", 3, 103, 203, 2002, 21),
  ],

  tickets: [
    new Ticket(
      1,
      "Concert Coldplay",
      "Entrée pour le concert au Stade de France",
      "confirmed",
      1,
      new Date("2025-07-10"),
      90
    ),
    new Ticket(
      2,
      "Théâtre Molière",
      "Pièce classique au Théâtre du Châtelet",
      "pending",
      2,
      new Date("2025-09-22"),
      45
    ),
    new Ticket(
      3,
      "Expo Van Gogh",
      "Billet coupe-file Musée d’Orsay",
      "confirmed",
      1,
      new Date("2025-06-15"),
      30
    ),
  ],
};
