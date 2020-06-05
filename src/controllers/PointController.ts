import knex from "../database/connection";
import { Request, Response } from "express";

class PointController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(",")
      .map((i) => Number(i.trim()));

    const points =
      city && uf && items
        ? await knex("point")
            .join("point_item", "point.id", "=", "point_item.point_id")
            .whereIn("point_item.item_id", parsedItems)
            .where("city", String(city))
            .where("uf", String(uf))
            .select("point.*")
            .distinct()
        : await knex("point").select("*");

    return response.json(points);
  }

  async create(request: Request, response: Response) {
    const items = request.body.items;
    const pointWithoutItems = request.body;
    delete pointWithoutItems.items;

    const trx = await knex.transaction();

    const ids = await trx("point").insert({
      ...pointWithoutItems,
      image:
        "https://images.unsplash.com/photo-1561385945-c99789cd12d1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    });

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id: ids[0],
      };
    });

    await trx("point_item").insert(pointItems);

    await trx.commit();

    return response.sendStatus(201);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex("point").where("id", id).first();

    if (!point) {
      return response.status(400).json({
        message: `Ponto de id '${id}' não encontrado.`,
      });
    }

    const items = await knex("item")
      .join("point_item", "item.id", "=", "point_item.item_id")
      .where("point_item.point_id", point.id)
      .select("item.title", "item.id");

    return response.json({
      ...point,
      items,
    });
  }
}

export default PointController;
