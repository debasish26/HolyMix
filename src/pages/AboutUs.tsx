export default function AboutUs() {
    return (
      <div className="bg-darkblue text-white min-h-screen px-4 py-24 md:px-16">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-500">About HolyMix</h1>
          <p className="text-gray-300 mt-2">Your Ultimate Anime Streaming Destination</p>
        </header>

        <section className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">Who We Are</h2>
          <p className="text-gray-300 mb-6">
            Welcome to <strong>HolyMix</strong>, your go-to platform for streaming high-quality anime online. We bring
            you a vast collection of anime series and movies, from timeless classics to the latest seasonal releases.
            Our goal is to provide anime fans with a seamless and enjoyable viewing experience with minimal ads.
          </p>

          <h2 className="text-2xl font-semibold text-red-500 mb-4">Why Choose HolyMix?</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>Massive Anime Library:</strong> We offer an extensive collection of anime across all genres.</li>
            <li><strong>HD Streaming:</strong> Enjoy high-quality streams with smooth playback.</li>
            <li><strong>User-Friendly Interface:</strong> Our clean and modern design ensures easy navigation.</li>
            <li><strong>Watchlist Feature:</strong> Save your favorite anime and track your progress.</li>
            <li><strong>Community-Driven:</strong> Join discussions in our Q&A section and connect with fellow fans.</li>
            <li><strong>Regular Updates:</strong> We continuously update our database with new releases and trending anime.</li>
            <li><strong>Ad-Free Experience:</strong> Enjoy watching anime with minimal interruptions and an ad-free option.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-red-500 mt-8 mb-4">HolyMix Q&A - Get Your Questions Answered</h2>
          <p className="text-gray-300 mb-6">
            Have questions about anime, streaming, or the HolyMix platform? Check out our
            <a href="/faq" className="text-red-500 underline"> FAQ page</a> where we answer the most commonly asked
            questions. Can't find what you're looking for? Feel free to reach out or participate in community discussions!
          </p>

          <h2 className="text-2xl font-semibold text-red-500 mb-4">How HolyMix Works</h2>
          <p className="text-gray-300 mb-6">
            HolyMix aggregates links from various trusted sources, ensuring users can find and stream their favorite anime easily.
            Unlike other platforms, we do not host content but provide a seamless viewing experience through a network of sources.
            This approach ensures faster loading speeds, better quality, and access to a vast selection of anime without geographical restrictions.
          </p>

          <h2 className="text-2xl font-semibold text-red-500 mb-4">Join Our Community</h2>
          <p className="text-gray-300 mb-6">
            Become a part of the ever-growing HolyMix community! Engage in discussions, share your favorite anime moments,
            and make new friends in our
            <a href="https://discord.gg/Vucu4TKMsE" target="_blank" className="text-red-500 underline"> official Discord server</a>.
          </p>

          <h2 className="text-2xl font-semibold text-red-500 mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-6">
            Follow us on social media and subscribe to our newsletter for the latest anime news, recommendations, and platform updates.
            We ensure that you stay informed about upcoming anime seasons, special events, and platform improvements.
          </p>
        </section>

        <footer className="text-center mt-12 text-gray-400">
          <p>&copy; 2025 HolyMix. All rights reserved.</p>
        </footer>
      </div>
    );
  }
