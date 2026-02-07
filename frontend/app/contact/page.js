"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  MessageSquare,
  HelpCircle
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitStatus({ type: 'loading', message: 'Sending your message...' });
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white py-20 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-white opacity-50" />
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
            <MessageSquare className="mr-2 h-4 w-4" />
            We&apos;re here to help
          </motion.div>
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-6"
          >
            Contact <span className="text-blue-600">Us</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Have questions about our services or need assistance? Our team is ready to provide you with the support you need.
          </motion.p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 -mt-10">
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Information Cards */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Info Cards */}
            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Our Office</h3>
                  <p className="text-gray-600 leading-relaxed">
                    123 Travel Street<br />
                    Adventure City, AC 12345
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-600 mb-2">contact@wonderlust.com</p>
                  <p className="text-sm text-gray-500">
                    We&apos;ll respond within 24 hours
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
                  <p className="text-gray-600 mb-2">+1 (234) 567-8900</p>
                  <p className="text-sm text-gray-500">
                    Mon-Fri from 9am to 6pm
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-linear-to-br from-blue-600 to-blue-700 p-8 rounded-xl shadow-lg text-white">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6" />
                <h3 className="text-xl font-bold">Business Hours</h3>
              </div>
              <div className="space-y-3 text-blue-100">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-50 rounded-full">
                  <HelpCircle className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                  <p className="text-gray-600">Fill out the form below and we&apos;ll get back to you shortly.</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="How can we help you?"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="flex min-h-[80px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                {submitStatus.message && (
                  <div className={`p-4 rounded-lg flex items-center gap-3 ${
                    submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-100' :
                    submitStatus.type === 'error' ? 'bg-red-50 text-red-800 border border-red-100' :
                    'bg-blue-50 text-blue-800 border border-blue-100'
                  }`}>
                    {submitStatus.type === 'loading' && (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                    )}
                    {submitStatus.message}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white min-w-[150px]"
                  disabled={submitStatus.type === 'loading'}
                >
                  {submitStatus.type === 'loading' ? 'Sending...' : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
