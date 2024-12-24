// src/App.jsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, Gift, Heart } from 'lucide-react'
import Layout from './components/Layout'

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
              className={`w-${Math.random() * 3 + 3} h-${Math.random() * 3 + 3} ${
                i % 3 === 0 ? 'text-rose-400' :
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
            Romeo & Juliet
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
              Romeo & Juliet
            </motion.h2>
          </div>

          {/* Time and Date Info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center space-y-4 backdrop-blur-sm bg-white/50 p-6 rounded-2xl border border-rose-100/50"
          >
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-rose-500" />
              <span className="text-gray-700">December 24, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-rose-500" />
              <span className="text-gray-700">16:22 WIB</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">@mrofisr</p>
          </motion.div>

          {/* Countdown Timer */}
          <CountdownTimer targetDate="2024-12-24T16:22:47Z" />

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
      <section id="event" className="min-h-screen px-4 py-20 bg-gray-50/50">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-serif text-gray-800">Wedding Events</h2>
            <p className="text-gray-500">Join us in our special day</p>
          </div>

          {/* Akad Nikah Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Akad Nikah</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Sunday, December 24, 2024</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary" />
                <span>16:16 - 17:30 WIB</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Grand Ballroom, Hotel Majesty</span>
              </div>
            </div>
          </div>

          {/* Wedding Reception Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Wedding Reception</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Sunday, December 24, 2024</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary" />
                <span>18:00 - 22:00 WIB</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Grand Ballroom, Hotel Majesty</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Other sections remain unchanged for now */}
      <div id="location" className="min-h-screen">
        {/* Location section */}
      </div>

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