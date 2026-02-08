import HotelDetailClient from "./HotelDetailClient";

// Function to fetch all listings (for static params)
async function getListings() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/listings`, {
      next: { tags: ["hotels"], revalidate: 3600 } 
    });
    if (!res.ok) throw new Error("Failed to fetch listings");
    return res.json();
  } catch (error) {
    console.error("Error fetching listings for static params:", error);
    return [];
  }
}

// Function to fetch specific hotel details
async function getHotel(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/listings/${id}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Error fetching hotel ${id}:`, error);
    return null;
  }
}

// Generate static params for the first 10 hotels
export async function generateStaticParams() {
  const listings = await getListings();
  
  // Slice the first 10 items
  const first10 = listings.slice(0, 10);
  
  return first10.map((listing) => ({
    hotel: listing._id,
  }));
}

export default async function Page({ params }) {
  const { hotel } = await params;
  const hotelData = await getHotel(hotel);

  return <HotelDetailClient initialHotelData={hotelData} key={hotel} />;
}
