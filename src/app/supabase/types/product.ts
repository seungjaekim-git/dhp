export interface Application {
  id: number;
  name: string;
  parent_id?: number;
}

export interface Category {
  id: number;
  name: string;
  parent_id?: number;
}

export interface Certification {
  id: number;
  name: string;
}

export interface Feature {
  id: number;
  name: string;
}

export interface DocumentType {
  id: number;
  name: string;
}

export interface Manufacturer {
  id: number;
  name: string;
}

export interface StorageType {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  name: string;
}

export interface FormValues {
  name: string;
  subtitle: string;
  manufacturer_id: string;
  part_number: string;
  specifications: any;
  tables: any[];
  description: string;
  storage_type_id: string;
  categories: string[];
  applications: string[];
  certifications: string[];
  features: string[];
  documents: any[];
  images: any[];
  specificationSchema: string;
  newApplication: string;
  newCertification: string;
  newFeature: string;
}

export const INITIAL_FORM_VALUES: FormValues = {
  name: "",
  subtitle: "",
  manufacturer_id: "",
  part_number: "",
  specifications: {},
  tables: [],
  description: "",
  storage_type_id: "",
  categories: [],
  applications: [],
  certifications: [],
  features: [],
  documents: [],
  images: [],
  specificationSchema: "",
  newApplication: "",
  newCertification: "",
  newFeature: ""
}; 