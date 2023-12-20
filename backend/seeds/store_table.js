/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
  await knex('store_table').del()
  await knex('store_table').insert([
    { id: 1, name: 'Ruby Necklace', desc: 'Description: You will face many defeats in life, but never let yourself be defeated.', price: '$1200', count: '23' },
    { id: 2, name: 'Emerald Necklace', desc: 'Description: You will face many defeats in life, but never let yourself be defeated.', price: '$1800' , count: '5'},
    { id: 3, name: 'Pearl Necklace', desc: 'Description: Go confidently in the direction of your dreams! ' , price: '$1100', count: '4'},
    { id: 4, name: 'Ruby Earrings', desc: 'Description: You will face many defeats in life, but never let yourself be defeated.' , price: '$1050', count: '7'},
    { id: 5, name: 'Emerald Earrings', desc: 'Description: Go confidently in the direction of your dreams! ' , price: '$1230', count: '10'},
    { id: 6, name: 'Pearl Earrings', desc: 'Description: Never, ever underestimate the importance of having fun.', price: '$12770' , count: '12'}
  ]);
};
