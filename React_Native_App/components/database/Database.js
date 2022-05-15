export const COLOURS = {
  white: '#ffffff',
  black: '#000000',
  green: '#00AC76',
  red: '#C04345',
  blue: '#0043F9',
  amber: '#FFBF00',
  backgroundLight: '#F0F0F3',
  backgroundMedium: '#B9B9B9',
  backgroundDark: '#777777',
};

export const Items = [
  {
    id: 1,
    category: 'product',
    productName: 'MI Super Bass Bluetooth Wireless Headphones',
    productPrice: 1799,
    description:
      'Up to 20 hours battery life | Super powerful Bass | 40mm dynamic driver | Pressure less ear muffs | Bluetooth 5.0 | Voice control',
    isOff: true,
    offPercentage: 10,
    productImage: require('../database/images/products/Mi1.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/products/Mi1.png'),
      require('../database/images/products/Mi2.png'),
      require('../database/images/products/Mi3.png'),
    ],
  },
  {
    id: 2,
    category: 'product',
    productName: 'boAt Rockerz 450 Bluetooth Headphone',
    productPrice: 1499,
    description:
      'boAt Rockerz 450 M is an on-ear wireless headset that has been ergonomically designed to meet the needs of music lovers.',
    isOff: false,
    productImage: require('../database/images/products/boat1.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/products/boat1.png'),
      require('../database/images/products/boat2.png'),
      require('../database/images/products/boat3.png'),
    ],
  },
  {
    id: 3,
    category: 'accessory',
    productName: 'boAt Airdopes 441',
    productPrice: 1999,
    description:
      'Bluetooth: It has Bluetooth v5.0 with a range of 10m and is compatible with Android & iOS',
    isOff: true,
    offPercentage: 18,
    productImage: require('../database/images/accessories/boatairpods1.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/accessories/boatairpods1.png'),
      require('../database/images/accessories/boatairpods2.png'),
      require('../database/images/accessories/boatairpods3.png'),
    ],
  },
  {
    id: 4,
    category: 'accessory',
    productName: 'boAt Bassheads 242',
    productPrice: 399,
    description:
      'Fly into your workouts with precise tones that inspire and energize your system with its HD sound, all the time.',
    isOff: false,
    productImage: require('../database/images/accessories/boatbassheads1.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/accessories/boatbassheads1.png'),
      require('../database/images/accessories/boatbassheads2.png'),
      require('../database/images/accessories/boatbassheads3.png'),
    ],
  },
  {
    id: 5,
    category: 'accessory',
    productName: 'boAt Rockerz 255 Pro+',
    productPrice: 1499,
    description:
      'The unbeatable boAt signature sound shines through no matter what are you playing courtesy its 10mm drivers.',
    isOff: false,
    productImage: require('../database/images/accessories/boatrockerz1.png'),
    isAvailable: false,
    productImageList: [
      require('../database/images/accessories/boatrockerz1.png'),
      require('../database/images/accessories/boatrockerz2.png'),
      require('../database/images/accessories/boatrockerz3.png'),
    ],
  },
  {
    id: 6,
    category: 'accessory',
    productName: 'Boult Audio AirBass Propods TWS',
    productPrice: 1299,
    description:
      'One Touch Control & Voice Assistant: With one multifunction button, you can play/pause, previous/next track and answer/hang-up calls.Voice assistant function lets you access siri/Google Assistant',
    isOff: false,
    productImage: require('../database/images/accessories/boultairbass1.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/accessories/boultairbass1.png'),
      require('../database/images/accessories/boultairbass2.png'),
      require('../database/images/accessories/boultairbass3.png'),
    ],
  },
  // {
  //   id: 7,
  //   category: 'Vegetable',
  //   productName: 'Brinjal',
  //   productPrice: 100,
  //   offPercentage: 10,
  //   description:
  //     'Most commonly purple, the spongy, absorbent fruit is used in several cuisines. Typically used as a vegetable in cooking,.',
  //   isOff: true,
  //   productImage: require('../database/images/Vegetable/ilbrinjal.png'),
  //   isAvailable: true,
  //   productImageList: [
  //     require('../database/images/Vegetable/ilbrinjal.png')
  //   ],
  // },
  {
    id: 8,
    category: 'Vegetable',
    productName: 'Brokoli',
    productPrice: 100,
    offPercentage: 10,
    description:
      'Boiling substantially reduces the levels of broccoli glucosinolates, while other cooking methods, such as steaming, microwaving, and stir frying, have no significant effect on glucosinolate levels.',
    isOff: true,
    productImage: require('../database/images/Vegetable/il_brokoli.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/Vegetable/il_brokoli.png')
    ],
  },
  {
    id: 9,
    category: 'Vegetable',
    productName: 'Cauliflower',
    productPrice: 100,
    offPercentage: 10,
    description:
      'When cauliflower is mature, heads appear as clear white, compact, and 15–20 cm (6–8 in) in diameter, and should be cooled shortly after harvest.Forced air cooling to remove heat from the field during hot weather may be needed for optimal preservation. Short-term storage is possible using cool, high-humidity storage conditions.',
    isOff: true,
    productImage: require('../database/images/Vegetable/il_cauliflawer.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/Vegetable/il_cauliflawer.png')
    ],
  },
  {
    id: 10,
    category: 'Vegetable',
    productName: 'Potato',
    productPrice: 100,
    offPercentage: 10,
    description:
      'The potato is a starchy tuber of the plant Solanum tuberosum and is a root vegetable native to the Americas. The plant is a perennial in the nightshade family Solanaceae. Potato cultivars appear in a variety of colors, shapes, and sizes.',
    isOff: true,
    productImage: require('../database/images/Vegetable/potato.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/Vegetable/potato.png')
    ],
  },
  {
    id: 11,
    category: 'Vegetable',
    productName: 'Tomato',
    productPrice: 100,
    offPercentage: 10,
    description:
      'Tomatoes are usually red, scarlet, or yellow, though green and purple varieties do exist, and they vary in shape from almost spherical to oval and elongate to pear-shaped. Each fruit contains at least two cells of small seeds surrounded by jellylike pulp.',
    isOff: true,
    productImage: require('../database/images/Vegetable/il_tomato.png'),
    isAvailable: true,
    productImageList: [
      require('../database/images/Vegetable/il_tomato.png')
    ],
  },
  {
    id: 12,
    category: 'Laptop',
    productName: 'ASUS ROG Zephyrus S Ultra Slim Gaming Laptop',
    productPrice: 198000,
    offPercentage: 10,
    description:
      'ASUS ROG Zephyrus S Ultra Slim Gaming Laptop, 15.6" 144Hz IPS-Type Full HD, GeForce RTX 2080, Intel Core i7-8750H CPU, 16GB DDR4, 512GB PCIe Nvme SSD, Aura Sync RGB, Windows 10 Pro - GX531GX-XS74',
    isOff: false,
    productImage: require('../database/images/Laptop/ASUS_ROG_1.jpeg'),
    isAvailable: true,
    productImageList: [
      require('../database/images/Laptop/ASUS_ROG_1.jpeg'),
      require('../database/images/Laptop/ASUS_ROG_2.jpeg'),
      require('../database/images/Laptop/ASUS_ROG_3.jpeg'),
    ],
  },
  {
    id: 13,
    category: 'Laptop',
    productName: 'Apple MacBook Pro',
    productPrice: 127000,
    offPercentage: 10,
    description:
      '2020 Apple MacBook Pro (13.3-inch/33.78 cm, Apple M1 chip with 8‑core CPU and 8‑core GPU, 8GB RAM, 512GB SSD) - Silver',
    isOff: false,
    productImage: require('../database/images/Laptop/Apple_MacBook_1.jpeg'),
    isAvailable: false,
    productImageList: [
      require('../database/images/Laptop/Apple_MacBook_1.jpeg'),
      require('../database/images/Laptop/Apple_MacBook_1.jpeg'),
    ],
  },
  {
    id: 14,
    category: 'Laptop',
    productName: 'Lenovo Legion 7 ',
    productPrice: 99999,
    offPercentage: 10,
    description:
      'Lenovo Legion 7 AMD Ryzen 9 5900HX 16 inches QHD IPS 500Nits Gaming Laptop (32GB/1TB SSD/Windows 10/MS Office/NVIDIA RTX 3080 16GB/165Hz Refresh Rate/RGB Backlit Keyboard/Storm Grey/2.5Kg), 82N6008CIN',
    isOff: false,
    productImage: require('../database/images/Laptop/Lenovo_Legion_1.jpeg'),
    isAvailable: true,
    productImageList: [
      require('../database/images/Laptop/Lenovo_Legion_1.jpeg'),
      require('../database/images/Laptop/Lenovo_Legion_2.jpeg'),
      require('../database/images/Laptop/Lenovo_Legion_3.jpeg'),
    ],
  },
  {
    id: 15,
    category: 'Laptop',
    productName: 'ALIENWARE Core i9 10th Gen ',
    productPrice: 345400,
    offPercentage: 10,
    description:
      'ALIENWARE Core i9 10th Gen - (32 GB/1 TB SSD/Windows 10 Home/8 GB Graphics/NVIDIA GeForce RTX 2080 with Max-Q) m15R3 Gaming Laptop  (15.6 inch, Lunar Light, 2.5 kg, With MS Office)',
    isOff: false,
    productImage: require('../database/images/Laptop/ALIENWARE_1.jpeg'),
    isAvailable: true,
    productImageList: [
      require('../database/images/Laptop/ALIENWARE_1.jpeg'),
      require('../database/images/Laptop/ALIENWARE_2.jpeg'),
      require('../database/images/Laptop/ALIENWARE_3.jpeg'),
      require('../database/images/Laptop/ALIENWARE_4.jpeg'),
    ],
  }
];
