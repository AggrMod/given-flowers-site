import React, { useState, useEffect } from 'react';
import './App.css';

// Using public folder for images to avoid build issues
const logoImage = '/given-flowers-logo.jpg';
const bouncerImage = '/bouncer.jpg';
const tableImage = '/table-demo.png';
const heroGif = '/given-flowers-hero.gif'; // New hero GIF reference

const GivenFlowersHero = () => {
  const [donationAmount, setDonationAmount] = useState('25');
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownExitPopup, setHasShownExitPopup] = useState(false);
  const [flowerCount, setFlowerCount] = useState(50000);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [logoPosition, setLogoPosition] = useState('normal');
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [email, setEmail] = useState('');
  
  // Animate flower counter
  useEffect(() => {
    const interval = setInterval(() => {
      setFlowerCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Exit intent detection for desktop and mobile with session storage
  useEffect(() => {
    // Check if popup was already shown this session
    const hasShownThisSession = sessionStorage.getItem('givenFlowersExitPopupShown');
    if (hasShownThisSession) {
      setHasShownExitPopup(true);
      return;
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Mobile: Timer-based popup after 45 seconds (slightly longer delay)
      const mobileTimer = setTimeout(() => {
        if (!hasShownExitPopup && !showExitPopup) {
          setShowExitPopup(true);
          setHasShownExitPopup(true);
          sessionStorage.setItem('givenFlowersExitPopupShown', 'true');
        }
      }, 45000); // 45 seconds for less intrusive experience

      return () => clearTimeout(mobileTimer);
    } else {
      // Desktop: Mouse leave detection with slight delay
      const handleMouseLeave = (e) => {
        if (e.clientY <= 0 && !hasShownExitPopup && !showExitPopup) {
          // Small delay to avoid accidental triggers
          setTimeout(() => {
            if (e.clientY <= 0) {
              setShowExitPopup(true);
              setHasShownExitPopup(true);
              sessionStorage.setItem('givenFlowersExitPopupShown', 'true');
            }
          }, 100);
        }
      };

      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [hasShownExitPopup, showExitPopup]);

  const handleDonation = (amount) => {
    console.log(`Processing donation of $${amount}`);
    alert(`Thank you for your $${amount} donation! 🌻 In production, this would process through Stripe.`);
    if (showDonationModal) setShowDonationModal(false);
    if (showExitPopup) setShowExitPopup(false);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('form-name', 'flower-signup');
    formData.append('email', email);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      
      alert('Thanks for joining our flower community! 🌸');
      setShowExitPopup(false);
      setEmail('');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Oops! Something went wrong. Please try again.');
    }
  };

  const handleLogoMouseEnter = () => {
    setIsHoveringLogo(true);
    setTimeout(() => {
      setLogoPosition('top');
    }, 100);
  };

  const handleLogoMouseLeave = () => {
    setIsHoveringLogo(false);
    setTimeout(() => {
      setLogoPosition('normal');
    }, 200);
  };

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
      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        /* Hero section with GIF background */
        .hero-section {
          position: relative;
          z-index: 1;
          padding-bottom: 0; /* Remove bottom padding */
          margin-bottom: 0; /* Remove bottom margin */
        }
        
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('${heroGif}');
          background-size: cover;
          background-position: center;
          z-index: -2;
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(255, 253, 240, 0.85);
          z-index: -1;
        }
        
        /* Quick donation section styling */
        .quick-donation-section {
          margin-top: 0; /* Remove top margin */
          padding-top: 1rem; /* Reduced top padding */
          background-color: transparent; /* Make background transparent */
          position: relative;
          z-index: 2;
        }
      `}</style>

      {/* Hidden Netlify form */}
      <form name="flower-signup" netlify hidden>
        <input type="email" name="email" />
      </form>

      {/* Fixed Logo Position */}
      {logoPosition === 'top' && (
        <div className="fixed top-4 left-4 z-50 transition-all duration-500">
          <img 
            src={logoImage} 
            alt="Given Flowers Logo" 
            className="rounded-full shadow-2xl animate-fade-in"
            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          />
        </div>
      )}

      {/* Hero Section with GIF Background */}
      <div className="bg-gradient-to-br from-orange-50 via-yellow-50 to-rose-50 min-h-screen relative overflow-hidden hero-section">
        {/* Hero GIF Background */}
        <div className="hero-background"></div>
        
        {/* Semi-transparent overlay */}
        <div className="hero-overlay"></div>
        
        {/* Animated background flowers */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <FloatingFlower 
              key={i} 
              delay={i * 2} 
              emoji={['🌻', '🌹', '🌸', '🌺', '🌼', '🌷', '💐', '🌵'][i]} 
            />
          ))}
        </div>

        {/* Navigation */}
        <nav className="relative z-20 p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div 
              className="flex items-center space-x-3 group cursor-pointer"
              onMouseEnter={handleLogoMouseEnter}
              onMouseLeave={handleLogoMouseLeave}
            >
              <img 
                src={logoImage} 
                alt="Given Flowers Logo" 
                className={`rounded-full transform transition-all duration-500 object-cover shadow-lg ${
                  isHoveringLogo ? 'rotate-12 scale-110' : ''
                } ${logoPosition === 'top' ? 'opacity-50' : 'opacity-100'}`}
                style={{ 
                  width: logoPosition === 'normal' ? '150px' : '120px', 
                  height: logoPosition === 'normal' ? '150px' : '120px', 
                  objectFit: 'cover' 
                }}
              />
              <div>
                <span className="text-2xl font-bold text-gray-800" style={{fontFamily: 'cursive'}}>
                  Given Flowers
                </span>
                <p className="text-xs text-gray-600">Spreading joy, one flower at a time</p>
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

        {/* Hero Content */}
        <div className="relative z-10 pt-10 pb-12 px-6"> {/* Reduced bottom padding */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left">
              {/* Urgency banner */}
              <div className="inline-block bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 px-6 py-3 rounded-full text-sm font-semibold mb-6 animate-bounce shadow-lg">
                <span className="animate-pulse">✨</span> Spring 2025 Cohort - Only 5 Spots Left! <span className="animate-pulse">✨</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight animate-fade-in">
                Let's Make a Difference 
                <span className="block bg-gradient-to-r from-yellow-400 via-rose-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
                  Together—One Flower at a Time
                </span>
              </h1>

              <p className="text-xl text-gray-700 mb-8 max-w-2xl animate-fade-in animation-delay-200">
                Join the movement spreading joy across communities. 
                <span className="font-semibold text-orange-600"> Donate today or host a table</span>—your 
                <span className="inline-block animate-pulse text-rose-500 mx-2">❤️</span>
                community is waiting.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 animate-fade-in animation-delay-400">
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
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000"></div>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-yellow-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                </button>
              </div>

              {/* Live counter */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-gray-700 animate-fade-in animation-delay-600">
                <div className="flex items-center space-x-2 group">
                  <span className="text-2xl group-hover:animate-wiggle">🌸</span>
                  <span className="font-semibold">127 Active Tables</span>
                </div>
                <div className="flex items-center space-x-2 group">
                  <span className="text-2xl group-hover:animate-wiggle">💐</span>
                  <span className="font-semibold">{flowerCount.toLocaleString()}+ Flowers Given</span>
                </div>
                <div className="flex items-center space-x-2 group">
                  <span className="text-2xl group-hover:animate-wiggle">🌍</span>
                  <span className="font-semibold">23 Cities</span>
                </div>
              </div>
            </div>

            {/* Right side - Table Demo Image */}
            <div className="relative animate-fade-in animation-delay-800">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img 
                  src={tableImage} 
                  alt="Given Flowers table setup with volunteers spreading joy" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Image overlay text */}
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">100% FREE Flowers 🌻</h3>
                  <p className="text-lg drop-shadow">No catch. Just spreading joy in our communities.</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 text-6xl animate-pulse-subtle animation-delay-900">🌺</div>
              <div className="absolute -bottom-4 -left-4 text-6xl animate-pulse-subtle animation-delay-1000">🌻</div>
            </div>
          </div>
        </div>
        
        {/* Quick Donation Section - Now inside the hero section */}
        <div className="relative z-10 quick-donation-section pb-8">
          <div className="max-w-4xl mx-auto px-6 text-center">
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
        </div>
      </div>

      {/* New Info Card Section - Subtle and informative */}
      <div className="bg-gradient-to-b from-white via-orange-50/30 to-white py-6">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-orange-100 p-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <span className="text-2xl">🌟</span>
              <h3 className="text-lg font-semibold text-gray-800">Your Impact Matters</h3>
              <span className="text-2xl">🌟</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Given Flowers is a registered 501(c)(3) nonprofit organization. Your donations are tax-deductible and directly fund flower purchases, community events, and volunteer coordination.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center space-x-1">
                <span>✅</span>
                <span>Tax ID: 88-1234567</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>📊</span>
                <span>94% goes directly to programs</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>🏆</span>
                <span>GuideStar Gold Seal</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section - Moved outside the hero section */}
      <div className="bg-white py-8">
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Quote */}
          <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl max-w-2xl mx-auto">
            <p className="text-gray-700 italic">
              "A flower does not think of competing with the flower next to it. It just blooms."
            </p>
            <p className="text-sm text-orange-600 mt-2">- Zen Shin</p>
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

      {/* Footer */}
      <footer className="bg-gradient-to-br from-orange-100 via-yellow-100 to-rose-100 py-12 relative overflow-hidden">
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
            <div>
              <h3 className="font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <span className="text-2xl animate-pulse-subtle">🌸</span>
                <span>Given Flowers</span>
              </h3>
              <p className="text-gray-600 text-sm">
                A community movement spreading joy through the simple act of giving flowers. 
                No cost. No catch. Just love. 💛
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-4">Get Involved</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#host" className="text-gray-600 hover:text-orange-600 transition">Host a Table 🌻</a>
                </li>
                <li>
                  <a href="#donate" className="text-gray-600 hover:text-orange-600 transition">Make a Donation 💝</a>
                </li>
                <li>
                  <a href="#volunteer" className="text-gray-600 hover:text-orange-600 transition">Volunteer 🤝</a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-4">Contact Us</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>📧 hello@givenflowers.org</li>
                <li>📍 Spreading joy in 23 cities</li>
                <li>🌻 {flowerCount.toLocaleString()}+ flowers given</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-4">Stay Connected</h4>
              <p className="text-sm text-gray-600 mb-3">
                Get updates from the Given Flowers family. 🌻
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 text-sm border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-sm font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Join Our Garden 🌻
                </button>
              </form>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-orange-200 text-center">
            <p className="text-sm text-gray-600">
              © 2025 Given Flowers. Made with ❤️
            </p>
          </div>
        </div>
      </footer>

      {/* Exit Intent Popup - Works for BOTH Desktop & Mobile! */}
      {showExitPopup && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-popup-title"
          aria-describedby="exit-popup-description"
        >
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative animate-scale-up overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-rose-100 to-pink-100 rounded-full transform -translate-x-16 translate-y-16"></div>
            
            <button
              onClick={() => setShowExitPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 text-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded"
              aria-label="Close popup"
            >
              ×
            </button>

            <div className="text-center relative z-10">
              {/* Bouncer front and center! */}
              <div className="mb-4">
                <img 
                  src={bouncerImage} 
                  alt="Bouncer the friendly community dog, wagging his tail with a gentle, welcoming expression"
                  className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg animate-bounce"
                />
              </div>
              <h3 id="exit-popup-title" className="text-2xl font-bold text-gray-800 mb-2">
                Wait! Bouncer Has Something for You! 🐕
              </h3>
              <p id="exit-popup-description" className="text-gray-600 mb-6">
                Before you go, join our flower community and be the first to know when we need table hosts in your area. Plus, get inspiring stories from our flower family! 🌻
              </p>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <label htmlFor="email-input" className="sr-only">Email address</label>
                <input
                  id="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-lg focus:outline-none"
                  aria-describedby="email-help"
                />
                <p id="email-help" className="sr-only">We'll send you updates about flower community events and table hosting opportunities in your area</p>
                
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                  aria-describedby="join-button-help"
                >
                  Join the Flower Family 🌻
                </button>
                <p id="join-button-help" className="sr-only">Click to subscribe to our flower community newsletter</p>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">
                  Or make an instant impact:
                </p>
                <div className="flex gap-2 justify-center">
                  {['10', '25', '50'].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleDonation(amount)}
                      className="px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-700 rounded-lg hover:from-orange-200 hover:to-yellow-200 transition-all text-sm font-semibold transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                      aria-label={`Donate $${amount} to support flower giving`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bouncer's friendly clarification */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  🛡️ No spam, just flower power and community updates!
                </p>
                <p className="text-xs text-gray-400 mt-1 italic">
                  💕 Bouncer is just having fun—flowers are always free! He's our friendly community mascot.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Donation Modal */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-scale-up overflow-hidden">
            <button
              onClick={() => setShowDonationModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 text-2xl"
            >
              ×
            </button>

            <div className="text-center relative z-10">
              <div className="text-6xl mb-4">🌻</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Your Gift Spreads Joy
              </h3>
              <p className="text-gray-600 mb-6">
                Every dollar helps us deliver more flowers and create more smiles!
              </p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { amount: '10', impact: '5 flowers', emoji: '🌸' },
                  { amount: '25', impact: '12 flowers', emoji: '🌻' },
                  { amount: '50', impact: '25 flowers', emoji: '🌹' },
                  { amount: '100', impact: '50 flowers', emoji: '💐' }
                ].map(({ amount, impact, emoji }) => (
                  <button
                    key={amount}
                    onClick={() => setDonationAmount(amount)}
                    className={`py-3 rounded-lg font-semibold transition-all ${
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

              <button
                onClick={() => handleDonation(donationAmount)}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Donate ${donationAmount} 💝
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function App() {
  return <GivenFlowersHero />;
}

export default App;