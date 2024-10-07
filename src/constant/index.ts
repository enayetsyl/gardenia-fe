import image3 from '../../public/garden-3.jpg'
import image4 from '../../public/garden-4.jpg'
import image5 from '../../public/garden-5.jpg'
import image6 from '../../public/garden-6.jpg'
import image7 from '../../public/garden-7.jpg'
import image8 from '../../public/garden-8.jpg'
import image9 from '../../public/garden-9.jpg'
import image10 from '../../public/garden-10.jpg'
import gardener1 from '../../public/user-profile-image-1.webp'
import gardener2 from '../../public/user-profile-image-2.jpg'
import gardener3 from '../../public/user-profile-image-3.jpg'
import { Gardener, GardeningQuote, GardeningTip, NavItem } from '@/type'


export const gardeningTips: GardeningTip[] = [
  {
    imageLink: image3,
    frontheading: "Best Time to Water Your Plants",
    backDetails: "Water your plants early in the morning when temperatures are cooler. This helps prevent evaporation and ensures your plants stay hydrated throughout the day.",
  },
  {
    imageLink: image4,
    frontheading: "Proper Soil Preparation",
    backDetails: "Before planting, loosen the soil to at least 12 inches deep and mix in compost to promote root growth and water retention.",
  },
  {
    imageLink: image5,
    frontheading: "Companion Planting",
    backDetails: "Pairing certain plants together, like tomatoes with basil, can enhance growth, deter pests, and improve overall yield.",
  },
  {
    imageLink: image6,
    frontheading: "Using Mulch Effectively",
    backDetails: "Add a 2-3 inch layer of mulch around plants to retain moisture, reduce weeds, and regulate soil temperature.",
  },
  {
    imageLink: image7,
    frontheading: "Pruning for Better Growth",
    backDetails: "Regularly prune dead or damaged branches to encourage healthy growth and prevent the spread of diseases in plants.",
  },
  {
    imageLink: image8,
    frontheading: "Pest Control with Natural Remedies",
    backDetails: "Use natural pest control methods like neem oil or insecticidal soap to keep pests at bay without harming your plants.",
  },
  {
    imageLink: image9,
    frontheading: "Seasonal Planting Guide",
    backDetails: "Choose plants that are suitable for the current season and climate in your area to ensure a successful and bountiful garden.",
  },
  {
    imageLink: image10,
    frontheading: "Fertilizing Tips for Lush Growth",
    backDetails: "Apply organic fertilizers like compost or manure during the growing season to provide essential nutrients for your plants.",
  },
];



export const gardeningQuotes: GardeningQuote[] = [
  { quote: "To plant a garden is to believe in tomorrow.", by: "Audrey Hepburn" },
  { quote: "The glory of gardening: hands in the dirt, head in the sun, heart with nature.", by: "Alfred Austin" },
  { quote: "Gardening adds years to your life and life to your years.", by: "Unknown" },
  { quote: "A garden is a friend you can visit any time.", by: "Unknown" },
  { quote: "The garden suggests there might be a place where we can meet nature halfway.", by: "Michael Pollan" },
  { quote: "Gardening is the art that uses flowers and plants as paint, and the soil and sky as canvas.", by: "Elizabeth Murray" },
  { quote: "My garden is my most beautiful masterpiece.", by: "Claude Monet" },
  { quote: "The love of gardening is a seed once sown that never dies.", by: "Gertrude Jekyll" },
  { quote: "Gardening is how I relax. It’s another form of creating and playing with colors.", by: "Oscar de la Renta" }
];



export const gardeners: Gardener[] = [
  {
    id: 1,
    name: 'Jane Doe',
    bio: 'An expert in indoor gardening with a love for rare plants.',
    profileImage: gardener1,
    isVerified: true,
  },
  {
    id: 2,
    name: 'John Smith',
    bio: 'Organic farming enthusiast and community gardener.',
    profileImage: gardener2,
    isVerified: true,
  },
  {
    id: 3,
    name: 'Emily Johnson',
    bio: 'Landscape designer sharing creative garden ideas.',
    profileImage: gardener3,
    isVerified: true,
  },
  {
    id: 4,
    name: 'Michael Chen',
    bio: 'Sustainable gardening advocate and urban farming specialist.',
    profileImage: gardener1,
    isVerified: false,
  },
];

export const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'News Feed', path: '/news-feed' },
  { name: 'Gallery', path: '/image-gallery' },
  { name: 'About Us', path: '/about-us' },
  { name: 'Contact', path: '/contact-us' },
];