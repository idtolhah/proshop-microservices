import mongoose from 'mongoose'

const products = [
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 90,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 600,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 930,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 400,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 50,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 30,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 90,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 600,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 930,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 400,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 50,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 30,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 90,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 600,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 930,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 400,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 50,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 30,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 90,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 600,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 930,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 400,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 50,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 30,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 90,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 600,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'active'
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 930,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 400,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 50,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 30,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 90,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 600,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 930,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 400,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 50,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 30,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 90,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 600,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 930,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 400,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 50,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 30,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 90,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 600,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 930,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 400,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 50,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 30,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 90,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 600,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 930,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 400,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 50,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 30,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 90,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 600,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 930,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 400,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 50,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 30,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 90,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 600,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 930,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 400,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 50,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 30,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 90,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 600,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'sold'
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 930,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 400,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 50,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 30,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 90,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 600,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 930,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 400,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 50,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 30,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 90,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 600,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 930,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 400,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 50,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 30,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 90,
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 600,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 930,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 400,
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 50,
    countInStock: 7,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: mongoose.Types.ObjectId('5f9075db7c2ac74c5d1cd444'),
    price: 30,
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    status: 'archived'
  },
]

export default products
