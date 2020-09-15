import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Payments extends BaseSchema {
  protected tableName = 'payments';

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('charge_id').unique().notNullable();
      table.string('token_id').notNullable();
      table.string('product').notNullable();
      table.integer('price').notNullable();
      table.timestamps(true);
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName);
  }
}
