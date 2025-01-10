import { z } from "zod";
import {
  ARRAY_DELIMITER,
  RANGE_DELIMITER,
  SLIDER_DELIMITER,
} from "@/lib/delimiters";


// LED Driver IC 테이블 컬럼 스키마
export const ledDriverICColumnSchema = z.object({
  id: z.number(),
  name: z.string(),
  part_number: z.string(),
  description: z.string(),
  manufacturer: z.object({
    id: z.number(),
    name: z.string()
  }),
  division: z.object({
    id: z.number(), 
    name: z.string()
  }),
  images: z.array(z.object({
    id: z.number(),
    title: z.string(),
    url: z.string(),
    description: z.string().nullable()
  })),
  documents: z.array(z.object({
    document: z.object({
      id: z.number(),
      title: z.string(),
      url: z.string(),
      type: z.string()
    })
  })),
  product_id: z.number(),
  category_id: z.number(),
  subtitle: z.string(),
  number_of_outputs: z.number().nullable(),
  topologies: z.array(z.string()),
  dimming_methods: z.array(z.string()),
  input_voltage_range: z.string().nullable(),
  typical_input_voltage: z.number().nullable(),
  operating_frequency_range: z.string().nullable(),
  typical_operating_frequency: z.number().nullable(),
  output_current_range: z.string().nullable(),
  typical_output_current: z.number().nullable(),
  output_voltage_range: z.string().nullable(),
  typical_output_voltage: z.number().nullable(),
  operating_temperature: z.string().nullable(),
  category_specific_attributes: z.record(z.string(), z.unknown()),
  category: z.object({
    id: z.number(),
    name: z.string()
  }),
  certifications: z.array(z.object({
    certification: z.object({
      id: z.number(),
      name: z.string()
    })
  })),
  features: z.array(z.object({
    id: z.number(),
    name: z.string()
  })),
  applications: z.array(z.object({
    application: z.object({
      id: z.number(),
      name: z.string()
    })
  })),
  options: z.array(z.object({
    id: z.number(),
    notes: z.string().nullable(),
    prices: z.record(z.string(), z.unknown()),
    moq_step: z.number().nullable(),
    moq_start: z.number().nullable(),
    product_id: z.number(),
    option_name: z.string(),
    storage_type: z.string(),
    package_types: z.array(z.object({
      package_type: z.object({
        id: z.number(),
        name: z.string()
      })
    })),
    mounting_style: z.string(),
    package_detail: z.string().nullable(),
    lead_time_range: z.string().nullable()
  }))
});

export type LEDDriverICColumnSchema = z.infer<typeof ledDriverICColumnSchema>;

// LED Driver IC 필터 스키마 
export const LEDDriverICFilterSchema = z.object({
  name: z.string().optional(),
  subtitle: z.string().optional(),
  category: z.string().optional(),
  
  number_of_outputs: z
    .string()
    .transform((val) => val.split(SLIDER_DELIMITER))
    .pipe(z.coerce.number().array().max(2))
    .optional(),
    
  input_voltage_range: z
    .string()
    .transform((val) => val.split(SLIDER_DELIMITER))
    .pipe(z.coerce.number().array().max(2))
    .optional(),
    
  output_current_range: z
    .string()
    .transform((val) => val.split(SLIDER_DELIMITER))
    .pipe(z.coerce.number().array().max(2))
    .optional(),
    
  operating_temperature: z
    .string()
    .transform((val) => val.split(SLIDER_DELIMITER))
    .pipe(z.coerce.number().array().max(2))
    .optional(),
    
  mounting_style: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(z.string().array())
    .optional(),
    
  storage_type: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(z.string().array())
    .optional(),
    
  package_type: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(z.string().array())
    .optional(),
    
  options: z.string().optional(),
    
  topologies: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(z.string().array())
    .optional(),
    
  dimming_methods: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(z.string().array())
    .optional(),
    
  certifications: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(z.string().array())
    .optional(),
    
  applications: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(z.string().array())
    .optional()
});

export type LEDDriverICFilterSchema = z.infer<typeof LEDDriverICFilterSchema>;
