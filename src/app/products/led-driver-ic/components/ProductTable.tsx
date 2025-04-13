'use client';

import Link from 'next/link';
import { BookmarkIcon, DocumentArrowDownIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';

type Product = {
  id: number;
  name: string;
  subtitle: string;
  part_number: string;
  description?: string;
  manufacturers?: {
    id: number;
    name: string;
  };
  specifications: {
    channels?: number | string;
    input_voltage?: {
      min?: number;
      max?: number;
      typ?: number;
      unit?: string;
    };
    output_voltage?: {
      min?: number;
      max?: number;
      typ?: number;
      unit?: string;
      description?: string;
    };
    output_current?: {
      min?: number;
      max?: number;
      typ?: number;
      description?: string;
      unit?: string;
    };
    current_accuracy?: {
      between_ics?: number;
      between_channels?: number;
    };
    operating_temperature?: {
      min?: number;
      max?: number;
      unit?: string;
    };
    package_type?: string;
    thermal_pad?: boolean;
    topology?: string[];
    dimming_method?: string[];
    switching_frequency?: {
      min?: number;
      max?: number;
      typ?: number;
      unit?: string;
    };
    gray_scale_clock_frequency?: {
      min?: number;
      max?: number;
      typ?: number;
      unit?: string;
      description?: string;
    };
    data_clock_frequency?: {
      min?: number;
      max?: number;
      typ?: number;
      unit?: string;
      description?: string;
    };
    supply_package?: string;
    package_case?: string;
    mounting_type?: string;
    internal_switch?: boolean;
    transmission_interface?: {
      topology?: string;
      clock_integrity?: string;
      clock_direction?: string;
      bidirectional?: boolean;
    };
    led_matrix?: {
      max_pixels?: number;
      configuration?: string;
      description?: string;
    };
    communication_interface?: {
      type?: string;
      speed?: number;
      proprietary?: boolean;
      description?: string;
    };
    pwm?: {
      resolution?: string | string[];
      frequency?: number;
      description?: string;
    };
    scan_design?: {
      type?: string;
      max_channels?: number;
      description?: string;
    };
    datasheet_url?: string;
    certifications?: string[];
    applications?: string[];
  };
  images?: Array<{
    id: number;
    url: string;
    title?: string;
    description?: string;
  }>;
};

interface ProductTableProps {
  products: Product[];
  bookmarkedProducts: number[];
  onBookmarkToggle: (productId: number) => void;
  onRowClick: (product: Product) => void;
}

export function ProductTable({ products, bookmarkedProducts, onBookmarkToggle, onRowClick }: ProductTableProps) {
  const formatVoltageValue = (min?: number, max?: number, typ?: number, unit = 'V') => {
    if (typ !== undefined) return `${typ} ${unit}`;
    if (min !== undefined && max !== undefined) return `${min}-${max} ${unit}`;
    if (min !== undefined) return `≥ ${min} ${unit}`;
    if (max !== undefined) return `≤ ${max} ${unit}`;
    return 'N/A';
  };

  const formatCurrentValue = (min?: number, max?: number, typ?: number, unit = 'mA') => {
    if (typ !== undefined) return `${typ} ${unit}`;
    if (min !== undefined && max !== undefined) return `${min}-${max} ${unit}`;
    if (min !== undefined) return `≥ ${min} ${unit}`;
    if (max !== undefined) return `≤ ${max} ${unit}`;
    return 'N/A';
  };

  const formatFrequencyValue = (min?: number, max?: number, typ?: number, unit = 'kHz') => {
    if (typ !== undefined) return `${typ} ${unit}`;
    if (min !== undefined && max !== undefined) return `${min}-${max} ${unit}`;
    if (min !== undefined) return `≥ ${min} ${unit}`;
    if (max !== undefined) return `≤ ${max} ${unit}`;
    return 'N/A';
  };

  const formatArray = (arr?: string[]) => {
    if (!arr || !Array.isArray(arr)) return 'N/A';
    return arr.join(', ');
  };

  const formatBoolean = (value?: boolean) => {
    if (value === undefined) return 'N/A';
    return value ? 'Yes' : 'No';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Manufacturer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Topology
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Input Voltage
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Output Voltage
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Output Current
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Channels
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Package
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Switching Freq
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dimming
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map(product => (
            <tr 
              key={product.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onRowClick(product)}
            >
              <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center">
                  <div className="ml-4">
                    <Link href={`/products/led-driver-ic/${product.id}`}>
                      <div className="text-sm font-medium text-blue-600 hover:underline">{product.name}</div>
                    </Link>
                    <div className="text-sm text-gray-500">{product.part_number}</div>
                    {product.subtitle && (
                      <div className="text-xs text-gray-500">{product.subtitle}</div>
                    )}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                {product.manufacturers && (
                  <Link href={`/manufacturers/${product.manufacturers.id}`}>
                    <div className="text-sm text-blue-600 hover:underline">{product.manufacturers.name}</div>
                  </Link>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatArray(product.specifications?.topology)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatVoltageValue(
                    product.specifications?.input_voltage?.min,
                    product.specifications?.input_voltage?.max,
                    product.specifications?.input_voltage?.typ,
                    product.specifications?.input_voltage?.unit
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatVoltageValue(
                    product.specifications?.output_voltage?.min,
                    product.specifications?.output_voltage?.max,
                    product.specifications?.output_voltage?.typ,
                    product.specifications?.output_voltage?.unit
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatCurrentValue(
                    product.specifications?.output_current?.min,
                    product.specifications?.output_current?.max,
                    product.specifications?.output_current?.typ,
                    product.specifications?.output_current?.unit
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.specifications?.channels || 'N/A'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{product.specifications?.package_type || 'N/A'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {formatFrequencyValue(
                    product.specifications?.switching_frequency?.min,
                    product.specifications?.switching_frequency?.max,
                    product.specifications?.switching_frequency?.typ,
                    product.specifications?.switching_frequency?.unit
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{formatArray(product.specifications?.dimming_method)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookmarkToggle(product.id);
                    }}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    {bookmarkedProducts.includes(product.id) ? (
                      <BookmarkSolidIcon className="h-5 w-5 text-blue-600" />
                    ) : (
                      <BookmarkIcon className="h-5 w-5" />
                    )}
                  </button>
                  <a
                    href={product.specifications?.datasheet_url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-900"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DocumentArrowDownIcon className="h-5 w-5" />
                  </a>
                  <button 
                    className="text-blue-600 hover:text-blue-900"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ShoppingCartIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 