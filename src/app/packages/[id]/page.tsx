'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, FaStar, FaMapMarkerAlt, FaUsers, 
  FaCheckCircle, FaArrowLeft, FaHeart, FaCreditCard,
  FaShieldAlt, FaUmbrellaBeach, FaCamera, FaUtensils, FaCheck 
} from 'react-icons/fa';
import BackButton from '@/components/BackButton';
import { destinations } from '@/data/destinations';
import BookingForm from '@/components/BookingForm';

export default function PackageDetail() {
  const router = useRouter();
  const params = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Get package data based on ID
  const packageId = params.id as string;
  const packageData = destinations.find(dest => dest.id === packageId);
  
  // Sample additional package data
  const packageExtendedData = {
    images: [
      packageData?.imageUrl || '',
      // Different images based on packageId
      ...(packageId === '1' ? [
        'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1623071284631-a04a7e63bde3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1615473787525-4574d69da836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ] : packageId === '2' ? [
        'https://images.unsplash.com/photo-1586422885236-8abce772768e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1614097396310-92b1bd7fa915?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1623071284831-de9d344d0978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ] : packageId === '3' ? [
        'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1598861371960-b671a8dbd95d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1589308978062-99626e2fa4d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ] : packageId === '4' ? [
        'https://images.unsplash.com/photo-1578271887552-5ac3a72752bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600590402802-7a551516c88c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ] : packageId === '5' ? [
        'https://images.unsplash.com/photo-1598864668488-60a770db6892?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1609092877116-90fa2dd2bb61?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600069740609-f4364762ebf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ] : packageId === '6' ? [
        'https://images.unsplash.com/photo-1593398359762-e8684d153ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1551018612-9715965c6742?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1559521783-1d1599583485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ] : packageId === '7' ? [
        'https://images.unsplash.com/photo-1544069797-9db25096b32c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1553521503-69829e0c89e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1543158266-0066955047b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ] : packageId === '8' ? [
        'https://images.unsplash.com/photo-1585241936939-be4099591252?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1569288063942-8a1e59a3dd7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1578752545565-00b851fea74d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ] : packageId === '9' ? [
        'https://images.unsplash.com/photo-1559735614-e35ef860a156?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1611601147557-dfa984bf6446?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ] : packageId === '10' ? [
        'https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1592853584674-cc658f74dadb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1569383746724-56c057a8b275?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ] : packageId === '11' ? [
        'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1604604557577-4e27a33e57da?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1601302594591-a1607fc3b57a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ] : packageId === '12' ? [
        'https://images.unsplash.com/photo-1583449542361-8bb0f354f876?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1589395937772-f67057e233b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1589486285381-a48bc962fa48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ] : [
        'https://images.unsplash.com/photo-1602088113235-229c19758e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1494922275507-58dc039ed337?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      ]),
    ],
    inclusions: [
      'Luxury Accommodation', 
      'Airport Transfers', 
      'Guided Tours',
      'Breakfast & Dinner',
      'Travel Insurance',
      'Welcome Package'
    ],
    exclusions: [
      'International Flights',
      'Personal Expenses',
      'Visa Fees (if applicable)',
      'Optional Activities'
    ],
    itinerary: [
      { 
        day: 'Day 1', 
        title: 'Arrival & Welcome', 
        description: 'Arrive at your destination. Meet and greet with our representative at the airport. Transfer to your hotel. Welcome dinner at a local restaurant.' 
      },
      { 
        day: 'Day 2', 
        title: 'City Exploration', 
        description: 'Breakfast at hotel. Full-day guided city tour with visits to main attractions. Lunch at a scenic spot. Evening at leisure.' 
      },
      { 
        day: 'Day 3', 
        title: 'Nature Adventure', 
        description: 'Early breakfast. Day trip to nearby natural attractions. Picnic lunch. Optional adventure activities. Return to hotel for dinner.' 
      },
      { 
        day: 'Day 4', 
        title: 'Cultural Immersion', 
        description: 'Breakfast at hotel. Visit to local cultural sites. Interactive cultural activities. Traditional dinner with local entertainment.' 
      },
      { 
        day: 'Day 5', 
        title: 'Leisure Day & Departure', 
        description: 'Breakfast at hotel. Morning at leisure for shopping or relaxation. Check-out and transfer to airport for departure.' 
      }
    ],
    reviews: [
      { 
        name: 'Sarah Johnson', 
        rating: 5, 
        date: '2 months ago',
        comment: 'Absolutely incredible experience! The accommodations were luxurious, and the tour guides were knowledgeable and friendly. Would highly recommend this package!' 
      },
      { 
        name: 'David Thompson', 
        rating: 4, 
        date: '3 months ago',
        comment: 'Great package overall. The itinerary was well-planned and we got to see all the major attractions. Only downside was the weather, but that\'s not their fault!' 
      },
      { 
        name: 'Michelle Wu', 
        rating: 5, 
        date: '1 month ago',
        comment: 'This was our third time booking with them and it never disappoints. The premium benefits make all the difference. Worth every penny!' 
      }
    ],
    faqs: [
      {
        question: 'What is the cancellation policy?',
        answer: 'Free cancellation up to 30 days before departure. 50% refund for cancellations 15-29 days before departure. No refund for cancellations less than 15 days before departure.'
      },
      {
        question: 'Is travel insurance included?',
        answer: 'Yes, basic travel insurance is included in all our premium packages. However, we recommend purchasing additional coverage for more comprehensive protection.'
      },
      {
        question: 'Are flights included in the package?',
        answer: 'International flights are not included in the package price. However, we can assist you in booking flights at competitive rates.'
      },
      {
        question: 'What is the maximum group size?',
        answer: 'Our premium packages have a maximum group size of 12 people to ensure personalized service and quality experience.'
      }
    ]
  };

  // If package not found
  if (!packageData) {
    return (
      <div className="pt-16 min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Package Not Found</h1>
          <p className="text-slate-600 mb-6">Sorry, the package you're looking for doesn't exist or has been removed.</p>
          <Link href="/packages">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-lg transition-all">
              Return to Packages
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate discounted price
  const discount = parseInt(packageId) % 2 === 0 ? ((parseInt(packageId) % 3) * 10 + 10) : 0;
  const discountedPrice = discount > 0 
    ? Math.round(packageData.price * (1 - discount / 100)) 
    : packageData.price;

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <BackButton />
      
      {/* Hero Section */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image 
          src={packageExtendedData.images[selectedImage]}
          alt={packageData.name}
          fill
          className="object-cover transition-all duration-700 ease-in-out"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm font-medium">
                Premium Package
              </div>
              <div className="flex items-center text-white">
                <FaStar className="text-yellow-400 mr-1" />
                <span>{packageData.rating} Rating</span>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{packageData.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center text-white/90">
                <FaMapMarkerAlt className="text-yellow-400 mr-2" />
                <span>{packageData.location}</span>
              </div>
              <div className="flex items-center text-white/90">
                <FaCalendarAlt className="text-yellow-400 mr-2" />
                <span>{packageData.duration}</span>
              </div>
            </div>
          </motion.div>
          
          {/* Image Thumbnails */}
          <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
            {packageExtendedData.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border-2 ${selectedImage === idx ? 'border-yellow-500 opacity-100' : 'border-transparent opacity-70'} transition-all`}
              >
                <Image 
                  src={img}
                  alt={`${packageData.name} view ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-8">
              <div className="border-b border-slate-100">
                <div className="flex overflow-x-auto hide-scrollbar">
                  {['overview', 'itinerary', 'inclusions', 'activities', 'reviews', 'faq'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`px-6 py-4 font-medium whitespace-nowrap transition-all capitalize ${
                        selectedTab === tab
                          ? 'text-yellow-500 border-b-2 border-yellow-500'
                          : 'text-slate-600 hover:text-yellow-500'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                {/* Overview Tab */}
                {selectedTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Package Overview</h2>
                    <p className="text-slate-600 mb-6">{packageData.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-slate-50 p-5 rounded-lg">
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Package Highlights</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <FaUmbrellaBeach className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">Discover pristine beaches and stunning landscapes</span>
                          </li>
                          <li className="flex items-start">
                            <FaCamera className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">Guided tours of top attractions and hidden gems</span>
                          </li>
                          <li className="flex items-start">
                            <FaUtensils className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">Authentic local cuisine and dining experiences</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-slate-50 p-5 rounded-lg">
                        <h3 className="text-lg font-semibold text-slate-800 mb-3">Why Choose This Package</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">Premium accommodation with stunning views</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">Expert guides who know the area inside out</span>
                          </li>
                          <li className="flex items-start">
                            <FaCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                            <span className="text-slate-600">Flexible itinerary with personalized experiences</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-100 p-5 rounded-lg">
                      <div className="flex items-center mb-3">
                        <FaShieldAlt className="text-yellow-500 mr-2" />
                        <h3 className="text-lg font-semibold text-slate-800">Our Promise</h3>
                      </div>
                      <p className="text-slate-600">
                        We're committed to making your journey unforgettable. From the moment you book until you return home, 
                        our team is dedicated to providing you with exceptional service and creating memories that last a lifetime.
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Itinerary Tab */}
                {selectedTab === 'itinerary' && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Your Journey Day by Day</h2>
                    <div className="space-y-6">
                      {packageExtendedData.itinerary.map((day, idx) => (
                        <div key={idx} className="border-l-4 border-yellow-500 pl-6 pb-6">
                          <div className="flex items-center mb-2">
                            <div className="bg-yellow-500 text-white text-sm font-bold px-2.5 py-0.5 rounded mr-2">
                              {day.day}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">{day.title}</h3>
                          </div>
                          <p className="text-slate-600">{day.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Inclusions Tab */}
                {selectedTab === 'inclusions' && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">What's Included & Not Included</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-bold text-green-600 mb-4 flex items-center">
                          <FaCheckCircle className="mr-2" /> 
                          Included in the Package
                        </h3>
                        <ul className="space-y-3">
                          {packageExtendedData.inclusions.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                                <FaCheckCircle className="text-green-500 text-sm" />
                              </div>
                              <span className="text-slate-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center">
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                          </svg>
                          Not Included
                        </h3>
                        <ul className="space-y-3">
                          {packageExtendedData.exclusions.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="bg-red-100 p-1 rounded-full mr-3 mt-0.5">
                                <svg className="text-red-500 text-sm w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                              </div>
                              <span className="text-slate-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Activities Tab */}
                {selectedTab === 'activities' && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Activities Included</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {packageData.activities.map((activity, index) => (
                        <div key={index} className="flex items-start p-3 bg-slate-50 rounded-lg">
                          <FaCheck className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                          <span className="text-slate-700">{activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Reviews Tab */}
                {selectedTab === 'reviews' && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-slate-800">Traveler Reviews</h2>
                      <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-lg">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="font-bold text-slate-800">{packageData.rating}</span>
                        <span className="text-slate-600 ml-1">/ 5</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {packageExtendedData.reviews.map((review, idx) => (
                        <div key={idx} className="bg-white border border-slate-100 rounded-lg p-5">
                          <div className="flex justify-between mb-3">
                            <h3 className="font-semibold text-slate-800">{review.name}</h3>
                            <span className="text-slate-400 text-sm">{review.date}</span>
                          </div>
                          <div className="flex mb-3">
                            {[...Array(5)].map((_, i) => (
                              <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-slate-200"} />
                            ))}
                          </div>
                          <p className="text-slate-600">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* FAQ Tab */}
                {selectedTab === 'faq' && (
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                      {packageExtendedData.faqs.map((faq, idx) => (
                        <div key={idx} className="border border-slate-200 rounded-lg overflow-hidden">
                          <div className="bg-slate-50 px-5 py-4">
                            <h3 className="font-semibold text-slate-800">{faq.question}</h3>
                          </div>
                          <div className="px-5 py-4">
                            <p className="text-slate-600">{faq.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar - Booking */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="transform hover:scale-[1.02] transition-all duration-300"
              >
                <BookingForm
                  destinationId={packageData.id}
                  destinationName={packageData.name}
                  price={discount > 0 ? discountedPrice : packageData.price}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 