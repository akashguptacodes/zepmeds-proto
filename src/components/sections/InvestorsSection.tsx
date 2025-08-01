import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';

const InvestorSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const investors = [
    {
      id: 1,
      name: "Neha Agarwal",
      title: "Partner at Sequoia Capital",
      firm: "Sequoia Capital",
      bio: "Neha has backed multiple successful health-tech startups across India. With over a decade of VC experience, she brings strategic guidance, deep domain knowledge, and a powerful network to support ZapMeds' scale.",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 2,
      name: "Amit Tandon",
      title: "General Partner at Blume Ventures",
      firm: "Blume Ventures",
      bio: "Amit focuses on early-stage investments and scaling operational models in the Indian startup ecosystem. His mentorship has been key in ZapMeds’ go-to-market strategy and team expansion.",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 3,
      name: "Anjali Mehta",
      title: "Angel Investor & HealthTech Advisor",
      firm: "Independent",
      bio: "With a strong medical background and experience advising startups, Anjali bridges healthcare expertise with tech-driven innovation. She has been an early and active supporter of ZapMeds.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      id: 4,
      name: "Ravi Kapoor",
      title: "Partner at Accel",
      firm: "Accel",
      bio: "Ravi specializes in digital-first ventures and has helped scale startups across South Asia. He supports ZapMeds’ expansion with strategic partnerships and fundraising insights.",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % investors.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [investors.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % investors.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + investors.length) % investors.length);
  };

  return (
    <section id="investors" className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-green-600 dark:from-cyan-400 dark:to-green-400 bg-clip-text text-transparent">
              Investors
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Meet the visionary minds supporting ZapMeds' journey.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {investors.map((investor) => (
                <div key={investor.id} className="w-full flex-shrink-0 px-4">
                  <Card glassmorphism className="p-6 md:p-10 flex flex-col md:flex-row items-center bg-white/80 backdrop-blur dark:bg-gray-800/80 space-y-6 md:space-y-0 md:space-x-8 text-left">
                    <img
                      src={investor.avatar}
                      alt={investor.name}
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-2 border-blue-200 dark:border-cyan-400"
                    />
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{investor.name}</h3>
                      <p className="text-md text-gray-600 dark:text-gray-400 mb-2">{investor.title}</p>
                      <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{investor.bio}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {investors.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-blue-600 dark:bg-cyan-400 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default InvestorSection;