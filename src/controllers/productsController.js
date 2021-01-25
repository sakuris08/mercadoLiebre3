const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		res.render('products', {
			products, toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find(product => {
			return product.id == req.params.productId
		});
		res.render('detail', {
			product, toThousand
		});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res) => {
		let lastID = 1;
		products.forEach(product => {
			if (product.id > lastID) {
				lastID = product.id
			}
		});

		const { name, price, discount, category, description } = req.body

		let product = {
			id: lastID + 1,
			name,
			price,
			discount,
			category,
			description,
			image :"default-image.png"
		}
		products.push(product);
		fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8');

		res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		const product = products.find(product => product.id === +req.params.productId)

		res.render('product-edit-form', {
			product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		const { name, price, discount, category, description } = req.body

		products.forEach(product => {
			if (product.id === +req.params.productId) {
				product.id = +req.params.productId;
				product.name = name;
				product.price = price;
				product.discount = discount;
				product.category = category;
				product.description = description
				product.image = "default-image.png";
			}
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8');

		res.redirect('/products');
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		products.forEach(product=>{
			if (product.id === +req.params.productId) {
				let eliminar = products.indexOf(product);
				products.splice(eliminar, 1)
			}
		})
		fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8');

		res.redirect('/products');
	}


};


module.exports = controller;