
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('customers').del()
    .then(() => {
      // Inserts seed entries
      return knex('customers').insert([
        {id: 1, name: 'P.Picasso', email: 'artist@gmail.com'},
        {id: 2, name: 'C.Monet', email: 'paintingforyou@gmail.com'},
        {id: 3, name: 'B.Hammond', email:'coolbirdpaintings@gmail.com'}
      ]);
    });
};
