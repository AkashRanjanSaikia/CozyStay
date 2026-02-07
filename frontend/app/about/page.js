"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Star, 
  Headphones, 
  Shield, 
  CheckCircle, 
  Heart, 
  Users, 
  Globe,
  Award
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-white opacity-50" />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 mb-6">
            <Globe className="mr-2 h-4 w-4" />
            Discover the World
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
            About <span className="text-blue-600">CozyStay</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your trusted companion in discovering extraordinary places to stay
            around the world. We make every journey a story worth sharing.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At CozyStay, we believe that every journey deserves extraordinary
                  accommodation. Our mission is to connect travelers with unique and
                  inspiring places to stay, creating unforgettable experiences that
                  turn every trip into a story worth sharing.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We are building a community where trust, comfort, and adventure 
                  go hand in hand. Whether you're looking for a quiet cabin in the 
                  woods or a vibrant city apartment, we're here to help you find 
                  your perfect home away from home.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-bold text-2xl text-gray-900">50k+</span>
                  </div>
                  <p className="text-sm text-gray-600">Happy Travelers</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="font-bold text-2xl text-gray-900">100+</span>
                  </div>
                  <p className="text-sm text-gray-600">Cities Covered</p>
                </div>
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-4 bg-linear-to-r from-blue-100 to-purple-100 rounded-2xl blur-lg opacity-50" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-4/3">
                <Image
                  src="/about_page.jpg"
                  alt="Scenic view of a luxury resort"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-lg text-gray-600">
              We don't just list properties; we curate experiences. Here's why 
              travelers choose CozyStay for their adventures.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Curated Selection</h3>
              <p className="text-gray-600 leading-relaxed">
                We carefully handpick every property to ensure exceptional quality,
                style, and comfort for your stay.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Reviews</h3>
              <p className="text-gray-600 leading-relaxed">
                Real reviews from real travelers. We ensure transparency so you 
                can make informed decisions with confidence.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Headphones className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Our dedicated support team is always just a click away to assist 
                you before, during, and after your stay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 sm:p-16 text-white flex flex-col justify-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Why Choose CozyStay?
                </h2>
                <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                  With years of experience in the travel industry, we understand what
                  makes a stay truly special. Our platform is designed to make finding
                  and booking your perfect accommodation simple and secure.
                </p>
                <ul className="space-y-4">
                  {[
                    "Best Price Guarantee",
                    "Secure Booking Process",
                    "Exceptional Customer Service",
                    "Carefully Vetted Properties"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="bg-blue-500 p-1 rounded-full">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative min-h-[300px] lg:min-h-full bg-blue-700">
                {/* Abstract pattern or simple solid color for now, or we could use another image if we had one. 
                    Using a pattern/gradient overlay. */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-blue-800 opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <Globe className="w-64 h-64 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100">
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions, feedback, or just want to say hello? We'd love to 
              hear from you. Our team is ready to help make your next trip perfect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <a href="mailto:contact@cozystay.com">
                  Contact Support
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/search">
                  Browse Properties
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
