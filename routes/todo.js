const { Router } = require('express');
const Todo = require('../models/todo');
const router = Router();

// Bekommen der Liste Todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error!',
    });
  }
});

// Erstellen eines neuen Todos
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      done: false,
    });
    res.status(201).json({ todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error!',
    });
  }
});

// Bearbeiten eines Todos
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(+req.params.id);
    todo.done = req.body.done;
    await todo.save();
    res.status(200).json({ todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error!',
    });
  }
});

// Löschen eines Todos
router.delete('/:id', async (req, res) => {
  try {
    const todos = await Todo.findAll({
      where: {
        id: +req.params.id,
      },
    });
    const todo = todos[0];
    await todo.destroy();
    // status(204) = content wurde erfolgreich gelöscht
    res.status(204).json({});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Server error!',
    });
  }
});
module.exports = router;
