const express = require('express');
const pool = require('./db')

const app = express();

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
  let recipe = {name: 'Fill the details above', ingredients: 'Null', directions: 'Null'};
  res.render('addrecipe', { recipe });
});

app.get('/allrecipes', (req, res) => {
  pool.query('SELECT * FROM recipes ORDER BY name;', (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    res.render('allrecipes', {
      recipes: result.rows
    });
  });
});

app.get('/search', (req, res) => {
const item = req.query.search || 'keyword';
const x = item.toLowerCase()
    pool.query(`SELECT * FROM recipes WHERE lower(name) LIKE '%${x}%' OR lower(ingredients) LIKE '%${x}%' OR lower(directions) LIKE '%${x}%' ORDER BY name;`, (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    res.render('search', {
      recipes: result.rows,
      keyword: item
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

app.post('/update', (req, res) => {
  console.log([req.body.name, req.body.ingredients, req.body.directions, req.body.id]);
  pool.query('UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE id=$4 RETURNING *; ',
      [req.body.name, req.body.ingredients, req.body.directions, req.body.id])
    .then((result) => {
      console.log(result.rows)
      res.render('search', {
        recipes: result.rows,
        keyword: 'updated recipe'
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