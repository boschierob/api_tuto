
const express = require('express');
const bodyParser = require('body-parser');
const cors = require ('cors');

const app = express();


app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }));

//connect db
const db = require('./app/models');
db.mongoose
	.connect(db.url , {
		useNewUrlParser: true,
    useUnifiedTopology: true
	})
	.then( () => {
		console.log('base de donnée connectée')
	})
	.catch( err => {
		console.log('impossible de se connecter a la base de donnee', err);
		process.exit();
	});



//simple route for test
app.get('/', (req,res) => {
	res.json({message: " Bienvenue dans mon application. Dites merci à BoscB"});
});

//include routes
const routes = require('./app/routes/tutorials.routes')(app);

// set port,listen for requests
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`le serveur fonctionne avec succes sur le port ${PORT}.`);
});
