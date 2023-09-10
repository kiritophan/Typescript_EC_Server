import express from "express";
const Router = express.Router();

import categoryController from "../../controllers/category.controller";
Router.get('/', categoryController.findMany)
Router.get("/:category_id", categoryController.findByCategory);
import productController from "../../controllers/product.controller";
// Router.get('/', categoryController.findAllCategories);

import multer from 'multer'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now() * Math.random()}.${file.mimetype.split('/')[1]}`)
    }
})

const upload = multer({ storage: storage })

Router.post('/', upload.array('imgs'), categoryController.create);
Router.get('/menu/:categoryId', productController.findByCategory);

export default Router;