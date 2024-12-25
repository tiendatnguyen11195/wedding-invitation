import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti';
import Marquee from "@/components/ui/marquee";
import {
    Clock,
    Star,
    User,
    MessageCircle,
    Send,
    Smile,
  } from 'lucide-react'
import { useState } from 'react';

export default function Wishes() {
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
    return (<>
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
    </>)
}