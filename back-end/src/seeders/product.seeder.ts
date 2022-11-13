import { AppDataSource } from "../databaseConnection/app-data-source";
import { Product } from "../entity/product.entity";
import * as faker from "@faker-js/faker";
import { randomInt } from "crypto";

AppDataSource.initialize().then(async () => {
  const productRepository = AppDataSource.getRepository(Product);

  for (let i = 0; i < 30; i++) {
    await productRepository.save({
      title: faker.faker.lorem.words(2),
      description: faker.faker.lorem.words(50),
      image: faker.faker.image.imageUrl(200, 200, "", true),
      price: randomInt(10, 100),
    });
  }

  process.exit(0);
});