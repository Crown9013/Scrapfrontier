var mongoose = require('mongoose');
var path = require('path')
var fs = require('fs')
var { unlinkSync } = require('fs');
multer = require('multer');


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
//             cb(null, 'public/image')
//         } else if (file.mimetype === 'video/mp4' || file.mimetype === 'video/mov') {
//             cb(null, 'public/video')
//         } else if(file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
//             cb(null, 'public/csv')
//         }
//     },
//     filename: (req, file, cb) => {
//         let ext = path.extname(file.originalname);
//         if(file.originalname == 'blob') ext = '.png';
//         cb(null, 'file-' + Date.now() + ext)
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const type = file.mimetype;    
//     const acceptedType = ['image/jpeg', 'image/png', 'video/mp4', 'video/mov', 'text/csv', 'application/vnd.ms-excel'];
//     if (acceptedType.includes(type)) {cb(null, true); }
//     else cb(null, false);
// };

// exports.upload = multer({storage: storage, fileFilter: fileFilter});

// Handle error ...

exports.handleError = (res, e) => {
    console.log(e);
    if (e.code === 11000) {
        res.status(409).send(e)
    } else {
        res.status(500).send(e);
    }
}

exports.uploadFile = (req, res, next) =>  {
    try {     
        let data = req.file;
        let url = 'http://localhost:3200';
        if(config.env == 'product') url = 'https//www.caposgt.com/api';
        data.imageUrl = url + '/public/image/' + data.filename;   
        res.status(httpStatus.CREATED).send(req.file);
    } catch(e) {
        next(handleError(res, e));
    }
}

exports.uploadFiles = (req, res, next) =>  {
    try {                
        res.status(httpStatus.CREATED).send(req.files);
    } catch(e) {
        next(handleError(res, e));
    }
}

exports.deleteFile = async (req, res, next) => {
    try {        
        const {path} = req.body;
        removeFile(path);
        res.status(httpStatus.OK).send({path:path});
    } catch(e) {
        next(handleError(res, e));
    }
}

// Read file content like image, video

exports.readFile = (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '../public/image/' + req.params.file))
    } catch (e) {
        next(handleError(res, e));
    }
}


exports.checkExistFile = (publicPath) => {    
    const absPath = path.join(__dirname, '../' + publicPath);        
    return fs.existsSync(absPath);
}

exports.removeFile = (filePath) => {
    try {
        filePath = path.join(__dirname, '../uploads/' + filePath);
        console.log('filepath', filePath)
        if (fs.existsSync(filePath)) {
            unlinkSync(filePath);
        }
        return true;
    } catch (e) {
        console.error(e)
        return false;
    }
}