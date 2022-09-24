import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST || 'db',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
        username: process.env.DB_USER || 'api-client',
        password: process.env.DB_PASS || 'pa!ssword',
        database: process.env.DB_NAME || 'todo-bolttech',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: process.env.NODE_ENV !== 'production',
      });

      return dataSource.initialize();
    },
  },
];