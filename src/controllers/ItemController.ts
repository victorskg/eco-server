import knex from "../database/connection";
import { Request, Response } from "express";

class ItemController {
  async index(request: Request, response: Response) {
    const items = await knex("item").select("*");
    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        imageUrl: `http://localhost:3333/uploads/${item.image}`,
      };
    });
    return response.json(serializedItems);
  }
}

export default ItemController;
