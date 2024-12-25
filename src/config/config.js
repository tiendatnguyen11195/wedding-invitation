// src/config.js

const config = {
  // Meta Information
  meta: {
    title: "Fulan & Fulana Wedding",
    description: "We are getting married and would love for you to be a part of our celebration.",
    ogImage: "/images/og-image.jpg", // OpenGraph image for social media
    favicon: "/images/favicon.ico",
  },

  // Couple Information
  couple: {
    groomName: "Fulan",
    brideName: "Fulana",
    groomFullName: "Fulan Bin Fulan",
    brideFullName: "Fulana Binti Fulan",
    groomImage: "/images/groom.jpg",
    brideImage: "/images/bride.jpg",
    hashtag: "#FulanFulanaWedding2024",
  },

  // Event Details
  event: {
    date: "2024-12-24",
    time: "16:22",
    timezone: "WIB",
    dateTime: "2025-12-24T16:22:47Z", // ISO 8601 format
    venue: {
      name: "Grand Ballroom, Hotel Majesty",
      address: "Jl. Example Street No. 123, City Name",
      date: "Sunday, December 24, 2024",
      time: "16:16 - 17:30 WIB",
      phone: "+62 123 4567 890",
      maps_url: "https://maps.google.com/?q=YourVenueLocation",
      maps_embed: "https://www.google.com/maps/embed?pb=YOUR_EMBED_URL",
      latitude: -6.2088, // Replace with actual coordinates
      longitude: 106.8456 // Replace with actual coordinates
    },
  },

  eventDetails: [{
    title: "Akad Nikah - Romeo & Juliet Wedding",
    date: "2024-12-24",
    startTime: "16:16",
    endTime: "17:30",
    timeZone: "Asia/Jakarta",
    location: "Grand Ballroom, Hotel Majesty",
    description: "We invite you to join us in celebrating our wedding ceremony."
  }, {
    title: "Resepsi Nikah - Romeo & Juliet Wedding",
    date: "2024-12-24",
    startTime: "16:16",
    endTime: "17:30",
    timeZone: "Asia/Jakarta",
    location: "Grand Ballroom, Hotel Majesty",
    description: "We invite you to join us in celebrating our wedding ceremony."
  }],

  audio: {
    src: "/audio/backsound.mp3",
    title: "Fulfilling Humming",
    artist: "Nasheed",
    autoplay: true,
    loop: true,
    toastDuration: 5000,
    pauseOnInactive: true, // Add this option
    resumeOnReturn: true,  // Add this option
  },

  bankAccounts: [
    {
      bank: 'Bank Central Asia',
      accountNumber: '1234567890',
      accountName: 'FULAN',
      logo: '/path/to/bca-logo.png' // Add your bank logos
    },
    {
      bank: 'Bank Mandiri',
      accountNumber: '0987654321',
      accountName: 'FULANA',
      logo: '/path/to/mandiri-logo.png'
    }
  ]
};

export default config;