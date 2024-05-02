const { Router } = require('express')

// controllers
// notes
const {
    getAllNotes,
    addNewNote,
    updateNote,
    deleteNote,
} = require('../controllers/notesControllers')

// middlewares
// route protector
const {
    routeProtector,
} = require('../middleware/routeProtector')
// note files
const {
    noteFiles,
} = require('../middleware/noteFiles')

// router
const router = Router()

// all note
router.get('/notes', getAllNotes)

// add new note
router.post('/new', routeProtector, noteFiles.array('files', 12), addNewNote)

// update note
router.put('/update/:_id', routeProtector, noteFiles.single('file'), updateNote)

// delete note
router.delete('/delete/:_id', routeProtector, deleteNote)

// exports
module.exports = router