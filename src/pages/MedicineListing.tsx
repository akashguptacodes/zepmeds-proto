import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {Tilt} from 'react-tilt';
import { Filter, Grid, List, Star, Clock } from 'lucide-react';
import { medicines, categories } from '../services/mockData';
import { useCart } from '../context/CartContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const MedicineListing: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('popularity');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const { dispatch } = useCart();
  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';

  // Initialize category from URL params
  React.useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredMedicines = useMemo(() => {
    let filtered = medicines;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(medicine =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(medicine =>
        medicine.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Sort medicines
    switch (sortBy) {
      case 'price-low':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case 'delivery':
        return [...filtered].sort((a, b) => {
          const timeA = parseInt(a.deliveryTime);
          const timeB = parseInt(b.deliveryTime);
          return timeA - timeB;
        });
      default:
        return filtered;
    }
  }, [searchQuery, selectedCategory, sortBy]);

  const handleAddToCart = (medicine: any) => {
    dispatch({ type: 'ADD_ITEM', payload: { item: medicine, type: 'medicine' } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 font-display text-shadow">
              {searchQuery ? `Search results for "${searchQuery}"` : 'All Medicines'}
            </h1>
            <p className="text-xl text-gray-600 font-sans">{filteredMedicines.length} products found</p>
          </div>
          
          <div className="flex items-center space-x-6 mt-6 md:mt-0">
            {/* View Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all duration-200 ${viewMode === 'grid' ? 'bg-white shadow-lg text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all duration-200 ${viewMode === 'list' ? 'bg-white shadow-lg text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-lg font-medium"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="delivery">Fastest Delivery</option>
            </select>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden shadow-lg"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:col-span-1`}>
            <Card className="p-8 sticky top-24 bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl">
              <h3 className="font-black text-xl mb-6 text-gray-900 font-display">Filters</h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-bold mb-4 text-gray-800 font-display">Categories</h4>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200">
                    <input
                      type="radio"
                      name="category"
                      value=""
                      checked={selectedCategory === ''}
                      onChange={() => setSelectedCategory('')}
                      className="mr-3 text-blue-600"
                    />
                    <span className="font-medium font-sans">All Categories</span>
                  </label>
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200">
                      <input
                        type="radio"
                        name="category"
                        value={category.name.toLowerCase()}
                        checked={selectedCategory === category.name.toLowerCase()}
                        onChange={() => setSelectedCategory(category.name.toLowerCase())}
                        className="mr-3 text-blue-600"
                      />
                      <span className="font-medium font-sans">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Prescription Required */}
              <div className="mb-6">
                <h4 className="font-bold mb-4 text-gray-800 font-display">Prescription</h4>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200">
                    <input type="checkbox" className="mr-3 text-blue-600" />
                    <span className="font-medium font-sans">No Prescription Required</span>
                  </label>
                  <label className="flex items-center cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200">
                    <input type="checkbox" className="mr-3 text-blue-600" />
                    <span className="font-medium font-sans">Prescription Required</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-bold mb-4 text-gray-800 font-display">Price Range</h4>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200">
                    <input type="checkbox" className="mr-3 text-blue-600" />
                    <span className="font-medium font-sans">Under ₹50</span>
                  </label>
                  <label className="flex items-center cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200">
                    <input type="checkbox" className="mr-3 text-blue-600" />
                    <span className="font-medium font-sans">₹50 - ₹100</span>
                  </label>
                  <label className="flex items-center cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200">
                    <input type="checkbox" className="mr-3 text-blue-600" />
                    <span className="font-medium font-sans">₹100 - ₹500</span>
                  </label>
                  <label className="flex items-center cursor-pointer hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200">
                    <input type="checkbox" className="mr-3 text-blue-600" />
                    <span className="font-medium font-sans">Above ₹500</span>
                  </label>
                </div>
              </div>
            </Card>
          </div>

          {/* Products Grid/List */}
          <div className="lg:col-span-3">
            {filteredMedicines.length === 0 ? (
              <Card className="text-center py-16 bg-gradient-to-br from-white to-gray-50 border-0 shadow-xl">
                <p className="text-gray-500 text-xl mb-6 font-sans">No medicines found matching your criteria.</p>
                <Button className="shadow-lg">
                  <Link to="/medicines">Browse All Medicines</Link>
                </Button>
              </Card>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'
                : 'space-y-6'
              }>
                {filteredMedicines.map((medicine) => (
                  <Tilt key={medicine.id} options={{ max: 12, scale: 1.03, speed: 300 }}>
                    <Card className={`overflow-hidden group bg-white border-0 shadow-xl transition-all duration-300 ${viewMode === 'list' ? 'flex' : 'h-full flex flex-col'}`}>
                    <Link to={`/medicine/${medicine.id}`} className={viewMode === 'list' ? 'flex-shrink-0' : ''}>
                      <img 
                        src={medicine.image} 
                        alt={medicine.name}
                        className={viewMode === 'list' 
                          ? 'w-32 h-32 object-cover group-hover:scale-105 transition-transform duration-300'
                          : 'w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                        }
                      />
                    </Link>
                    
                    <div className="p-6 flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs bg-gradient-to-r from-green-400 to-green-500 text-white px-3 py-1 rounded-full flex items-center space-x-1 font-bold shadow-lg">
                          <Clock className="h-3 w-3" />
                          <span>{medicine.deliveryTime}</span>
                        </span>
                        <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-bold text-gray-700">{medicine.rating}</span>
                        </div>
                      </div>
                      
                      <Link to={`/medicine/${medicine.id}`}>
                        <h3 className="font-bold text-lg text-gray-900 hover:text-blue-600 mb-2 group-hover:text-blue-600 transition-colors duration-200 font-display">
                          {medicine.name}
                        </h3>
                      </Link>
                      
                      <p className="text-gray-600 text-sm mb-3 font-medium font-sans">{medicine.manufacturer}</p>
                      
                      {medicine.prescriptionRequired && (
                        <span className="text-xs bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-1 rounded-full mb-3 inline-block font-bold shadow-lg">
                          Prescription Required
                        </span>
                      )}
                      
                      <div className={`flex ${viewMode === 'list' ? 'flex-col sm:flex-row' : ''} items-${viewMode === 'list' ? 'start' : 'center'} justify-between`}>
                        <div className="mb-2 sm:mb-0">
                          <span className="text-xl font-black text-gray-900">₹{medicine.price}</span>
                          <span className="text-sm text-gray-500 line-through ml-2">₹{medicine.originalPrice}</span>
                          <div className="text-xs text-green-600 font-bold font-mono">
                            {Math.round(((medicine.originalPrice - medicine.price) / medicine.originalPrice) * 100)}% OFF
                          </div>
                        </div>
                        <Button 
                          size="small"
                          onClick={() => handleAddToCart(medicine)}
                          disabled={!medicine.inStock}
                          className="shadow-lg"
                        >
                          {medicine.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                  </Tilt>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineListing;