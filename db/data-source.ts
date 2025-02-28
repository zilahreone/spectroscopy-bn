import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'data/spectroscopy.sqlite',
  entities: ['dist/**/*.entity.js'],
  // migrations: ['dist/db/test/*.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;