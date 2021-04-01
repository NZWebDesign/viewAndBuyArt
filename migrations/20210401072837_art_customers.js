
exports.up = (knex) => {
  return knex.schema.createTable('customers', (table) => {
    table.increments('id')
    table.string('name')
    table.string('email')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("customers")
};
