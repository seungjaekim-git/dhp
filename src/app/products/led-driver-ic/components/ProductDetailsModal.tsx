'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Download, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ProductSpec = {
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
};

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
  specifications: ProductSpec;
  product_documents?: Array<{
    document_id: number;
    documents: {
      id: number;
      title: string;
      url: string;
      type_id?: number;
    };
  }>;
};

interface ProductDetailsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailsModal({ product, isOpen, onClose }: ProductDetailsModalProps) {
  const [showFullscreen, setShowFullscreen] = useState(false);
  
  if (!product) return null;
  
  // Get datasheet URL from product_documents or fallback to specifications
  const getDatasheetUrl = () => {
    if (product.product_documents && product.product_documents.length > 0) {
      // Find documents with type_id for datasheets (assuming type_id is used to identify document types)
      // For now, just use the first document
      return product.product_documents[0].documents.url;
    }
    
    // Fallback to specification's datasheet URL
    return product.specifications.datasheet_url;
  };
  
  const datasheet = getDatasheetUrl();

  const toggleFullscreen = () => {
    setShowFullscreen(!showFullscreen);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ${showFullscreen ? 'fixed inset-5 z-50' : 'w-full max-w-5xl'}`}>
                {/* PDF Viewer Header */}
                <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm font-medium truncate max-w-md">
                      {product.name} - Datasheet ({product.part_number})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {datasheet && (
                      <a
                        href={datasheet}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded text-sm font-medium"
                      >
                        <Download className="h-4 w-4 inline mr-1" />
                        Download
                      </a>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={toggleFullscreen}
                      className="text-white hover:bg-gray-700"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={onClose}
                      className="text-white hover:bg-gray-700"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* PDF Viewer Content */}
                <div className={`bg-gray-900 ${showFullscreen ? 'h-[calc(100%-48px)]' : 'h-[70vh]'}`}>
                  {datasheet ? (
                    <iframe 
                      src={datasheet} 
                      className="w-full h-full" 
                      title={`${product.name} Datasheet`}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-white">
                      No datasheet available for this product.
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 