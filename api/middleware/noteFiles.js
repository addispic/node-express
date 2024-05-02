const multer = require('multer')
const fs = require('fs')

// generate folder
const generateFileFolder = (req, file) => {
    let path = `./public/uploads/${req.user?.username}/${file.mimetype.split('/')[0]}`
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true })
    }
    return path
}

// storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, generateFileFolder(req, file))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

// note files
const noteFiles = multer({ storage })

// exports
module.exports = {
    noteFiles,
}
