"use client";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { Heart } from "lucide-react";
import { UserContext } from "../context/usercontext";
import Card from "../hotels/card";
import { Button } from "@/components/ui/button";

function getAverageRating(reviews = []) {
  if (!Array.isArray(reviews) || reviews.length === 0) return null;
  const numericRatings = reviews
    .map((review) => review?.rating)
    .filter((value) => typeof value === "number" && !Number.isNaN(value));
  if (numericRatings.length === 0) return null;
  const total = numericRatings.reduce((sum, value) => sum + value, 0);
  return total / numericRatings.length;
}

function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/listings/favourites`,
          {
            params: { userId: user.id },
          }
        );
        const favourites = response.data.favourites || [];
        setFavourites(favourites);
      } catch (error) {
        console.log("Error checking favorite status:", error);
      } finally {
        setLoading(false);
      }
    };
    checkFavoriteStatus();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <p className="text-lg text-gray-600">Loading your favourites...</p>
      </div>
    );
  }

  if (favourites.length === 0) {
    return (
      <section className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <Heart className="w-12 h-12 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          No Favourites Yet
        </h1>
        <p className="text-gray-600 mb-8 max-w-md">
          You haven't added any favorite hotels yet. Browse our collection to find your perfect stay and save it here for later.
        </p>
        <Button asChild size="lg">
          <Link href="/hotels">Browse Hotels</Link>
        </Button>
      </section>
    );
  }

  return (
    <>
      <section className="container mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Your Favourite Hotels
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favourites.map((listing) => (
            <Card
              key={listing._id}
              id={listing._id}
              title={listing.title}
              location={listing.location}
              country={listing.country}
              price={listing.price}
              image={listing.mainImage?.url}
              isFavorite={true}
              rating={getAverageRating(listing.reviews)}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Favourites;
