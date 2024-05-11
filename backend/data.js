 const products = [
    {
        "name": "iPhone 9",
        "new_price": 549,
        "old_price": 12.96,
        "description": "An apple mobile which is nothing like apple",
        "category": "men",
        "stock": 94,
        "deleted": false,
        "image": {
            "filename": "iphone-9.jpg",
            "imageUrl": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
        }
    },
    {
        "name": "iPhone X",
        "new_price": 899,
        "old_price": 17.94,
        "description": "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
        "category": "men",
        "stock": 34,
        "deleted": false,
        "image": {
            "filename": "iphone-x.jpg",
            "imageUrl": "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg"
        }
    },
    {
        "name": "Samsung Universe 9",
        "new_price": 1249,
        "old_price": 15.46,
        "description": "Samsung's new variant which goes beyond Galaxy to the Universe",
        "category": "men",
        "stock": 36,
        "deleted": false,
        "image": {
            "filename": "samsung-universe-9.jpg",
            "imageUrl": "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg"
        }
    },
    {
        "name": "OPPOF19",
        "new_price": 280,
        "old_price": 17.91,
        "description": "OPPO F19 is officially announced on April 2021.",
        "category": "men",
        "stock": 123,
        "deleted": false,
        "image": {
            "filename": "oppof19.jpg",
            "imageUrl": "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg"
        }
    },
    {
        "name": "Huawei P30",
        "new_price": 499,
        "old_price": 10.58,
        "description": "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
        "category": "men",
        "stock": 32,
        "deleted": false,
        "image": {
            "filename": "huawei-p30.jpg",
            "imageUrl": "https://cdn.dummyjson.com/product-images/5/thumbnail.jpg"
        }
    },
    {
        "name": "MacBook Pro",
        "new_price": 1749,
        "old_price": 11.02,
        "description": "MacBook Pro 2021 with mini-LED display may launch between September, November",
        "category": "women",
        "stock": 83,
        "deleted": false,
        "image": {
            "filename": "macbook-pro.png",
            "imageUrl": "https://cdn.dummyjson.com/product-images/6/thumbnail.png"
        }
    },
    {
        "name": "Samsung Galaxy Book",
        "new_price": 1499,
        "old_price": 4.15,
        "description": "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
        "category": "women",
        "stock": 50,
        "deleted": false,
        "image": {
            "filename": "samsung-galaxy-book.jpg",
            "imageUrl": "https://cdn.dummyjson.com/product-images/7/thumbnail.jpg"
        }
    },
    {
        "name": "Microsoft Surface Laptop 4",
        "new_price": 1499,
        "old_price": 10.23,
        "description": "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
        "category": "women",
        "stock": 68,
        "deleted": false,
        "image": {
            "filename": "microsoft-surface-laptop-4.jpg",
            "imageUrl": "https://cdn.dummyjson.com/product-images/8/thumbnail.jpg"
        }
    },
    {
        "name": "Infinix INBOOK",
        "new_price": 1099,
        "old_price": 11.83,
        "description": "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
        "category": "women",
        "stock": 96,
        "deleted": false,
        "image": {
            "filename": "infinix-inbook.jpg",
            "imageUrl": "https://cdn.dummyjson.com/product-images/9/thumbnail.jpg"
        }
    },
    {
        "name": "HP Pavilion 15-DK1056WM",
        "new_price": 1099,
        "old_price": 6.18,
        "description": "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
        "category": "women",
        "stock": 89,
        "deleted": false,
        "image": {
            "filename": "hp-pavilion-15-dk1056wm.jpeg",
            "imageUrl": "https://cdn.dummyjson.com/product-images/10/thumbnail.jpeg"
        }
    },
    {
        "name": "perfume Oil",
        "new_price": 13,
        "old_price": 8.4,
        "description": "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
        "category": "kids",
        "stock": 65,
        "deleted": false,
        "image": {
            "filename": "perfume-oil.jpg",
            "imageUrl": "https://cdn.dummyjson.com/product-images/11/thumbnail.jpg"
        }
    },
    {
        "name": "Brown Perfume",
        "new_price": 40,
        "old_price": 15.66,
        "description": "Royal_Mirage Sport Brown Perfume For Men",
        "category": "kids",
        "stock": 45,
        "deleted": false,
        "image": {
            "filename": "brown-perfume.jpg",
            "imageUrl": "https://cdn.dummyjson.com/product-images/12/thumbnail.jpg"
        }
    },
    {
        "name": "Kids' Bike",
        "new_price": 189,
        "old_price": 12.66,
        "description": "16in Kids' Bike - Minnie Mouse",
        "category": "kids",
        "stock": 78,
        "deleted": false,
        "image": {
            "filename": "kids-bike.jpg",
            "imageUrl": "https://cdn.dummyjson.com/product-images/13/thumbnail.jpg"
        }
    },
    {
        "name": "Kid's Skirt",
        "new_price": 21,
        "old_price": 14.36,
        "description": "Children's skirts 1-12 years old girls pleated skirts tutu princess dresses",
        "category": "kids",
        "stock": 90,
        "deleted": false,
        "image": {
            "filename": "kids-skirt.jpg",
            "imageUrl": "https://cdn.dummyjson.com/product-images/14/thumbnail.jpg"
        }
    },
    {
        "name": "Burt's Bees Baby",
        "new_price": 24,
        "old_price": 11.5,
        "description": "Burt's Bees Baby - 5-Pack Short & Long Sleeve Bodysuits - 100% Organic Cotton",
        "category": "kids",
        "stock": 62,
        "deleted": false,
        "image": {
            "filename": "burts-bees-baby.jpg",
            "imageUrl": "https://cdn.dummyjson.com/product-images/15/thumbnail.jpg"
        }
    }
]

const Product = require('./models/Product')
const mongoose = require('mongoose');

main().then(()=>{
    console.log("connected to database")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/project2');
}

const saveData = async ()=>{
    const productfajk = await Product.insertMany( products );
    console.log(productfajk)
}

saveData();

