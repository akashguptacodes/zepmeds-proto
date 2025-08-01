import React, { useState } from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { fadeIn } from '../../services/variants';
import Card from '../ui/Card';
import { categories } from '../../services/mockData';
import { Link } from 'react-router-dom';

const CategoriesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" variants={fadeIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0
        }}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Pharmacist{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 dark:from-cyan-400 dark:to-green-400 bg-clip-text text-transparent">
              and Doctors
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-sans">Find exactly what you need from our comprehensive medicine collection</p>
        </div>

        <div className="flex justify-evenly gap-6">
          {categories.map((category) => (
            <Tilt
             
             
              key={category.id}
              options={{ max: 25, scale: 1.1, speed: 400 }}
            >
              <Link to={`/medicines?category=${category.name.toLowerCase()}`}>

              <Card className="p-8 text-center group-hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 border-0 h-full">
                <div className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                  {category.icon}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 text-sm font-display">
                  {category.name}
                </h3>
              </Card>
              </Link>
            </Tilt>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CategoriesSection; 