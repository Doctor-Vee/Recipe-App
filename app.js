const express = require('express');
const {
  Pool
} = require('pg');

const app = express();
const connectionString = 'postgres://postgres:admin@127.0.0.1:5432/recipes';

const pool = new Pool({
  connectionString,
});

// app.engine('dust', cons.dust);

app.set('view engine', 'ejs');
// app.set('views', __dirname + '/views');

app.use('/UI', express.static('UI'));

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.get('/', (req, res) => {
  res.render('welcome');
});

app.get('/addrecipe', (req, res) => {
  let recipe = {name: 'Null', ingredients: 'Null', directions: 'Null'};
  res.render('addrecipe', { recipe });
});

app.get('/recipes', (req, res) => {
  pool.query('SELECT * FROM recipes ORDER BY name;', (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    res.render('recipes', {
      recipes: result.rows
    });
  });
});

app.post('/addrecipe', (req, res) => {
  pool.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3) RETURNING *; ',
      [req.body.name, req.body.ingredients, req.body.directions])
    .then((result) => {
      console.log(result.rows)
      res.render('addrecipe', {
        recipe: result.rows[0]
      });
    });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM recipes WHERE id = ${id};`;
  pool.query(query, (err) => {
    if (err) {
      return err;
    }
    return res.status(200).send({
      status: 200,
      data: 'deleted successfully',
    });
  });
});

app.listen(3000, function () {
  console.log('Server started on port 3000');
});