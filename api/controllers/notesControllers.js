const fs = require('fs')

// models
// notes
const Note = require('../models/notesModel')

// get all notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }).select({ author: 1, note: 1, files: 1, createdAt: 1, _id: 1 })
        res.status(200).json({ notes })
    } catch (err) {
        res.status(400).json({
            error: 'get all note error'
        })
    }
}

// add new note
const addNewNote = async (req, res) => {
    try {
        const { note } = req.body
        let files = []
        if (req.files) {
            req.files?.forEach(({ path }) => {
                files.push(path)
            })
        }
        const author = req.user?._id
        const newNote = await Note.create({ author, note, files })
        res.status(200).json({
            newNote: {
                author: newNote.author,
                _id: newNote._id,
                note: newNote.note,
                files: newNote.files
            }
        })
    } catch (err) {
        res.status(400).json({
            error: 'add new note error'
        })
    }
}

// update note
const updateNote = (req, res) => {
    res.status(200).json({
        message: 'UPDATE NOTE'
    })
}

// delete note
const deleteNote = async (req, res) => {
    try {
        const { _id } = req.params
        const note = await Note.findById(_id)
        if (!note) {
            res.status(400).json({
                error: 'note not exist'
            })
            return
        }
        if (note.author.toString() !== req.user?._id.toString()) {
            res.status(401).json({
                error: 'unauthorized to delete'
            })
            return
        }
        if (note.files?.length) {
            note.files.forEach(path => {
                fs.unlinkSync(path)
            })
        }
        await note.deleteOne()
        res.status(200).json({
            message: 'note deleted successfully',
            _id,
        })
    } catch (err) {
        res.status(400).json({
            error: 'delete note error'
        })
    }
}

// exports
module.exports = {
    getAllNotes,
    addNewNote,
    updateNote,
    deleteNote,
}