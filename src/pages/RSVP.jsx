export default function RSVP() {
    return (
        <section id="rsvp" className="min-h-screen bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 py-20">
                {/* Section Header */}
                <div className="text-center space-y-4 mb-12">
                    <span className="inline-block text-rose-500 font-medium">Kindly Respond</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight">
                        RSVP
                    </h2>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Let us know if you’ll be joining our special day — and tell us your dietary needs.
                    </p>
                </div>

                {/* Tally Embed */}
                <div className="max-w-2xl mx-auto">
                    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                        <iframe
                            src="https://tally.so/embed/npZv5b"
                            title="RSVP Form"
                            className="w-full h-[1300px]"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
