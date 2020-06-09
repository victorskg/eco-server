import knex from "../database/connection";
import { Request, Response } from "express";

class ItemController {
  async index(request: Request, response: Response) {
    const baseUrl = request.query.app
      ? "http://192.168.0.121:3333/uploads"
      : "http://localhost:3333/uploads/";
    const items = await knex("item").select("*");
    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        imageUrl: `${baseUrl}/${item.image}`,
      };
    });
    return response.json(serializedItems);
  }
}

export default ItemController;
