const router = require('express').Router()
const Notes = require('../models/Notes');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// Router 1
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        // console.log(req.user);
        userId = req.user;
        const notes = await Notes.find({ user: req.user })
        res.json(notes);
    }
    catch (err) {
        res.json({ err: "Internal server error" });
    }

})

// Router 2
router.post('/addnote',
    fetchuser,
    [
        body('title', "Enter a valid title").isLength({ min: 3 }),
        body('description', "Enter a valid descritpion").isLength({ min: 5 }),
    ],
    async (req, res) => {
        // to return the error if any
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { title, description, tag } = req.body;
            // console.log(req.user);
            const note = new Notes({
                title, description, tag, user: req.user
            })
            try {
                const savenote = await note.save()
                // console.log(note);
                res.json(savenote);
            }
            catch (err) {
                console.log(err);
            }
        }
        catch (err) {
            res.json({ err: "Internal server error" });
        }
    })

// route 3 update note
router.put('/updatenote/:id',
    fetchuser,
    async (req, res) => {
        const { title, description, tag } = req.body;
        try{
            const newNote = {};
            if (title) {
                newNote.title = title;
            }
            if (title) {
                newNote.description = description;
            }
            if (title) {
                newNote.tag = tag;
            }
            //    find the note and update that note
            let note = await Notes.findById(req.params.id);
            if (!note) { return res.status(404).send("Not found") };
            if (note.user.toString() !== req.user) {
                return res.status(401).send("Not Allowed");
            }
    
            note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
            res.json(note);
        }
        catch(err){
            res.json({ err: "Internal server error" });
        }


    })


// route 4 delete note
router.delete('/deletenote/:id',
    fetchuser,
    async (req, res) => {
        //    find the note and delete 
        try{
            let note = await Notes.findById(req.params.id);
            if (!note) { return res.status(404).send("Not found") };
            // allow deletion only if user owns this Note
            if (note.user.toString() !== req.user) {
                return res.status(401).send("Not Allowed");
            }
    
            note = await Notes.findByIdAndDelete(req.params.id);
            res.json({ "Sucess": "Note has been deleted" });
        }
        catch(err){
            res.json({ err: "Internal server error" });
        }


    })


module.exports = router