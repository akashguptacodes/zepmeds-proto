import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tilt } from 'react-tilt';
import { Clock, Shield, Star, ArrowRight, Zap, CheckCircle, Award, Users } from 'lucide-react';
import { categories, medicines } from '../services/mockData';
import { useCart } from '../context/CartContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Lottie from 'lottie-react';
import deliveryAnimation from '../assets/lottie/DeliveryScooter.json';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { fadeIn } from '../services/variants';

const Home: React.FC = () => {
  const featuredMedicines = medicines.slice(0, 4);
  const { dispatch } = useCart();

  const handleAddToCart = (medicine: any) => {
    dispatch({ type: 'ADD_ITEM', payload: { item: medicine, type: 'medicine' } });
  };
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) {
      setStart(true);
    }
  }, [inView]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2d9eef] to-[#19004d] text-white">
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              variants={fadeIn('up', 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                amount: 0
              }}>
              <div className="flex items-center space-x-3 text-yellow-300">
                <div className="bg-yellow-400/20 p-2 rounded-full">
                  <Zap className="h-6 w-6" />
                </div>
                <span className="text-sm font-semibold tracking-wide uppercase">India's Fastest Medicine Delivery</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black leading-tight font-display text-shadow-lg">
                  Medicines in{' '}
                  <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                    15 Minutes
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 font-light leading-relaxed max-w-2xl font-sans">
                  Lightning-fast delivery of genuine medicines and health products.
                  No more waiting, no more worrying.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  size="large"
                  className="text-green-600 border-2 border-white/30  hover:bg-white/10 hover:text-white backdrop-blur-sm font-semibold text-lg px-8 py-4"
                >
                  <Link to="/medicines">Browse All Medicines</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <div ref={ref}>
                    {start && (
                      <CountUp
                        className="text-blue-100"
                        end={100}
                        suffix='%'
                      />
                    )}
                  </div>
                  <span className="text-blue-100">Genuine</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-6 w-6 text-green-400" />
                  <span className="text-blue-100">Licensed Pharmacy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-green-400" />
                  <span className="text-blue-100">24/7 Available</span>
                </div>
              </div>
            </motion.div>

            <motion.div className="relative" variants={fadeIn('up', 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{
                once: true,
                amount: 0
              }}>
              <div className="rounded-3xl overflow-hidden w-full max-w-[20rem] sm:max-w-[28rem] lg:max-w-[36rem] mx-auto">
                <Lottie
                  animationData={deliveryAnimation}
                  loop
                  autoplay
                  className="w-full h-auto"
                />
              </div>


              <div className="absolute -top-6 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-6 rounded-2xl font-bold shadow-2xl animate-bounce">
                <Clock className="h-8 w-8 mb-2 mx-auto" />
                <div className="text-center">
                  <div className="text-2xl font-black">15 MIN</div>
                  <div className="text-sm">DELIVERY</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-gradient-to-r from-red-500 via-red-600 to-pink-600 text-white py-6 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="animate-pulse bg-red-400/30 rounded-full p-3">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <span className="font-bold text-lg">🚨 EMERGENCY MEDICINES AVAILABLE 24/7</span>
                <p className="text-red-100 text-sm">Critical medicines delivered in under 10 minutes</p>
              </div>
            </div>
            <Link
              to="/medicines?category=emergency"
              className="hidden md:flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl transition-all duration-200 font-semibold"
            >
              <span>Order Now</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8" variants={fadeIn('up', 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
              amount: 0
            }}>
            <div className="text-center">
              <div ref={ref}>
                {start && (
                  <CountUp
                    className="text-4xl font-black text-blue-600 mb-2"
                    end={15}
                  />
                )}
              </div>
              <div className="text-gray-600 font-medium">Minutes Delivery</div>
            </div>
            <div className="text-center">
              <div ref={ref}>
                {start && (
                  <CountUp
                    className="text-4xl font-black text-blue-600 mb-2"
                    end={50000}
                    suffix='+'
                  />
                )}
              </div>
              <div className="text-gray-600 font-medium">Happy Customers</div>
            </div>
            <div className="text-center">
              <div ref={ref}>
                {start && (
                  <CountUp
                    className="text-4xl font-black text-blue-600 mb-2"
                    end={10000}
                    suffix='+'
                  />
                )}

              </div>
              <div className="text-gray-600 font-medium">Medicines Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Service Available</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0
          }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-display text-shadow">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ZapMeds</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-sans">
              We're revolutionizing medicine delivery with our ultra-fast service and commitment to quality healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Tilt options={{ max: 20, scale: 1.08, speed: 400 }}>
              <Card className="p-8 text-center group bg-gradient-to-br from-white to-blue-50 border-0 h-full">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl animate-float">
                  <Clock className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 font-display">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed font-sans">Get your medicines delivered to your doorstep in under 15 minutes with our hyperlocal network.</p>
              </Card>
            </Tilt>

            <Tilt options={{ max: 20, scale: 1.08, speed: 400 }}>
              <Card className="p-8 text-center group bg-gradient-to-br from-white to-green-50 border-0 h-full">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl animate-float">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 font-display">100% Genuine</h3>
                <p className="text-gray-600 leading-relaxed font-sans">All medicines sourced directly from licensed pharmacies and verified manufacturers.</p>
              </Card>
            </Tilt>

            <Tilt options={{ max: 20, scale: 1.08, speed: 400 }}>
              <Card className="p-8 text-center group bg-gradient-to-br from-white to-purple-50 border-0 h-full">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl animate-float">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 font-display">24/7 Support</h3>
                <p className="text-gray-600 leading-relaxed font-sans">Round-the-clock customer service for all your medical needs and emergencies.</p>
              </Card>
            </Tilt>
          </div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0
          }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-display text-shadow">Shop by Category</h2>
            <p className="text-xl text-gray-600 font-sans">Find exactly what you need from our comprehensive medicine collection</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Tilt
                key={category.id}
                options={{ max: 25, scale: 1.1, speed: 400 }}
              >
                <Link
                  to={`/medicines?category=${category.name.toLowerCase()}`}
                  className="group block"
                >
                  <Card className="p-6 text-center group-hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border-0 h-full">
                    <div className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 text-sm font-display">
                      {category.name}
                    </h3>
                  </Card>
                </Link>
              </Tilt>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0
          }}>
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 font-display text-shadow">Popular Medicines</h2>
              <p className="text-xl text-gray-600 font-sans">Most ordered medicines with fastest delivery</p>
            </div>
            <Link
              to="/medicines"
              className="hidden md:flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-bold text-lg group font-display"
            >
              <span>View All</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredMedicines.map((medicine) => (
              <Tilt key={medicine.id} options={{ max: 15, scale: 1.05, speed: 300 }}>
                <Card className="overflow-hidden group bg-white border-0 h-full flex flex-col">
                  <div className="relative flex-shrink-0">
                    <Link to={`/medicine/${medicine.id}`}>
                      <img
                        src={medicine.image}
                        alt={medicine.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
                      <Clock className="h-3 w-3" />
                      <span>{medicine.deliveryTime}</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-bold text-gray-700">{medicine.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <Link to={`/medicine/${medicine.id}`}>
                      <h3 className="font-bold text-lg text-gray-900 hover:text-blue-600 mb-2 group-hover:text-blue-600 transition-colors duration-200 font-display">
                        {medicine.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-4 font-sans">{medicine.manufacturer}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-black text-gray-900">₹{medicine.price}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">₹{medicine.originalPrice}</span>
                        <div className="text-xs text-green-600 font-bold font-mono">
                          {Math.round(((medicine.originalPrice - medicine.price) / medicine.originalPrice) * 100)}% OFF
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 font-bold"
                      onClick={() => handleAddToCart(medicine)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              </Tilt>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Health Tests CTA */}
      <section className="py-20 bg-gradient-to-br from-[#2d9eef] to-[#19004d] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-400/10 rounded-full blur-3xl"></div>

        <motion.div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0
          }}>
          <h2 className="text-4xl md:text-5xl font-black mb-6 font-display text-shadow-lg">Health Tests at Your Doorstep</h2>
          <p className="text-purple-100 text-xl mb-10 max-w-3xl mx-auto leading-relaxed font-sans">
            Book lab tests online and get sample collection at your home. Fast, safe, and reliable health checkups with reports in hours.
          </p>
          <Button
            size="large"
            className="bg-white text-purple-600 hover:bg-gray-100 font-bold text-lg px-8 py-4 shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            <Link to="/tests" className="flex items-center space-x-2">
              <span>Book Health Test</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0
          }}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 font-display text-shadow">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 font-sans">Join thousands of satisfied customers who trust ZapMeds</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                location: "HSR Layout, Bangalore",
                rating: 5,
                comment: "Incredible service! Got my fever medicine in just 12 minutes. The delivery person was professional and the medicines were genuine."
              },
              {
                name: "Rajesh Kumar",
                location: "Koramangala, Bangalore",
                rating: 5,
                comment: "Emergency insulin delivery at 2 AM - ZapMeds saved my life! Fast, reliable, and available 24/7. Highly recommended."
              },
              {
                name: "Anita Patel",
                location: "Whitefield, Bangalore",
                rating: 5,
                comment: "Best medicine delivery app! Easy to use, great prices, and super fast delivery. My go-to for all medical needs."
              }
            ].map((testimonial, index) => (
              <Tilt key={index} options={{ max: 10, scale: 1.02, speed: 300 }}>
                <Card className="p-8 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic font-sans">"{testimonial.comment}"</p>
                  <div>
                    <div className="font-bold text-gray-900 font-display">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm font-sans">{testimonial.location}</div>
                  </div>
                </Card>
              </Tilt>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};
export default Home;