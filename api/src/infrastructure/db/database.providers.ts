import { DataSource } from 'typeorm';
import { DatabaseConfig } from './database.config';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(DatabaseConfig);

      return dataSource.initialize();
    },
  },
];