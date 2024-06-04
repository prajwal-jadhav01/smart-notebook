const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');


// Route 1: to fetch all the notes of an user : GET req, log in required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {

        //fetch all the notes by comparing the id of the user who wants to fetch the notes and the user who created it
        let notes = await Notes.find({ user: req.user.id });
        res.send(notes);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error!');
    }
})


// Route 2: to add a new note : POST req, log in required
router.post("/addnote", fetchuser, [
    //Validate title and description 
    body('title', 'Please enter a valid title!').isLength({ min: 3 }),
    body('description', 'Please enter a valid description').isLength({ min: 5 }),

], async (req, res) => {
    try {

        const { title, description, tag } = req.body;
        //if there are any errors, return the errors with status code
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // create new note
        const note = new Notes({
            title, description, tag, user: req.user.id
        })

        //save the note to database
        const savenote = await note.save();
        res.send(savenote);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error!');
    }
})


// Route 3: to update the existing note : PUT req, log in required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    //get the data from req body
    const { title, description, tag } = req.body;

    try {



        //create a new empty note
        const newNote = {}

        //check which field user has sent to update through req and add those fields in new note
        if (title) {
            newNote.title = title
        }
        if (description) {
            newNote.description = description
        }
        if (tag) {
            newNote.tag = tag
        }

        //check whether the note exist by id
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        //check if the user who wants to update the note is the user who created it
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        //                                    find by id | and | update the note | or create new
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.send(note);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error!');
    }

})


// Route 4: to delete a note : DELETE req, log in required
router.delete("/deletenode/:id", fetchuser, async (req, res) => {

    try {


        //check whether the note exist by id
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        //check if the user who wants to delete the note is the user who created it
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        //find and delete the note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Successfully deleted this note", note: note });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error!');
    }

})

module.exports = router
