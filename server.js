const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000; // Heroku port configuration
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to LOG');
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
})

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

// app.get('/', (req, res) => { // request - response
//     // res.send('<h1>Hello Express!</h1>');
//     res.send({
//         name: 'Android',
//         likes: [
//             'Biking',
//             'Cities'
//         ]
//     });
// });

app.get('/', (req, res) => { // request - response
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my page.'
    });
});

app.get('/about', (req, res) => {
    // res.send('About page')
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
})

app.get('/req', (req, res) => {
    res.send(req.hostname);
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});