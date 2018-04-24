module.exports = (app) => { 
    
//set route for accesing data
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/undone', (req, res) => {
    res.render('undone');
});

app.get('/done', (req, res) => {
    res.render('done');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/new', (req, res) => {
    res.render('addTask');
});

app.get('/setting', (req, res) => {
    res.render('setting');
});
}
