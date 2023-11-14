/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    { id: 1, taskDetails: 'Cook dinner', priority: 'Low', completed: false },
    {
      id: 2,
      taskDetails: 'Finish personal project',
      priority: 'High',
      completed: false,
    },
    { id: 3, taskDetails: 'Clean house', priority: 'Medium', completed: false },
  ])
}
