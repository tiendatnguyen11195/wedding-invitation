import { useState } from 'react'
import { motion } from 'framer-motion'

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: '',
    attending: '',
    dietary: '',
    passcode: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Replace with your actual passcode
  const VALID_PASSCODE = '21062025'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyzxWdWp-it-NbOAMcoPYBtqHJstZNVWjrs_UuHz05vMYCqRbzU4RHLDorlbVS0RDh0Sw/exec";

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.passcode !== VALID_PASSCODE) {
      setError('Invalid passcode');
      return;
    }
  
    try {
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          invite_code: formData.passcode,
          attending: formData.attending,
          dietary: formData.dietary,
          passcode: formData.passcode,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const result = await response.json();
      if (result.result === "success") {
        setSubmitted(true);
      } else {
        setError("Submission failed");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Something went wrong");
    }
  };
  
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
          <p className="text-gray-600">
            Let us know if you’ll be joining us — and don’t forget your passcode 💌
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 font-medium mt-8"
          >
            Thank you! We’ve received your RSVP 🎉
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-6 rounded-2xl shadow-lg space-y-6 text-left"
            method="POST"
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

            <div>
              <label htmlFor="passcode" className="block text-sm font-medium text-gray-700 mb-1">
                Invitation Passcode
              </label>
              <input
                type="text"
                name="passcode"
                required
                value={formData.passcode}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-rose-400 focus:outline-none"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
