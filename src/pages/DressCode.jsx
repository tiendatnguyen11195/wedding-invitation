import { motion } from 'framer-motion'
import { Palette, Circle } from 'lucide-react'

const dressCodeColors = [
  { name: 'Terracotta', hex: '#E2725B' },
  { name: 'Rust', hex: '#B7410E' },
  { name: 'Warm Taupe', hex: '#D2B1A3' },
  { name: 'Olive Green	', hex: '#708238' },
  { name: 'Cream', hex: '#FFF8F0' },
]

export default function DressCode() {
  return (
    <section id="dress-code" className="min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block text-rose-500 font-medium"
          >
            Wedding Attire
          </motion.span>

          {/* Decorative Divider */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <div className="h-[1px] w-12 bg-rose-200" />
            <Palette className="w-5 h-5 text-rose-400" />
            <div className="h-[1px] w-12 bg-rose-200" />
          </motion.div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
        >
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 max-w-md mx-auto"
            >
                We kindly encourage our guests to wear the following colors to our party.
            </motion.p>
        </motion.div>

        {/* Dress Code Content */}
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6 items-start">
          {dressCodeColors.map((color, i) => (
            <motion.div
              key={color.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-gray-100 shadow-md rounded-2xl p-6 text-center"
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-4 border"
                style={{ backgroundColor: color.hex }}
              />
              <h3 className="text-lg font-medium text-gray-700">{color.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
