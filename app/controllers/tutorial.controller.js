
const db = require('../models');
const Tutorial = db.tutorials;

//Create and Save new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Tutorial in the database
  tutorial
    .save(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};
//Retrieve all Tutorials
exports.findAll = (req,res) => {
	const title = req.query.title;
	var condition = title ? { title: {$regex: new RegExp(title), $options:"i"}} : {};

	Tutorial.find(condition)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message : 
				err.message ||  "une erreur s'est produite durant le processus de capture du Tutoriel"
			});
		});

};

//Find a single Tutorial with its id
exports.findOne = (req,res) => {
	const id = req.params.id;
	Tutorial.findById(id)
		.then(data => {
			if(!data)
				res.status(404).send({ message : `tutoriel avec l'id ${id} introuvable`})
			else res.send(data);
		})
		.catch( err =>{
			err
				.status(500)
				.send({ message: `une erreur s'est produite lors du chargement dtutoriel avec l'id ${id}`});
			
		});
};

//Update a Tutorial with the specified id in the request
exports.update = (req,res) => {
	if(! req.body) {
		return res.status(400).send({
			message: "Ne peut etre vide"
		});
	}

	const id = req.params.id;

	Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
		.then(data => {
			if(!data) {
				res.status(404).send({
					message: `Impossible de mettre a jour le Tutoriel avec l'id ${id}.`
				});
			} else 
				res.send({
					message :`Tutoriel mis a jour avec succes`
				});
			})
		.catch(err => {
			res.status(500).send({
				message: `une erreur s'est produite lors de la mise a jour du tutoriel dont l'id est ${id}`
			});
		});
};
		

//Delete a Tutorial with a specified idin the request
exports.delete = (req,res) => {
	const id = req.params.id;

	Tutorial.findByIdAndRemove(id)
		.then(data => {
			if (!data) {
				res.status(404).send({
					message:`Tutoriel avec l'id ${id} introuvable.`
				});
			} else {
				res.send({
					message: `Tutoriel avec l'id ${id} supprime avec succes`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Suppression impossible"
			});
		});
};

//Delete all Tutorials from teh database
exports.deleteAll = (req,res) => {
	Tutorial.deleteMany({})
		.then(data =>{
		res.send({
			message: `${data.deletedCount} tutoriels ont ete supprimes`
		});
	})
		.catch(err => {
			res.statut(500).send({
				message:
					err.message || `erreur lors de l'operation de suppression`
			});

		});
};


//Find all published tutorials
exports.findAllPublished = (req,res) => {
	Tutorial.find({ published : true })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "une erreur s'est produite lors du chargement du tutoriel"
			});
		});

};














