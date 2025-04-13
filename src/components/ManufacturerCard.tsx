'use client';

import { Database } from '@/types/supabase';
import Link from 'next/link';

type Manufacturer = Database['public']['Tables']['manufacturers']['Row'] & {
  led_driver_ic?: Database['public']['Tables']['led_driver_ic']['Row'][];
};

interface ManufacturerCardProps {
  manufacturer: Manufacturer;
}

export function ManufacturerCard({ manufacturer }: ManufacturerCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          {manufacturer.name}
        </h3>
        {manufacturer.description && (
          <p className="mt-2 text-gray-600">{manufacturer.description}</p>
        )}
        {manufacturer.website && (
          <a
            href={manufacturer.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-blue-600 hover:text-blue-800"
          >
            Visit Website
          </a>
        )}
        {manufacturer.led_driver_ic && manufacturer.led_driver_ic.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900">Products:</h4>
            <ul className="mt-2 space-y-1">
              {manufacturer.led_driver_ic.map((ic) => (
                <li key={ic.id} className="text-sm text-gray-600">
                  {ic.part_number}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 