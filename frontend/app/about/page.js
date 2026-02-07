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
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-white opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[16px_16px] opacity-50" />
        
        <motion.div 
          className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div 
            variants={fadeInUp}
            className="mt-2 sm:mt-0 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium bg-blue-50 text-blue-700 mb-6"
          >
            <Globe className="mr-2 h-4 w-4" />
            Discover the World
          </motion.div>
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6"
          >
            About <span className="text-blue-600">CozyStay</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Your trusted companion in discovering extraordinary places to stay
            around the world. We make every journey a story worth sharing.
          </motion.p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div 
              className="space-y-8 order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
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
                  go hand in hand. Whether you&apos;re looking for a quiet cabin in the 
                  woods or a vibrant city apartment, we&apos;re here to help you find 
                  your perfect home away from home.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-bold text-2xl text-gray-900">50k+</span>
                  </div>
                  <p className="text-sm text-gray-600">Happy Travelers</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="font-bold text-2xl text-gray-900">100+</span>
                  </div>
                  <p className="text-sm text-gray-600">Cities Covered</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="relative order-1 lg:order-2 aspect-4/3 rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/about_page.jpg"
                alt="Scenic view of a luxury resort"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-lg text-gray-600">
              We don&apos;t just list properties; we curate experiences. Here&apos;s why 
              travelers choose CozyStay for their adventures.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Award,
                color: "text-blue-600",
                bgColor: "bg-blue-100",
                title: "Curated Selection",
                description: "We carefully handpick every property to ensure exceptional quality, style, and comfort for your stay."
              },
              {
                icon: Shield,
                color: "text-green-600",
                bgColor: "bg-green-100",
                title: "Verified Reviews",
                description: "Real reviews from real travelers. We ensure transparency so you can make informed decisions with confidence."
              },
              {
                icon: Headphones,
                color: "text-purple-600",
                bgColor: "bg-purple-100",
                title: "24/7 Support",
                description: "Our dedicated support team is always just a click away to assist you before, during, and after your stay."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeInUp}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="bg-blue-600 rounded-3xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
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
                    <motion.li 
                      key={index} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <div className="bg-blue-500 p-1 rounded-full shrink-0">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="relative min-h-[300px] lg:min-h-full bg-blue-700">
                <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-blue-800 opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <Globe className="w-64 h-64 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <motion.div 
            className="bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-gray-100"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Heart className="h-12 w-12 text-red-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions, feedback, or just want to say hello? We&apos;d love to 
              hear from you. Our team is ready to help make your next trip perfect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                <a href="mailto:contact@cozystay.com">
                  Contact Support
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/hotels">
                  Browse Properties
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
