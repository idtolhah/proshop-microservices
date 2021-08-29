import mongoose from 'mongoose'

const categories = [
    { _id: mongoose.Types.ObjectId("5f9075db7c2ac74c5d1cd111"), title: 'Pakaian', image: "https://rnshop.sgp1.digitaloceanspaces.com/icons/shirt.png" },
    { _id: mongoose.Types.ObjectId("5f9075db7c2ac74c5d1cd222"), title: 'Sepatu', image: "https://rnshop.sgp1.digitaloceanspaces.com/icons/shoes.png" },
    { _id: mongoose.Types.ObjectId("5f9075db7c2ac74c5d1cd333"), title: 'Otomotif', image: "https://rnshop.sgp1.digitaloceanspaces.com/icons/car.png" },
    { _id: mongoose.Types.ObjectId("5f9075db7c2ac74c5d1cd444"), title: 'Elektronik', image: "https://rnshop.sgp1.digitaloceanspaces.com/icons/phone.png" },
    { _id: mongoose.Types.ObjectId("5f9075db7c2ac74c5d1cd555"), title: 'Produk Digital', image: "https://rnshop.sgp1.digitaloceanspaces.com/icons/digital.png" },
    { _id: mongoose.Types.ObjectId("5f9075db7c2ac74c5d1cd666"), title: 'Makanan & Minuman', image: "https://rnshop.sgp1.digitaloceanspaces.com/icons/meal.png" },
    { _id: mongoose.Types.ObjectId("5f9075db7c2ac74c5d1cd777"), title: 'Rumah Tangga', image: "https://rnshop.sgp1.digitaloceanspaces.com/icons/appliances.png" },
    { _id: mongoose.Types.ObjectId("5f9075db7c2ac74c5d1cd888"), title: 'Perkakas', image: "https://rnshop.sgp1.digitaloceanspaces.com/icons/tools.png" },
    { _id: mongoose.Types.ObjectId("5f9075db7c2ac74c5d1cd999"), title: 'Obat & Jamu', image: "https://rnshop.sgp1.digitaloceanspaces.com/icons/drugs.png" },
    { _id: mongoose.Types.ObjectId("5f9075db7c2ac74c5d1cd000"), title: 'Olahraga & Outdoor', image: "https://rnshop.sgp1.digitaloceanspaces.com/icons/sport.png" },
]

export default categories