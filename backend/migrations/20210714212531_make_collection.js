
exports.up = function(knex) {
    return knex.schema.createTable('collection', table => {
        table.increments('id'); // adds an auto incrementing PK column
        table.string('title').notNullable();
        table.string('format');
        table.integer('volume');
        table.string('interest');
        table.string('image');
        table.timestamps(true, true); // adds created_at and updated_at
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('collection');
};
