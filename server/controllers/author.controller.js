const { Author } = require('../models/author.model');

// module.exports.index = (request, response) => {
//     response.json({
//         message: "Hello World"
//     });
// }

module.exports = {

    createAuthor: (req, res) => {
        Author.create(req.body)
            .then((newAuthor) => {
                console.log(newAuthor);
                res.json(newAuthor);
            })
            .catch((err) => {
                console.log("Failed to create new author");
                res.status(400).json(err);
            });
    },

    getAllAuthors: (req, res) => {
        Author.find()
            .then((allAuthors) => {
                console.log(allAuthors);
                res.json(allAuthors);
            })
            .catch((err) => {
                console.log("Failed to get all authors");
                res.status(400).json(err);
            });
    },

    getOneAuthor: (req, res) => {
        Author.findOne({ _id: req.params.id })
            .then((oneAuthor) => {
                console.log("one author: ", oneAuthor);
                res.json(oneAuthor);
            })
            .catch((err) => {
                console.log("Find One failed");
                res.status(400).json(err);
            });
    },

    updateAuthor: (req, res) => {
        Author.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })
            .then((author) => {
                console.log(author);
                res.json(author);
            })
            .catch((err) => {
                console.log("Unable to updated author.");
                res.status(400).json(err);
            });
    },

    deleteAuthor: (req, res) => {
        Author.deleteOne({ _id: req.params.id })
            .then((author) => {
                console.log("deleted ", author);
                res.json(author);
            })
            .catch((err) => {
                console.log("Delete failed");
                res.status(400).json(err);
            });
    },
};