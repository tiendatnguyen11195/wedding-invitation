// src/App.jsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar, Clock, Heart, Copy,
  Gift,
  CreditCard,
  CheckCircle,
  Wallet,
  Star,
  User,
  Building2, Camera, ChevronLeft, ChevronRight,
  Navigation as NavigationIcon, MapPin, CalendarCheck, Phone, ExternalLink, MessageCircle,
  Send,
  Smile,
} from 'lucide-react'
import Layout from './components/Layout'
import EventCards from './components/EventsCard'
import Confetti from 'react-confetti';
import Marquee from "./components/ui/marquee";

function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false)
  const [guestName, setGuestName] = useState('');
  const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = {};

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return timeLeft;
    }

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(timer);
    }, [targetDate]);

    return (
      <div className="grid grid-cols-4 gap-4 mt-8">
        {Object.keys(timeLeft).map((interval) => (
          <motion.div
            key={interval}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-rose-100"
          >
            <span className="text-2xl font-bold text-rose-600">
              {timeLeft[interval]}
            </span>
            <span className="text-xs text-gray-500 capitalize">{interval}</span>
          </motion.div>
        ))}
      </div>
    );
  };
  const FloatingHearts = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: window.innerHeight
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0.5],
              x: Math.random() * window.innerWidth,
              y: -100
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
            className="absolute"
          >
            <Heart
              className={`w-${Math.random() * 3 + 3} h-${Math.random() * 3 + 3} ${i % 3 === 0 ? 'text-rose-400' :
                i % 3 === 1 ? 'text-pink-400' :
                  'text-red-400'
                }`}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>
    );
  };
  const venue = {
    name: "Grand Ballroom, Hotel Majesty",
    address: "Jl. Example Street No. 123, City Name",
    date: "Sunday, December 24, 2024",
    time: "16:16 - 17:30 WIB",
    phone: "+62 123 4567 890",
    maps_url: "https://maps.google.com/?q=YourVenueLocation",
    latitude: -6.2088, // Replace with actual coordinates
    longitude: 106.8456 // Replace with actual coordinates
  };
  const eventDetails = [{
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
  }]
  const [copiedAccount, setCopiedAccount] = useState(null);

  const bankAccounts = [
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
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  // Example gallery items - replace with your actual images
  const galleryItems = [
    {
      id: 1,
      src: '/path/to/image1.jpg',
      alt: 'First Date',
      caption: 'Where it all began',
      span: 'col-span-2'
    },
    {
      id: 2,
      src: '/path/to/image2.jpg',
      alt: 'Proposal Day',
      caption: 'The magical moment',
      span: 'col-span-2'
    },
    {
      id: 3,
      src: '/path/to/image3.jpg',
      alt: 'War Day',
      caption: 'The magical moment',
      span: 'col-span-2'
    },
    {
      id: 4,
      src: '/path/to/image4.jpg',
      alt: 'D Day',
      caption: 'The magical moment',
      span: 'col-span-2'
    },
  ];

  const navigateImage = (direction) => {
    const currentIndex = galleryItems.findIndex(item => item.id === selectedImage?.id);
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % galleryItems.length
      : (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setSelectedImage(galleryItems[newIndex]);
  };

  const copyToClipboard = (text, bank) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(bank);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const [showConfetti, setShowConfetti] = useState(false);
  const [newWish, setNewWish] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Example wishes - replace with your actual data
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: "John Doe",
      message: "Wishing you both a lifetime of love, laughter, and happiness! 🎉",
      timestamp: "2024-12-24T23:20:00Z",
    },
    {
      id: 2,
      name: "Natalie",
      message: "Wishing you both a lifetime of love, laughter, and happiness! 🎉",
      timestamp: "2024-12-24T23:20:00Z",
    },
    // Add more wishes
  ]);

  const handleSubmitWish = async (e) => {
    e.preventDefault();
    if (!newWish.trim()) return;

    setIsSubmitting(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newWishObj = {
      id: wishes.length + 1,
      name: "Guest", // Replace with actual user name
      message: newWish,
      timestamp: new Date().toISOString(),
      likes: 0,
      liked: false
    };

    setWishes(prev => [newWishObj, ...prev]);
    setNewWish('');
    setIsSubmitting(false);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };
  // Landing Page Component (First Layer)
  const LandingPage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full"
        >
          {/* Card Container */}
          <div className="backdrop-blur-sm bg-white/50 p-8 md:p-10 rounded-2xl border border-rose-100/50 shadow-xl">
            {/* Top Decorative Line */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-16 bg-rose-200/50" />
              <div className="w-2 h-2 rounded-full bg-rose-300" />
              <div className="h-px w-16 bg-rose-200/50" />
            </div>

            {/* Date and Time */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-6 text-center mb-8"
            >
              <div className="inline-flex flex-col items-center space-y-1 bg-white/80 px-6 py-3 rounded-xl">
                <Calendar className="w-5 h-5 text-rose-400" />
                <p className="text-gray-700 font-medium">
                  Sunday, December 24, 2024
                </p>
              </div>

              <div className="inline-flex flex-col items-center space-y-1 bg-white/80 px-6 py-3 rounded-xl">
                <Clock className="w-5 h-5 text-rose-400" />
                <p className="text-gray-700 font-medium">
                  15:53 WIB
                </p>
              </div>
            </motion.div>

            {/* Couple Names */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center space-y-6"
            >
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight">
                  Fulan
                  <span className="text-rose-400 mx-3">&</span>
                  Fulana
                </h1>
                <div className="h-px w-24 mx-auto bg-rose-200" />
              </div>

              <p className="text-gray-600 font-serif italic">
                Request the pleasure of your company
                <br />in celebrating their wedding
              </p>
            </motion.div>

            {/* Open Invitation Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsInvitationOpen(true)}
                className="group relative w-full bg-rose-500 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:bg-rose-600 transition-all duration-200"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Open Invitation</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    →
                  </motion.span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  // Main Invitation Content
  const MainContent = () => (
    <>
      <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center relative overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-white">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-rose-100/50 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-pink-100/50 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 relative z-10"
        >
          {/* Special Date Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mx-auto"
          >
            <span className="px-4 py-1 text-sm bg-rose-50 text-rose-600 rounded-full border border-rose-200">
              Save the Date
            </span>
          </motion.div>

          {/* Date Display */}
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 font-light italic"
            >
              We're Getting Married
            </motion.p>
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-5xl font-serif bg-clip-text text-transparent bg-gradient-to-r from-rose-600 to-pink-600"
            >
              Fulan & Fulana
            </motion.h2>
          </div>

          {/* Time and Date Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="relative max-w-md mx-auto"
          >
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 to-white/50 backdrop-blur-md rounded-2xl" />

            <div className="relative px-8 py-10 rounded-2xl border border-rose-100/50">
              {/* Top Decorative Line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px">
                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
              </div>

              {/* Content */}
              <div className="space-y-6 text-center">
                {/* Date and Time */}
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4 text-rose-400" />
                    <span className="text-gray-700 font-medium">
                      Sunday, December 24, 2024
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Clock className="w-4 h-4 text-rose-400" />
                    <span className="text-gray-700 font-medium">
                      16:22 WIB
                    </span>
                  </motion.div>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center gap-3">
                  <div className="h-px w-12 bg-rose-200/50" />
                  <div className="w-2 h-2 rounded-full bg-rose-200" />
                  <div className="h-px w-12 bg-rose-200/50" />
                </div>

                {/* Invitation Text */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="space-y-2"
                >
                  <p className="text-gray-500 font-serif italic">
                    Kepada Yth.
                  </p>
                  <p className="text-gray-600 font-medium">
                    Bapak/Ibu/Saudara/i
                  </p>
                  <p className="text-rose-500 font-semibold text-lg">
                    @mrofisr
                  </p>
                </motion.div>
              </div>

              {/* Bottom Decorative Line */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-px">
                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-rose-200 to-transparent" />
              </div>
            </div>

            {/* Background Blur Circles */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-rose-100/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-rose-100/20 rounded-full blur-xl" />
          </motion.div>

          {/* Countdown Timer */}
          <CountdownTimer targetDate="2025-12-24T16:22:47Z" />

          {/* Decorative Elements */}
          <div className="pt-6 relative">
            <FloatingHearts />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-12 h-12 text-rose-500 mx-auto" fill="currentColor" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Event Section */}
      <section id="event" className="min-h-screen relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-rose-100/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-100/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container mx-auto px-4 py-20"
        >
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-rose-500 font-medium mb-2"
            >
              Save The Date
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight"
            >
              Wedding Events
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 max-w-md mx-auto"
            >
              Join us in celebrating our special day as we begin our journey together
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-4 mt-6"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <div className="text-rose-400">
                <Heart className="w-4 h-4" fill="currentColor" />
              </div>
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>
          </motion.div>

          {/* Events Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <EventCards events={eventDetails} />
          </motion.div>
        </motion.div>

        {/* Decorative Bottom Pattern */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Location section */}
      <section id="location" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white via-rose-50/30 to-white">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-100/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-rose-500 font-medium"
            >
              Wedding Venue
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-serif text-gray-800"
            >
              Location
            </motion.h2>

            {/* Decorative Divider */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <MapPin className="w-5 h-5 text-rose-400" />
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>
          </motion.div>

          {/* Location Content */}
          <div className="max-w-6xl mx-auto grid md:grid-row-2 gap-8 items-center">
            {/* Map Container */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border-8 border-white"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </motion.div>

            {/* Venue Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-serif text-gray-800 mb-6">{venue.name}</h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <MapPin className="w-5 h-5 text-rose-500 mt-1" />
                    <p className="text-gray-600 flex-1">{venue.address}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <CalendarCheck className="w-5 h-5 text-rose-500" />
                    <p className="text-gray-600">{venue.date}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Clock className="w-5 h-5 text-rose-500" />
                    <p className="text-gray-600">{venue.time}</p>
                  </div>

                  <div className="flex items-center space-x-4">
                    <Phone className="w-5 h-5 text-rose-500" />
                    <p className="text-gray-600">{venue.phone}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-4">
                    <motion.a
                      href={venue.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-1.5 bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition-colors text-sm"
                    >
                      <NavigationIcon className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </motion.a>

                    <motion.a
                      href={venue.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-1.5 bg-white text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>View Map</span>
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-rose-50/50 rounded-xl p-4 border border-rose-100">
                <p className="text-rose-600 text-sm">
                  <span className="font-medium">Note:</span> Free parking is available for all guests
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="gifts" className="min-h-screen relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-rose-500 font-medium"
            >
              Wedding Gifts
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-serif text-gray-800"
            >
              Share Your Blessings
            </motion.h2>

            {/* Decorative Divider */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <Gift className="w-5 h-5 text-rose-400" />
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 max-w-md mx-auto"
            >
              Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we have provided digital options for your convenience.
            </motion.p>
          </motion.div>

          {/* Bank Accounts Grid */}
          <div className="max-w-2xl mx-auto grid gap-6">
            {bankAccounts.map((account, index) => (
              <motion.div
                key={account.accountNumber}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-2xl transform transition-transform group-hover:scale-105 duration-300" />
                <div className="relative backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-white p-2 shadow-sm">
                        <Building2 className="w-full h-full text-rose-500" /> {/* Changed from Bank to Building2 */}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{account.bank}</h3>
                        <p className="text-sm text-gray-500">{account.accountName}</p>
                      </div>
                    </div>
                    <Wallet className="w-5 h-5 text-rose-400" />
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between bg-gray-50/80 px-4 py-3 rounded-lg">
                      <p className="font-mono text-gray-700">{account.accountNumber}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyToClipboard(account.accountNumber, account.bank)}
                        className="flex items-center space-x-1 text-rose-500 hover:text-rose-600"
                      >
                        {copiedAccount === account.bank ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        <span className="text-sm">
                          {copiedAccount === account.bank ? 'Copied!' : 'Copy'}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Digital Wallet QR */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-block backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
              <h3 className="font-medium text-gray-800 mb-4">Scan QR Code</h3>
              <div className="w-48 h-48 bg-gray-100 rounded-lg mx-auto mb-4">
                {/* Add your QR code image here */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <CreditCard className="w-12 h-12" />
                </div>
              </div>
              <p className="text-sm text-gray-500">Scan to send gift via digital wallet</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="gallery" className="min-h-screen relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-rose-500 font-medium"
            >
              Our Moments
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-serif text-gray-800"
            >
              Gallery of Love
            </motion.h2>

            {/* Decorative Divider */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <Camera className="w-5 h-5 text-rose-400" />
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>
          </motion.div>

          {/* Gallery Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative group ${item.span}`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer"
                    onClick={() => setSelectedImage(item)}
                  >
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Heart className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                onClick={() => setSelectedImage(null)}
              >
                <div className="container mx-auto px-4 relative">
                  <motion.img
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-w-full max-h-[80vh] mx-auto rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-0 left-0 right-0 p-4 text-center text-white"
                  >
                    <p className="text-lg font-medium">{selectedImage.caption}</p>
                  </motion.div>

                  {/* Navigation Buttons */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage('prev');
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 p-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage('next');
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 p-2 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section id="wishes" className="min-h-screen relative overflow-hidden">
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block text-rose-500 font-medium"
            >
              Send Your Love
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-serif text-gray-800"
            >
              Wedding Wishes
            </motion.h2>

            {/* Decorative Divider */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-4 pt-4"
            >
              <div className="h-[1px] w-12 bg-rose-200" />
              <MessageCircle className="w-5 h-5 text-rose-400" />
              <div className="h-[1px] w-12 bg-rose-200" />
            </motion.div>
          </motion.div>

          {/* Wishes List */}
          <div className="max-w-2xl mx-auto space-y-6">
            <AnimatePresence>
              <Marquee speed={20}
                gradient={false}
                className="[--duration:20s] py-2">
                {wishes.map((wish, index) => (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative mx-2 w-[280px]" // Added fixed width and margin
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300" />
                    <div className="relative backdrop-blur-sm bg-white/80 p-4 rounded-xl border border-rose-100/50 shadow-md"> {/* Reduced padding and border radius */}
                      <div className="flex items-start space-x-3 mb-2"> {/* Reduced margin */}
                        {/* Avatar and Name */}
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white text-sm"> {/* Smaller avatar */}
                            {wish.name[0]}
                          </div>
                        </div>

                        {/* Name and Time */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 text-sm truncate"> {/* Smaller text */}
                            {wish.name}
                          </h4>
                          <div className="flex items-center space-x-1 text-gray-500 text-xs"> {/* Smaller time text */}
                            <Clock className="w-3 h-3" />
                            <time className="truncate">
                              {new Date(wish.timestamp).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </time>
                          </div>
                        </div>

                        {/* Sparkle Icon */}
                        {wish.liked && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-rose-500 flex-shrink-0"
                          >
                            <Sparkles className="w-3 h-3" /> {/* Smaller icon */}
                          </motion.div>
                        )}
                      </div>

                      {/* Message */}
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2"> {/* Limited to 2 lines */}
                        {wish.message}
                      </p>

                      {/* Like Button */}
                      <div className="flex items-center justify-end"> {/* Moved to right */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleLike(wish.id)}
                          className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-colors duration-200
                  ${wish.liked
                              ? 'text-rose-500 bg-rose-50'
                              : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                          <Star className="w-3 h-3" /> {/* Smaller icon */}
                          <span>{wish.likes}</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Marquee>
            </AnimatePresence>
          </div>
          {/* Wishes Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl mx-auto mt-12"
          >
            <form onSubmit={handleSubmitWish} className="relative">
              <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                {/* Name Input */}
                <div className='space-y-2'>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                    <User className="w-4 h-4" />
                    <span>Your Name</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400"
                    required
                  />
                </div>
                {/* Wish Textarea */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>Your Wish</span>
                  </div>
                  <textarea
                    placeholder="Send your wishes to the happy couple..."
                    className="w-full h-32 p-4 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 resize-none transition-all duration-200"
                    required
                  />
                </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Smile className="w-5 h-5" />
                    <span className="text-sm">Share your blessings</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-200
                    ${isSubmitting
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-rose-500 hover:bg-rose-600'}`}
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Wish'}</span>
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  )

  return (
    <AnimatePresence mode='wait'>
      {!isInvitationOpen ? (
        <LandingPage />
      ) : (
        <Layout>
          <MainContent />
        </Layout>
      )}
    </AnimatePresence>
  )
}

export default App