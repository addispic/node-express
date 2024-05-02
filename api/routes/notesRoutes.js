const { Router } = require('express')

// middlewares
const {
    routeProtector,
} = require('../middleware/routeProtector')

// router
const router = Router()

// all note
router.get('/notes', (req, res) => {
    res.status(200).json({
        message: 'get all notes'
    })
})

// add new note
router.post('/new', routeProtector, (req, res) => {
    res.status(200).json({
        messagae: 'add new note'
    })
})

// update note
router.put('/update/:_id', routeProtector, (req, res) => {
    res.status(200).json({
        message: 'update note'
    })
})

// delete note
router.delete('/delete/:_id', routeProtector, (req, res) => {
    res.status(200).json({
        message: 'delete note'
    })
})

// exports
module.exports = router