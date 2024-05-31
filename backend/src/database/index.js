import Knex from 'knex';

export const getDatabase = () => {
  const database = Knex({
    client: 'pg',
    connection: process.env.DB_URL,
  });
  return database;
}