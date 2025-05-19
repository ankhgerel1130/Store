"use client";

import { useState } from "react";
import Currency from "@/components/ui/currency";
import { Product } from "@/types";
import Button from "./ui/button";
import { ShoppingCart, Ruler, X, ChevronDown, ChevronUp } from "lucide-react";
import useCart from "@/hooks/use-cart";

interface InfoModalProps {
  data: Product;
}

const InfoModal: React.FC<InfoModalProps> = ({ data }) => {
  const cart = useCart();
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    height: '',
    weight: '',
    unit: 'in' // 'in' 'cm'
  });

  const onAddToCart = () => {
    cart.addItem(data);
  };

  const toggleSizeGuide = () => {
    setShowSizeGuide(!showSizeGuide);
  };

  const toggleCalculator = () => {
    setShowCalculator(!showCalculator);
  };

  const handleMeasurementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleUnit = () => {
    setMeasurements(prev => ({
      ...prev,
      unit: prev.unit === 'in' ? 'cm' : 'in'
    }));
  };

  const calculateSize = () => {
    const chestIn = measurements.unit === 'cm' 
      ? parseFloat(measurements.chest) / 2.54 || 0 
      : parseFloat(measurements.chest) || 0;
    
    const waistIn = measurements.unit === 'cm' 
      ? parseFloat(measurements.waist) / 2.54 || 0 
      : parseFloat(measurements.waist) || 0;
    
    const heightIn = measurements.unit === 'cm' 
      ? parseFloat(measurements.height) / 2.54 || 0 
      : parseFloat(measurements.height) || 0;
    
    const weightKg = measurements.unit === 'in' 
      ? parseFloat(measurements.weight) * 0.453592 || 0 
      : parseFloat(measurements.weight) || 0;

    let bmi = 0;
    if (heightIn > 0 && weightKg > 0) {
      const heightM = heightIn * 0.0254;
      bmi = weightKg / (heightM * heightM);
    }

    if (chestIn >= 46 || waistIn >= 40 || (bmi > 30 && bmi !== 0)) return 'XL';
    if (chestIn >= 42 || waistIn >= 36 || (bmi > 27 && bmi !== 0)) return 'L';
    if (chestIn >= 38 || waistIn >= 32 || (bmi > 24 && bmi !== 0)) return 'M';
    if (chestIn >= 34 || waistIn >= 28 || (bmi > 21 && bmi !== 0)) return 'S';
    return 'XS';
  };

  const recommendedSize = showCalculator && 
    (measurements.chest || measurements.waist || measurements.height || measurements.weight) 
    ? calculateSize() 
    : null;

  return (
    <div className="space-y-6 font-sans">
      {/* Product Name & Category */}
      <div className="border-b border-neutral-100 pb-4">
        <p className="text-xs uppercase tracking-widest text-amber-700 font-medium mb-1">
          {data.category.name}
        </p>
        <h2 className="text-3xl font-light tracking-tight text-neutral-900">
          {data.name}
        </h2>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <Currency
          value={data.price}
          className="text-2xl font-medium text-neutral-900"
        />
      </div>

      {/* Size + Size Tools */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-neutral-600">Size:</span>
            <span className="text-sm font-medium text-neutral-900">{data.size.name}</span>
            {recommendedSize && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Recommended: {recommendedSize}
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={toggleCalculator}
              className={`flex items-center gap-1 text-xs transition-colors ${
                showCalculator ? "text-neutral-900" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              {showCalculator ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              Size Calculator
            </button>
            <button
              onClick={toggleSizeGuide}
              className={`flex items-center gap-1 text-xs transition-colors ${
                showSizeGuide ? "text-neutral-900" : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <Ruler size={14} />
              Size Guide
            </button>
          </div>
        </div>

        {/* Neg zereg Display */}
        <div className="space-y-3">
          {/* Size Calculator */}
          {showCalculator && (
            <div className="relative border border-neutral-200 rounded-lg p-4 bg-white shadow-sm">
              <p className="text-sm font-medium text-neutral-900 mb-3">FIND YOUR SIZE</p>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">
                    Chest ({measurements.unit})
                  </label>
                  <input
                    type="number"
                    name="chest"
                    value={measurements.chest}
                    onChange={handleMeasurementChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded text-sm"
                    placeholder={`Chest in ${measurements.unit}`}
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">
                    Waist ({measurements.unit})
                  </label>
                  <input
                    type="number"
                    name="waist"
                    value={measurements.waist}
                    onChange={handleMeasurementChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded text-sm"
                    placeholder={`Waist in ${measurements.unit}`}
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">
                    Height ({measurements.unit})
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={measurements.height}
                    onChange={handleMeasurementChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded text-sm"
                    placeholder={`Height in ${measurements.unit}`}
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-600 mb-1">
                    Weight ({measurements.unit === 'in' ? 'lbs' : 'kg'})
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={measurements.weight}
                    onChange={handleMeasurementChange}
                    className="w-full px-3 py-2 border border-neutral-300 rounded text-sm"
                    placeholder={`Weight in ${measurements.unit === 'in' ? 'lbs' : 'kg'}`}
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <button
                  onClick={toggleUnit}
                  className="text-xs text-neutral-600 hover:text-neutral-900 underline"
                >
                  Switch to {measurements.unit === 'in' ? 'centimeters/kg' : 'inches/lbs'}
                </button>
                
                {(measurements.chest || measurements.waist || measurements.height || measurements.weight) && (
                  <div className="text-xs">
                    <span className="text-neutral-600">Your size: </span>
                    <span className="font-medium">{calculateSize()}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Size Guide Panel */}
          {showSizeGuide && (
            <div className="relative border border-neutral-200 rounded-lg p-4 bg-white shadow-sm">
              <button
                onClick={toggleSizeGuide}
                className="absolute top-2 right-2 p-1 text-neutral-400 hover:text-neutral-600"
              >
                <X size={16} />
              </button>
              <p className="text-sm font-medium text-neutral-900 mb-3">SIZE GUIDE</p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className={`bg-neutral-50 p-2 rounded ${data.size.name === 'XS' ? 'ring-2 ring-amber-500' : ''}`}>
                  <p className="font-medium">XS</p>
                  <p>Chest 30-32"</p>
                  <p>Waist 24-26"</p>
                  <p className="text-neutral-500 mt-1">5'2"-5'5"</p>
                  <p className="text-neutral-500">100-115 lbs</p>
                </div>
                <div className={`bg-neutral-50 p-2 rounded ${data.size.name === 'S' ? 'ring-2 ring-amber-500' : ''}`}>
                  <p className="font-medium">S</p>
                  <p>Chest 34-36"</p>
                  <p>Waist 28-30"</p>
                  <p className="text-neutral-500 mt-1">5'5"-5'8"</p>
                  <p className="text-neutral-500">115-135 lbs</p>
                </div>
                <div className={`bg-neutral-50 p-2 rounded ${data.size.name === 'M' ? 'ring-2 ring-amber-500' : ''}`}>
                  <p className="font-medium">M</p>
                  <p>Chest 38-40"</p>
                  <p>Waist 32-34"</p>
                  <p className="text-neutral-500 mt-1">5'8"-5'11"</p>
                  <p className="text-neutral-500">135-160 lbs</p>
                </div>
                <div className={`bg-neutral-50 p-2 rounded ${data.size.name === 'L' ? 'ring-2 ring-amber-500' : ''}`}>
                  <p className="font-medium">L</p>
                  <p>Chest 42-44"</p>
                  <p>Waist 36-38"</p>
                  <p className="text-neutral-500 mt-1">5'11"-6'2"</p>
                  <p className="text-neutral-500">160-185 lbs</p>
                </div>
                <div className={`bg-neutral-50 p-2 rounded ${data.size.name === 'XL' ? 'ring-2 ring-amber-500' : ''}`}>
                  <p className="font-medium">XL</p>
                  <p>Chest 46-48"</p>
                  <p>Waist 40-42"</p>
                  <p className="text-neutral-500 mt-1">6'2"-6'5"</p>
                  <p className="text-neutral-500">185-220 lbs</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Color */}
       {/* Color */}
    <div className="flex items-center gap-3">
      <span className="text-xs uppercase tracking-wider text-neutral-600">Color:</span>
      <div className="flex items-center gap-2">
        <div
          className="h-5 w-5 rounded-full border border-neutral-200 shadow-sm"
          style={{ backgroundColor: data.color.value }}
        />
        <span className="text-sm text-neutral-700">{data.color.name}</span>
      </div>
    </div>

     {/* New: Description Section */}
     {data.description && (
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-wider text-neutral-600">Description:</span>
        <p className="text-sm text-neutral-700 whitespace-pre-line">
          {data.description}
        </p>
      </div>
    )}

    {/* New: Quality Section */}
{data.quality !== undefined && (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <span className="text-xs uppercase tracking-widest text-neutral-500 font-medium">
        Cashmere Percentage
      </span>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-amber-700">
          {data.quality}/100
        </span>
        <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2 py-1 rounded-full">
          {data.quality >= 90 ? 'Premium Grade' : 
           data.quality >= 75 ? 'Luxury Grade' : 'Standard Grade'}
        </span>
      </div>
    </div>
    
    <div className="relative">
  
      
      {/* Luxury progress bar */}
      <div className="relative h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
      
        <div 
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
          style={{ width: `${data.quality}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"></div>
        </div>
      </div>
      
      {/* Quality markers */}
      <div className="flex justify-between mt-2">
        {[0, 25, 50, 75, 100].map((mark) => (
          <div key={mark} className="relative">
            <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 
              w-0.5 h-2 ${data.quality >= mark ? 'bg-amber-600' : 'bg-neutral-300'}`}></div>
            <span className={`text-[10px] ${data.quality >= mark ? 'text-amber-700 font-medium' : 'text-neutral-400'}`}>
              {mark}
            </span>
          </div>
        ))}
      </div>
    </div>
    
    <p className="text-xs text-neutral-500 italic mt-1">
      {data.quality >= 90 ? 'Exceptional fiber length and softness' :
       data.quality >= 75 ? 'Premium hand-feel with excellent durability' :
       'Quality selection with good characteristics'}
    </p>
  </div>
)}

      {/* Add to Cart */}
      <Button
        onClick={onAddToCart}
        className="w-full bg-neutral-900 hover:bg-neutral-800 text-white py-4 text-sm uppercase tracking-wider rounded-md transition-colors duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
      >
        <ShoppingCart size={18} />
        Add To Cart
      </Button>

      {/* Nemelt Info*/}
      <div className="text-xs text-neutral-500 space-y-1">
        <p className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
          In stock and ready to ship
        </p>
      </div>
    </div>
  );
};

export default InfoModal;