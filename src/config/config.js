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
      dateTime: "2024-12-24T16:22:00+07:00", // ISO 8601 format
      lastUpdate: "2024-12-25T00:29:01Z", // Current timestamp
      location: {
        name: "Grand Ballroom Hotel",
        address: "Jl. Example Street No. 123",
        city: "Jakarta",
        country: "Indonesia",
        maps_url: "https://goo.gl/maps/your-location",
        venue_image: "/images/venue.jpg",
      },
    },
  };
  
  export default config;