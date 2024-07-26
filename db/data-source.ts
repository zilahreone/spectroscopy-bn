import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'test.sqlite',
  // entities: ['dist/**/*.entity.ts'],
  // migrations: ['dist/db/migrations/*.js']
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  // synchronize: false
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;