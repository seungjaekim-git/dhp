'use client';

import { useState } from 'react';
import { Database } from '@/types/supabase';
import { SearchInput } from '@/components/SearchInput';
import { ManufacturerCard } from '@/components/ManufacturerCard';

type Manufacturer = Database['public']['Tables']['manufacturers']['Row'] & {
  led_driver_ic?: Database['public']['Tables']['led_driver_ic']['Row'][];
};

interface LEDDriverICListProps {
  manufacturers: Manufacturer[];
}

export function LEDDriverICList({ manufacturers }: LEDDriverICListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredManufacturers = manufacturers.filter(manufacturer => {
    if (!searchQuery.trim()) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      manufacturer.name.toLowerCase().includes(searchLower) ||
      manufacturer.led_driver_ic?.some(ic => 
        ic.part_number.toLowerCase().includes(searchLower) ||
        ic.description?.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <>
      <div className="mt-12">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search manufacturers or products..."
        />
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredManufacturers.map((manufacturer) => (
          <ManufacturerCard
            key={manufacturer.id}
            manufacturer={manufacturer}
          />
        ))}
      </div>

      {filteredManufacturers.length === 0 && (
        <div className="text-center mt-12">
          <p className="text-gray-500">No manufacturers found matching your search.</p>
        </div>
      )}
    </>
  );
} 