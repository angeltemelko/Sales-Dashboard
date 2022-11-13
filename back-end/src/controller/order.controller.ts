import { Request, Response } from "express";
import { Parser } from "json2csv";
import { AppDataSource } from "../databaseConnection/app-data-source";
import { Order } from "../entity/order.entity";

export const GetOrdersAsync = async (request: Request, response: Response) => {
  const take: number = parseInt((request.params.take as string) || "10");
  const page: number = parseInt((request.params.page as string) || "1");

  const orderRepository = AppDataSource.getRepository(Order);

  const [data, total] = await orderRepository.findAndCount({
    take: take,
    skip: (page - 1) * take,
    relations: ["order_items"],
  });

  response.send({
    data: data.map((order: Order) => ({
      id: order.id,
      name: order.name,
      email: order.email,
      total: order.total,
      created_at: order.created_at,
      order_item: order.order_item,
    })),
    meta: {
      total,
      take,
      lastPage: Math.ceil(total / take),
    },
  });
};

export const ExportCSV = async (request: Request, response: Response) => {

    const parser = new Parser({
        fields: ['ID', 'Email', 'Product Title', 'Price', 'Quantity']
    })

    const orderRepository = AppDataSource.getRepository(Order);

    const json: Object[] = [];

    const orders = await orderRepository.find();

    orders.forEach((order) => {
        json.push({
            ID: order.id,
            Name: order.name,
            Email: order.email,
            'Product Title': '',
            Price: '',
            Quantity: '',
        })

        order.order_item.forEach((item) => {
            json.push({
                ID: '',
                Name: '',
                Email: '',
                'Product Title': item.product_title,
                Price: item.price,
                Quantity: item.quantity,
            })
        })
    });

    const csv = parser.parse(json);

    response.header('Content-Type','text/csv');
    response.attachment('orders.csv');
    response.send(csv);
}

export const GetGraphDataAsync = async (request: Request, response: Response) => {
    const result = await AppDataSource.query(
        `SELECT DATE_FORMAT(order.created_at, '%Y,%M,%D') as date, SUM(order_item.product * order_item.quantity) 
              FROM order
              LEFT JOIN order_item 
                  ON order.id = order_item.order_id
              GROUP BY date`
    );
    response.send(result);
}