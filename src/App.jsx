// src/App.jsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Heart, Navigation as NavigationIcon, MapPin, CalendarCheck, Phone, ExternalLink } from 'lucide-react'
import Layout from './components/Layout'
import EventCards from './components/EventsCard'

function App() {
  const [isInvitationOpen, setIsInvitationOpen] = useState(false)

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

  // Landing Page Component (First Layer)
  const LandingPage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-[#F9F5F6] text-center px-4"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="space-y-6"
      >
        {/* Date and Time */}
        <div className="flex flex-col items-center space-y-2 text-gray-600">
          <Calendar className="w-5 h-5" />
          <p className="text-sm font-medium">December 24, 2024</p>
          <Clock className="w-5 h-5" />
          <p className="text-sm font-medium">15:53 WIB</p>
        </div>

        {/* Couple Names */}
        <div className="space-y-4">
          <h1 className="text-4xl font-serif text-gray-800">
            Fulan & Fulana
          </h1>
          <p className="text-sm text-gray-600">
            Request the pleasure of your company in celebrating their wedding
          </p>
        </div>

        {/* Open Invitation Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => setIsInvitationOpen(true)}
          className="px-8 py-3 bg-[#B0926A] text-white rounded-full font-medium shadow-lg hover:bg-[#8B7355] transition-colors"
        >
          Open Invitation
        </motion.button>
      </motion.div>
    </motion.div>
  )

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

      <div id="gifts" className="min-h-screen">
        {/* Gifts section */}
      </div>

      <div id="gallery" className="min-h-screen">
        {/* Gallery section */}
      </div>

      <div id="wishes" className="min-h-screen">
        {/* Wishes section */}
      </div>
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