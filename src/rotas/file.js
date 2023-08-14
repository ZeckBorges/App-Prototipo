const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})


const upload = multer({ storage });

const init = (expressInstance, basePath) => {
    expressInstance.post(`${basePath}api/files`, upload.single('file'), (req, res) => {
        const uploadedFile = req.file;
        const data = [];

        fs.createReadStream(uploadedFile.path)
            .pipe(csv({ separator: ',' })) // Especifica o separador como vírgula
            .on('data', row => {
                data.push(row);
            })
            .on('end', () => {
                console.log(data); // Exibe os dados lidos do arquivo CSV
                fs.writeFileSync('uploads/users.json', JSON.stringify(data, null, 2));
                res.status(200).json({ message: 'File uploaded successfully'});
            });

        
    })
}

module.exports = {
    init
};