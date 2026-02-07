"use client";

import Card from "./card";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, MapPin, X } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/usercontext";
import axios from "axios";

// Filter component for hotel listings
function FilterOptions({ onFilterChange, activeFilters, onClearFilters }) {
  const filters = [
    { id: "luxury", label: "Luxury" },
    { id: "budget", label: "Budget" },
    { id: "pool", label: "Pool" },
    { id: "beachfront", label: "Beachfront" },
    { id: "pet-friendly", label: "Pet Friendly" },
  ];

  return (
    <div className="mb-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Filter By:</h3>
        {activeFilters.length > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 flex items-center gap-1.5 hover:text-blue-700 transition-colors font-medium"
          >
            <X className="w-3.5 h-3.5" /> Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={`px-4 py-2 text-sm rounded-full transition-all duration-200 border ${
              activeFilters.includes(filter.id)
                ? "bg-gray-900 text-white border-gray-900 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Main hotel listing component
export default function HotelsClient({ listings = [] }) {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useState({
    checkin: "",
    checkout: "",
    guests: "1"
  });
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState([]);
  const { user } = useContext(UserContext);
  
  // Get search query from URL on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const queryParam = urlParams.get('q');
        const checkinParam = urlParams.get('checkin');
        const checkoutParam = urlParams.get('checkout');
        const guestsParam = urlParams.get('guests');
        
        if (queryParam) {
          setSearchQuery(queryParam);
        }

        setSearchParams({
          checkin: checkinParam || "",
          checkout: checkoutParam || "",
          guests: guestsParam || "1"
        });
    }
  }, []);
  
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user?.id) return;
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/listings/favourites`,
          {
            params: { userId: user.id },
          }
        );
        const favourites = response.data.favourites || [];
        setIsFavorite(favourites.map((listing) => listing._id));
        console.log("Favourites:", favourites);
      } catch (error) {
        console.log("Error checking favorite status:", error);
      }
    };
    checkFavoriteStatus();
  }, [user?.id]);

  const getAverageRating = (reviews = []) => {
    if (!Array.isArray(reviews) || reviews.length === 0) return null;
    const numericRatings = reviews
      .map((review) => review?.rating)
      .filter((value) => typeof value === "number" && !Number.isNaN(value));
    if (numericRatings.length === 0) return null;
    const total = numericRatings.reduce((sum, value) => sum + value, 0);
    return total / numericRatings.length;
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-4 sm:pt-4 mb-6 sm:mb-12"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Discover Hotels
            </h1>
            <p className="hidden sm:block mt-3 text-base text-gray-600 max-w-2xl leading-relaxed">
              Browse our curated collection of premium stays — experience
              comfort, luxury, and unforgettable moments.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm text-gray-700 font-medium w-fit border border-gray-100">
            <span>{listings.length}</span>
            <span>{listings.length === 1 ? "property" : "properties"}</span>
            <span>available</span>
          </div>
        </div>

        <div className="flex flex-row gap-2 sm:gap-4 items-center justify-between mb-6">
          <div className={`relative transition-all duration-300 ${isMobileSearchOpen ? 'w-full' : 'w-auto sm:w-96'}`}>
            {!isMobileSearchOpen && (
              <button 
                onClick={() => setIsMobileSearchOpen(true)}
                className="sm:hidden flex items-center justify-center p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600"
              >
                <Search className="h-5 w-5" />
              </button>
            )}

            <div className={`${!isMobileSearchOpen ? 'hidden sm:block' : 'block'} relative w-full`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by location..."
                className="pl-10 pr-10 py-3 w-full rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus={isMobileSearchOpen}
              />
              {isMobileSearchOpen && (
                <button 
                  onClick={() => { setIsMobileSearchOpen(false); setSearchQuery(''); }}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 px-3 sm:px-6 py-3 rounded-xl border font-medium transition-all shadow-sm ${
              showFilters
                ? "bg-gray-900 text-white border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
            } ${isMobileSearchOpen ? 'hidden' : 'flex'}`}
          >
            <Filter className="h-5 w-5" />
            <span className="hidden sm:inline">{showFilters ? "Hide Filters" : "Filters"}</span>
            {activeFilters.length > 0 && (
              <span className="ml-1.5 bg-blue-600 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                {activeFilters.length}
              </span>
            )}
          </button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <FilterOptions
                onFilterChange={(filterId) => {
                  setActiveFilters((prev) =>
                    prev.includes(filterId)
                      ? prev.filter((id) => id !== filterId)
                      : [...prev, filterId]
                  );
                }}
                activeFilters={activeFilters}
                onClearFilters={() => setActiveFilters([])}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Filter listings based on search query and active filters */}
        {(() => {
          // Filter listings based on search and active filters
          const filteredListings = listings.filter((listing) => {
            const matchesSearch =
              searchQuery === "" ||
              listing.title
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              listing.country
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              listing.location
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase());

            // Simple filter simulation
            const matchesFilters =
              activeFilters.length === 0 ||
              activeFilters.some((filter) => {
                if (filter === "luxury" && listing.price > 2000) return true;
                if (filter === "budget" && listing.price < 1000) return true;
                return false;
              });

            return matchesSearch && matchesFilters;
          });

          if (filteredListings.length > 0) {
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-12">
                {filteredListings.map((hotel, index) => (
                  <motion.div
                    key={hotel._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card
                      id={hotel._id}
                      title={hotel.title}
                      location={hotel.location}
                      country={hotel.country}
                      price={hotel.price}
                      image={hotel.mainImage?.url}
                      isFavorite={isFavorite.includes(hotel._id)}
                      rating={getAverageRating(hotel.reviews)}
                      searchParams={searchParams}
                    />
                  </motion.div>
                ))}
              </div>
            );
          } else {
            return (
              <motion.div
                className="py-24 text-center bg-white rounded-2xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    No hotels available
                  </h3>
                  <p className="text-gray-600 max-w-md">
                    We couldn&apos;t find any hotels matching your criteria. Try
                    adjusting your filters or check back later.
                  </p>
                </div>
              </motion.div>
            );
          }
        })()}
      </motion.main>
    </>
  );
}
