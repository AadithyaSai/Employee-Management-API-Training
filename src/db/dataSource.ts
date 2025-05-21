import "reflect-metadata";
import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import Employee from "../entities/employee.entity";
import Address from "../entities/address.entity";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: "postgres",
  port: 5432,
  database: "training",
  extra: {
    max: 5,
    min: 2,
  },
  synchronize: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy(),
  entities: ["dist/entities/*.js"],
  migrations: ["dist/db/migrations/*.js"],
});

export default dataSource;
