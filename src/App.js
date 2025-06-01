import React, { useState, useEffect } from 'react';
import './App.css';
import logoImage from './logo.jpg';

const GivenFlowersHero = () => {
  const [donationAmount, setDonationAmount] = useState('25');
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [flowerCount, setFlowerCount] = useState(50000);
  const [hoveredButton, setHoveredButton] = useState(null);
  
  // Animate flower counter
  useEffect(() => {
    const interval = setInterval(() => {
      setFlowerCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDonation = (amount) => {
    console.log(`Processing donation of $${amount}`);
    // In production, replace with actual payment processor
    alert(`Thank you for your $${amount} donation! 🌻 In production, this would process through Stripe.`);
  };

  // Floating flowers animation
  const FloatingFlower = ({ delay, emoji }) => (
    <div 
      className="absolute animate-float opacity-20"
      style={{
        animationDelay: `${delay}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}
    >
      <span className="text-4xl">{emoji}</span>
    </div>
  );

  return (
    <>
      {/* Hero Section with Love */}
      <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-rose-50 relative overflow-hidden">
        {/* Floating flowers in background */}
        {[...Array(8)].map((_, i) => (
          <FloatingFlower 
            key={i} 
            delay={i * 2} 
            emoji={['🌻', '🌹', '🌸', '🌺', '🌷', '💐', '🌼', '🏵️'][i]}
          />
        ))}

        {/* Animated background circles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        {/* Navigation Bar with Love */}
        <nav className="relative z-20 p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3 group cursor-pointer">
              {/* Logo image */}
              <img 
                src={logoImage} 
                alt="Given Flowers Logo" 
                className="rounded-full transform group-hover:rotate-12 transition-transform object-cover shadow-lg"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              <div>
                <span className="text-2xl font-bold" style={{color: '#D2691E', fontFamily: 'cursive'}}>
                  Given Flowers
                </span>
                <p className="text-xs text-orange-600 opacity-75">Spreading joy, one flower at a time</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-6 items-center">
              <a href="#about" className="text-gray-700 hover:text-orange-600 transition flex items-center space-x-1">
                <span>About</span>
                <span className="text-sm">🌸</span>
              </a>
              <a href="#impact" className="text-gray-700 hover:text-orange-600 transition flex items-center space-x-1">
                <span>Our Impact</span>
                <span className="text-sm">💐</span>
              </a>
              <a href="#contact" className="text-gray-700 hover:text-orange-600 transition flex items-center space-x-1">
                <span>Contact</span>
                <span className="text-sm">🌹</span>
              </a>
              <a 
                href="#love" 
                className="px-4 py-2 bg-gradient-to-r from-rose-400 to-pink-400 text-white rounded-full text-sm font-semibold hover:shadow-lg transition-all transform hover:scale-105"
              >
                Spread Love 💕
              </a>
            </div>
          </div>
        </nav>

        {/* Hero Content with Extra Heart */}
        <div className="relative z-10 flex items-center justify-center py-0 px-6">
          <div className="text-center max-w-5xl mx-auto">
            {/* Urgency banner with animation */}
            <div className="inline-block bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 animate-bounce shadow-lg">
              <span className="animate-pulse">✨</span> Spring 2024 Cohort - Only 5 Spots Left! <span className="animate-pulse">✨</span>
            </div>

            {/* Main headline with love */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
              <span className="block text-gray-800">Let's Make a Difference</span>
              <span className="block bg-gradient-to-r from-orange-600 via-rose-500 to-yellow-600 bg-clip-text text-transparent animate-gradient">
                Together—One Flower at a Time
              </span>
            </h1>

            {/* Subheadline with heart */}
            <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto animate-fade-in animation-delay-200">
              Join the movement spreading joy across communities. 
              <span className="font-semibold text-orange-600"> Donate today or host a table</span>—your 
              <span className="inline-block animate-pulse text-rose-500 mx-2">❤️</span>
              community is waiting.
            </p>

            {/* PRIMARY CTAs with extra animations */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in animation-delay-400">
              <button
                onClick={() => setShowDonationModal(true)}
                onMouseEnter={() => setHoveredButton('donate')}
                onMouseLeave={() => setHoveredButton(null)}
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-lg rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-orange-500/25 min-w-[200px] overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Donate Now</span>
                  <span className="text-xl transform transition-transform group-hover:rotate-12">
                    {hoveredButton === 'donate' ? '💝' : '🌻'}
                  </span>
                </span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
                {/* Particle effect on hover */}
                {hoveredButton === 'donate' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-particle"
                        style={{
                          animationDelay: `${i * 0.1}s`,
                          transform: `rotate(${i * 60}deg) translateX(40px)`
                        }}
                      />
                    ))}
                  </div>
                )}
              </button>

              <button
                onMouseEnter={() => setHoveredButton('host')}
                onMouseLeave={() => setHoveredButton(null)}
                className="group px-8 py-4 bg-white text-orange-600 font-bold text-lg rounded-full shadow-lg border-2 border-orange-300 hover:border-orange-500 hover:shadow-xl transition-all duration-300 min-w-[200px] relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Host a Table</span>
                  <span className="text-xl transform transition-transform group-hover:rotate-12">
                    {hoveredButton === 'host' ? '🌺' : '🌹'}
                  </span>
                </span>
                {/* Gradient sweep on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-yellow-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              </button>
            </div>

            {/* Live counter with animation */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 animate-fade-in animation-delay-600">
              <div className="flex items-center space-x-2 group">
                <span className="text-2xl group-hover:animate-wiggle">🌸</span>
                <span className="font-semibold">127 Active Tables</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center space-x-2 group">
                <span className="text-2xl group-hover:animate-wiggle">💐</span>
                <span className="font-semibold">{flowerCount.toLocaleString()}+ Flowers Given</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center space-x-2 group">
                <span className="text-2xl group-hover:animate-wiggle">🌍</span>
                <span className="font-semibold">23 Cities</span>
              </div>
            </div>

            {/* Quick donation with love messages */}
            <div className="mt-12 mb-8 animate-fade-in animation-delay-800">
              <p className="text-sm text-gray-600 mb-3">
                Quick donation options 
                <span className="inline-block ml-2 animate-pulse">💕</span>
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { amount: '10', message: '5 smiles' },
                  { amount: '25', message: '12 flowers' },
                  { amount: '50', message: '25 hugs' },
                  { amount: '100', message: '50 moments of joy' }
                ].map(({ amount, message }) => (
                  <div key={amount} className="group relative">
                    <button
                      onClick={() => handleDonation(amount)}
                      className="px-6 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 rounded-full hover:from-orange-200 hover:to-yellow-200 transition-all text-sm font-semibold transform hover:scale-105 hover:shadow-md"
                    >
                      ${amount}
                    </button>
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      = {message}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Given Flowers Table Demo Image */}
            <div className="mb-8 animate-fade-in animation-delay-900">
              <img 
                src={require('./table-demo.png')} 
                alt="Given Flowers table setup with tent, flowers, and FREE sign" 
                className="mx-auto rounded-2xl shadow-2xl max-w-full"
                style={{ maxWidth: '600px' }}
              />
              <p className="text-sm text-gray-600 text-center mt-4">
                This is what a Given Flowers table looks like - ready to spread joy! 🌻
              </p>
            </div>

            {/* Inspiring quote */}
            <div className="mt-8 p-4 bg-white/50 backdrop-blur rounded-2xl max-w-2xl mx-auto animate-fade-in animation-delay-1000">
              <p className="text-gray-700 italic">
                "A flower does not think of competing with the flower next to it. It just blooms."
              </p>
              <p className="text-sm text-orange-600 mt-2">- Zen Shin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Love Note Section */}
      <div className="bg-gradient-to-r from-rose-100 via-pink-50 to-orange-100 py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Every Flower Tells a Story 🌻
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/70 backdrop-blur p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
              <span className="text-4xl block mb-2">👵</span>
              <p className="text-sm text-gray-700">
                "That sunflower made me feel seen for the first time in months."
              </p>
              <p className="text-xs text-orange-600 mt-2">- Margaret, 82</p>
            </div>
            <div className="bg-white/70 backdrop-blur p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
              <span className="text-4xl block mb-2">👨‍👩‍👧</span>
              <p className="text-sm text-gray-700">
                "My daughter still has her pressed daisy. She says it's magic."
              </p>
              <p className="text-xs text-orange-600 mt-2">- The Chen Family</p>
            </div>
            <div className="bg-white/70 backdrop-blur p-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all">
              <span className="text-4xl block mb-2">💼</span>
              <p className="text-sm text-gray-700">
                "I was having the worst day. That rose changed everything."
              </p>
              <p className="text-xs text-orange-600 mt-2">- James, Downtown</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Love */}
      <footer className="bg-gradient-to-br from-orange-100 via-yellow-100 to-rose-100 py-12 relative overflow-hidden">
        {/* Subtle flower pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="absolute text-6xl"
              style={{
                left: `${(i % 5) * 20}%`,
                top: `${Math.floor(i / 5) * 25}%`,
                transform: `rotate(${i * 18}deg)`
              }}
            >
              {['🌻', '🌹', '🌸', '🌺'][i % 4]}
            </span>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1 - About with Heart */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <span className="text-2xl animate-pulse-subtle">🌸</span>
                <span>Given Flowers</span>
              </h3>
              <p className="text-gray-600 text-sm">
                A community movement spreading joy through the simple act of giving flowers. 
                No cost. No catch. Just love. 💛
              </p>
              <div className="mt-4 flex space-x-3">
                <span className="text-2xl hover:animate-wiggle cursor-pointer">🌻</span>
                <span className="text-2xl hover:animate-wiggle cursor-pointer">🌹</span>
                <span className="text-2xl hover:animate-wiggle cursor-pointer">🌺</span>
                <span className="text-2xl hover:animate-wiggle cursor-pointer">🌸</span>
              </div>
            </div>

            {/* Column 2 - Get Involved */}
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Get Involved</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#host" className="text-gray-600 hover:text-orange-600 transition flex items-center space-x-1">
                    <span>Host a Table</span>
                    <span className="opacity-0 hover:opacity-100">🌻</span>
                  </a>
                </li>
                <li>
                  <a href="#donate" className="text-gray-600 hover:text-orange-600 transition flex items-center space-x-1">
                    <span>Make a Donation</span>
                    <span className="opacity-0 hover:opacity-100">💝</span>
                  </a>
                </li>
                <li>
                  <a href="#volunteer" className="text-gray-600 hover:text-orange-600 transition flex items-center space-x-1">
                    <span>Volunteer</span>
                    <span className="opacity-0 hover:opacity-100">🤝</span>
                  </a>
                </li>
                <li>
                  <a href="#partner" className="text-gray-600 hover:text-orange-600 transition flex items-center space-x-1">
                    <span>Become a Partner</span>
                    <span className="opacity-0 hover:opacity-100">🤗</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Contact with Love */}
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="animate-pulse">📧</span>
                  <a href="mailto:hello@givenflowers.org" className="hover:text-orange-600 transition">
                    hello@givenflowers.org
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="animate-pulse">📍</span>
                  <span>Spreading joy in 23 cities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="animate-pulse">🌻</span>
                  <span>{flowerCount.toLocaleString()}+ flowers given</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="animate-pulse">💕</span>
                  <span>Countless hearts touched</span>
                </li>
              </ul>
            </div>

            {/* Column 4 - Newsletter with Extra Love */}
            <div>
              <h4 className="font-bold text-gray-800 mb-4">Stay Connected</h4>
              <p className="text-sm text-gray-600 mb-3">
                Get inspiring stories and updates from the Given Flowers family. 🌻
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 text-sm border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Join Our Garden 🌻
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                We promise only good vibes & flower power! 🌈
              </p>
            </div>
          </div>

          {/* Bottom bar with love */}
          <div className="mt-8 pt-8 border-t border-orange-200">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
              <p className="flex items-center space-x-2">
                <span>© 2024 Given Flowers. All rights reserved.</span>
                <span className="text-red-500 animate-pulse">Made with</span>
                <span className="text-xl animate-heartbeat">❤️</span>
              </p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#privacy" className="hover:text-orange-600 transition">Privacy Policy</a>
                <a href="#terms" className="hover:text-orange-600 transition">Terms of Service</a>
                <a href="#nonprofit" className="hover:text-orange-600 transition">501(c)(3) Info</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Donation Modal with Extra Love */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-scale-up overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-rose-100 to-pink-100 rounded-full transform -translate-x-16 translate-y-16"></div>
            
            <button
              onClick={() => setShowDonationModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center relative z-10">
              <div className="text-6xl mb-4 animate-bounce">🌻</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Your Gift Spreads Joy
              </h3>
              <p className="text-gray-600 mb-6">
                Every dollar helps us deliver more flowers and create more smiles. Thank you for being amazing! 💛
              </p>

              {/* Donation amount selector with love */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { amount: '10', impact: '5 flowers', emoji: '🌸' },
                    { amount: '25', impact: '12 flowers', emoji: '🌻' },
                    { amount: '50', impact: '25 flowers', emoji: '🌹' },
                    { amount: '100', impact: '50 flowers', emoji: '💐' }
                  ].map(({ amount, impact, emoji }) => (
                    <button
                      key={amount}
                      onClick={() => setDonationAmount(amount)}
                      className={`py-3 rounded-lg font-semibold transition-all transform hover:scale-105 ${
                        donationAmount === amount
                          ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <div>${amount}</div>
                      <div className="text-xs opacity-75">{impact} {emoji}</div>
                    </button>
                  ))}
                </div>

                {/* Custom amount */}
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Or enter custom amount:</label>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>

                {/* Donate button with love */}
                <button
                  onClick={() => handleDonation(donationAmount)}
                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Donate ${donationAmount}</span>
                    <span className="group-hover:animate-wiggle">💝</span>
                  </span>
                </button>

                {/* Impact message with animation */}
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    💐 Your ${donationAmount} donation = 
                    <span className="font-bold text-orange-600"> {Math.floor(donationAmount / 2)} flowers</span> for your community
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    That's {Math.floor(donationAmount / 2)} moments of unexpected joy! 🌈
                  </p>
                </div>

                {/* Trust badges */}
                <div className="flex justify-center space-x-4 text-xs text-gray-500">
                  <span>🔒 Secure</span>
                  <span>💚 Tax-deductible</span>
                  <span>🌍 100% goes to flowers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          75% {
            transform: translateY(20px) rotate(-5deg);
          }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        
        @keyframes particle {
          0% {
            opacity: 1;
            transform: rotate(var(--rotation)) translateX(0);
          }
          100% {
            opacity: 0;
            transform: rotate(var(--rotation)) translateX(80px);
          }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-wiggle {
          animation: wiggle 0.5s ease-in-out;
        }
        
        .animate-heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .animate-particle {
          animation: particle 1s ease-out forwards;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
          opacity: 0;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
          opacity: 0;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes scale-up {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-scale-up {
          animation: scale-up 0.3s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
      `}</style>
    </>
  );
};

function App() {
  return <GivenFlowersHero />;
}

export default App;