const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();


const redis = require('../redis')



router.get('/statistics', async (_, res) => {

  const added_todos = await redis.getAsync('added_todos')
  res.send({
    "added_todos": added_todos
  });
});

async function incrementTodos() {
  
  var old_value = await redis.getAsync('added_todos')
  if (old_value == null)
  old_value = 0
  await redis.setAsync('added_todos', parseInt(old_value )+ 1)
}


/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  await incrementTodos()
  console.log(req.body)
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});


singleRouter.put('/', async (req, res) => {

  const todo = req.todo
  console.log(req.body)
  todo.text = req.body.text
  todo.done = req.body.done
  todo.save()
  res.sendStatus(200);
});



router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
