"use client";

import Image from "next/image";
import { useState , useRef } from "react";
import { Search, MapPin, ArrowRight, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("1");
  const checkinRef = useRef(null);
  const checkoutRef = useRef(null);
  const [popularDestinations, setPopularDestinations] = useState([
    { id: 1, name: "Bali", image: "/bali.jpg", properties: 245 },
    { id: 2, name: "Dubai", image: "/dubai.webp", properties: 312 },
    { id: 3, name: "Tokyo", image: "/tokyo.webp", properties: 189 },
  ]);
  
  const router = useRouter();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set("q", searchQuery);
      if (checkin) params.set("checkin", checkin);
      if (checkout) params.set("checkout", checkout);
      if (guests) params.set("guests", guests);
      
      router.push(`/hotels?${params.toString()}`);
    }
  };

  const handleDestinationClick = (destination) => {
    router.push(`/hotels?q=${encodeURIComponent(destination)}`);
  };

  return (
    <main className="relative min-h-screen w-full">
      {/* Background with CSS */}
      <div className="bg-landing" aria-hidden="true" />

      {/* Gradient overlay for contrast */}
      <div className="fixed inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70  " />
      
      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20 mt-8 sm:mt-10">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-4xl lg:text-6xl font-extrabold leading-tight sm:leading-tight lg:leading-tight mb-6 sm:mb-4 drop-shadow-lg max-w-4xl"
        >
          Find your perfect stay
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-base lg:text-lg mb-12 sm:mb-12 max-w-xl sm:max-w-2xl lg:max-w-3xl opacity-90"
        >
          Discover top-rated hotels, compare prices, and book instantly —
          wherever your next adventure takes you.
        </motion.p>

        {/* Glass search form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSearch}
          className="w-[95%] sm:w-[90%] lg:w-[80%] max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border border-white/10 transition-all duration-300 hover:bg-white/15"
        >
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Destination Input */}
            <div className="flex-1 min-w-[200px] relative">
              <label htmlFor="destination" className="sr-only">
                Destination
              </label>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
                <Search className="w-5 h-5" />
              </div>
              <input
                id="destination"
                name="q"
                type="search"
                placeholder="Where are you going?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm sm:text-base rounded-lg bg-white/10 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition "
              />
            </div>

            {/* Date & Guest Inputs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 flex-1 w-full sm:w-auto">
              <div 
                className="relative w-full cursor-pointer bg-white/10 rounded-lg border border-white/15 focus-within:ring-2 focus-within:ring-blue-400 transition"
                onClick={() => checkinRef.current?.showPicker()}
              >
                <label htmlFor="checkin" className="sr-only">
                  Check-in
                </label>
                <div className="absolute left-3 sm:left-2 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none">
                  <Calendar className="w-4 h-4" />
                </div>
                {!checkin && (
                  <div className="absolute left-10 sm:left-8 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none text-sm sm:text-base">
                    Check-in
                  </div>
                )}
                <input
                  ref={checkinRef}
                  id="checkin"
                  name="checkin"
                  type="date"
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                  className={`w-full pl-10 sm:pl-8 py-3 text-sm sm:text-base bg-transparent border-none outline-none text-white scheme-dark [&::-webkit-calendar-picker-indicator]:opacity-0 ${checkin ? 'opacity-100' : 'opacity-0'}`}
                />
                
              </div>

              <div 
                className="relative w-full cursor-pointer bg-white/10 rounded-lg border border-white/15 focus-within:ring-2 focus-within:ring-blue-400 transition"
                onClick={() => checkoutRef.current?.showPicker()}
              >
                <label htmlFor="checkout" className="sr-only">
                  Check-out
                </label>
                <div className="absolute left-3 sm:left-1 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none">
                  <Calendar className="w-4 h-4" />
                </div>
                {!checkout && (
                  <div className="absolute left-10 sm:left-6 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none text-sm sm:text-base">
                    Check-out
                  </div>
                )}
                <input
                  ref={checkoutRef}
                  id="checkout"
                  name="checkout"
                  type="date"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                  className={`w-full pl-10 sm:pl-6 py-3 text-sm sm:text-base bg-transparent border-none outline-none text-white scheme-dark [&::-webkit-calendar-picker-indicator]:opacity-0 ${checkout ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>

              <div className="relative col-span-2 sm:col-span-1">
                <label htmlFor="guests" className="sr-only">
                  Guests
                </label>
                <div className="absolute left-3 sm:left-2 top-1/2 transform -translate-y-1/2 text-white/70 pointer-events-none">
                  <Users className="w-4 h-4" />
                </div>
                <select
                  id="guests"
                  name="guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full appearance-none pl-10 sm:pl-7 pr-4 py-3 text-sm sm:text-base rounded-lg bg-white/10 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 transition border border-white/15"
                >
                  <option value="1" className="text-black bg-white">
                    1 guest
                  </option>
                  <option value="2" className="text-black bg-white">
                    2 guests
                  </option>
                  <option value="3" className="text-black bg-white">
                    3 guests
                  </option>
                  <option value="4" className="text-black bg-white">
                    4 guests
                  </option>
                  <option value="5" className="text-black bg-white">
                    5 guests
                  </option>
                  <option value="6" className="text-black bg-white">
                    6+ guests
                  </option>
                </select>
                <div className=" sm:hidden absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/70">   
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 w-full sm:w-auto rounded-full bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition text-white text-sm sm:text-base font-semibold shadow-lg"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </div>
        </motion.form>

        {/* Explore All Hotels CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 sm:mt-16 flex justify-center"
        >
          <Link 
            href="/hotels"
            className="group inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors font-medium text-lg"
          >
            <span className="border-b border-transparent group-hover:border-white/80 transition-all">Explore All Hotels</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Popular Destinations Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className=" mt-20 sm:mt-7 w-full max-w-6xl mx-auto"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">Popular Destinations</h2>
            <Link href="/hotels" className="hover:text-blue-300 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {popularDestinations.map((destination) => (
              <motion.div
                key={destination.id}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => handleDestinationClick(destination.name)}
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent z-10" />
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={400}
                  height={250}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 p-4 z-20 w-full">
                  <div className="flex items-center gap-1 text-white/80 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{destination.properties} properties</span>
                  </div>
                  <h3 className="text-xl font-bold text-start px-5 text-white">{destination.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
}
