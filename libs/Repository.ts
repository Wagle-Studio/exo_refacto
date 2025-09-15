import { Pool } from "pg";
import { Database } from "./Database";

export abstract class Repository<T> {
  protected pool: Pool;
  protected abstract tableName: "book" | "author";
  protected abstract fromRow(row: unknown): T;

  constructor() {
    this.pool = Database.getPool();
  }

  findAll = async (): Promise<T[] | null> => {
    const query = {
      name: `fetch-all-${this.tableName}`,
      text: `select * from ${this.tableName}`,
    };

    try {
      const result = await this.pool.query(query);
      const data = result.rows.map(this.fromRow);

      return data;
    } catch (error) {
      console.error(error);

      return null;
    }
  };
}
