export interface Applications {
    id: number;
    name: string;
    created_at?: string | null;
    updated_at?: string | null;
  }
  
  export interface Categories {
    id: number;
    name: string;
    parent_id?: number | null;
    description?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  }
  
  export interface Certifications {
    id: number;
    name: string;
    description?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  }
  
  export interface Divisions {
    id: number;
    name: string;
    description?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  }
  
  export interface Documents {
    id: number;
    title: string;
    url: string;
    type?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  }
  
  export interface Features {
    id: number;
    name?: string | null;
    description?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  }
  
  export interface Images {
    id: number;
    title?: string | null;
    url: string;
    description?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    product_id?: number | null;
  }
  
  export interface LedDriverIc {
    id: number;
    product_id?: number | null;
    category_id?: number | null;
    subtitle?: string | null;
    number_of_outputs?: number | null;
    topologies?: any[] | null;
    dimming_methods?: any[] | null;
    input_voltage_range?: any | null;
    typical_input_voltage?: number | null;
    operating_frequency_range?: any | null;
    typical_operating_frequency?: number | null;
    output_current_range?: any | null;
    typical_output_current?: number | null;
    output_voltage_range?: any | null;
    typical_output_voltage?: number | null;
    operating_temperature: any;
    category_specific_attributes?: Record<string, unknown> | null;
  }
  
  export interface LedDriverIcApplications {
    id: number;
    led_driver_ic_id?: number | null;
    application_id?: number | null;
  }
  
  export interface LedDriverIcCertifications {
    id: number;
    led_driver_ic_id?: number | null;
    certification_id?: number | null;
  }
  
  export interface LedDriverIcFeatures {
    id: number;
    led_driver_ic_id?: number | null;
    feature_id?: number | null;
  }
  
  export interface LedDriverIcOptionPackageTypes {
    id: number;
    option_id?: number | null;
    package_type_id?: number | null;
  }
  
  export interface LedDriverIcOptions {
    id: number;
    product_id?: number | null;
    option_name: string;
    package_detail?: string | null;
    mounting_style: string;
    storage_type: string;
    notes?: string | null;
    moq_start?: number | null;
    moq_step?: number | null;
    lead_time_range?: any | null;
    prices?: Record<string, unknown> | null;
  }
  
  export interface Manufacturers {
    id: number;
    name: string;
    website?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    division_id?: number | null;
    country?: string | null;
  }
  
  export interface PackageTypes {
    id: number;
    name: string;
    description?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  }
  
  export interface ProductDocuments {
    product_id: number;
    document_id: number;
  }
  
  export interface Products {
    id: number;
    name: string;
    part_number?: string | null;
    manufacturer_id?: number | null;
    division_id?: number | null;
    description?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
  }
  