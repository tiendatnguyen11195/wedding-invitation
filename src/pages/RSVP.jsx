import { useState } from 'react'
import { motion } from 'framer-motion'

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    dietary: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you'd handle sending the form data (e.g., to a Google Sheet, API, etc.)
    console.log('RSVP Submitted:', formData)
    setSubmitted(true)
  }

  return (
    <section id="rsvp" className="min-h-screen bg-white py-20 px-4">
      <div className="container max-w-xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h2 className="text-4xl font-serif text-gray-800">RSVP</h2>
          <p className="text-gray-600">Let us know if you’ll be joining us, and share your dietary preferences.</p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 font-medium mt-8"
          >
            Thank you! We’ve received your RSVP 💌
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-6 rounded-2xl shadow-lg space-y-6 text-left"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-rose-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Will you attend?
              </label>
              <select
                name="attending"
                required
                value={formData.attending}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-rose-400 focus:outline-none"
              >
                <option value="">Select one</option>
                <option value="yes">Yes, I will attend</option>
                <option value="no">No, I cannot make it</option>
              </select>
            </div>

            <div>
              <label htmlFor="dietary" className="block text-sm font-medium text-gray-700 mb-1">
                Dietary Preferences
              </label>
              <input
                type="text"
                name="dietary"
                value={formData.dietary}
                onChange={handleChange}
                placeholder="E.g., vegetarian, gluten-free..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-rose-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md bg-rose-500 text-white font-medium hover:bg-rose-600 transition"
            >
              Submit RSVP
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
