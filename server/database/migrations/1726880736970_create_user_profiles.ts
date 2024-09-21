import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('role').nullable()
      table.string('location').nullable()
      table.string('avatar').nullable()
      table.string('first_name').nullable()
      table.string('last_name').nullable()
      table.string('phone').nullable()
      table.string('country').nullable()
      table.string('city_state').nullable()
      table.string('postal_code').nullable()
      table.string('tax_id').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
