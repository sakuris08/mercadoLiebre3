const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
        const saleProducts = products.filter((products)=>{
            return products.category === 'in-sale'
        });
        const visitedProducts = products.filter((products)=>{
            return products.category === 'visited'
        });
        res.render('index',{
            saleProducts,visitedProducts,toThousand,
            
        });
    },
	search: (req, res) => {
		const buscar = req.query.buscar;

        const resultado = products.filter(producto=>{
            return producto.name.includes(buscar)
		})
		res.render('results',{
            buscar,
			products: resultado
		})
	}
};

module.exports = controller;
