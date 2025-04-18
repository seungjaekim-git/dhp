import { z } from "zod";

// 범위 값을 표현하는 스키마
const RangeSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  typ: z.number().optional(),
  nominal: z.number().optional(),
  tolerance: z.number().optional(),
  unit: z.string(),
  test_condition: z.string().optional(),
  test_current: z.number().optional(),
  pulse: z.boolean().optional(),
  pulse_width: z.string().optional(),
  temperature: z.number().optional(),
  value: z.number().optional(),
  peak: z.number().optional(),
}).partial();

// TVS 다이오드 특성
const TVSCharacteristicsSchema = z.object({
  breakdown_voltage: RangeSchema,
  clamping_voltage: RangeSchema,
  peak_pulse_current: RangeSchema,
}).partial();

// 쇼트키 다이오드 특성
const SchottkyCharacteristicsSchema = z.object({
  barrier_height: RangeSchema,
  forward_voltage_drop: RangeSchema,
}).partial();

// 제너 다이오드 특성
const ZenerCharacteristicsSchema = z.object({
  zener_voltage: RangeSchema,
  zener_impedance: RangeSchema,
}).partial();

// 정류기 다이오드 특성
const RectifierCharacteristicsSchema = z.object({
  average_rectified_current: RangeSchema,
  surge_current: RangeSchema,
}).partial();

// 광학적 특성
const OpticalCharacteristicsSchema = z.object({
  wavelength: RangeSchema,
  luminous_intensity: RangeSchema,
  viewing_angle: RangeSchema,
}).partial();

// 열적 특성
const ThermalCharacteristicsSchema = z.object({
  operating_temperature: RangeSchema,
  storage_temperature: RangeSchema,
  thermal_resistance: z.object({
    junction_to_ambient: z.number().optional(),
    junction_to_case: z.number().optional(),
    unit: z.string(),
  }).partial(),
}).partial();

// 물리적 특성
const PhysicalCharacteristicsSchema = z.object({
  package_type: z.string().optional(),
  mounting_type: z.string().optional(),
  weight: z.object({
    value: z.number().optional(),
    unit: z.string().optional(),
  }).partial(),
  dimensions: z.object({
    length: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    unit: z.string().optional(),
  }).partial(),
}).partial();

// 동적 특성
const SwitchingCharacteristicsSchema = z.object({
  reverse_recovery_time: RangeSchema,
  forward_recovery_time: RangeSchema,
  junction_capacitance: RangeSchema,
}).partial();

// 기타 특성
const AdditionalCharacteristicsSchema = z.object({
  polarity: z.string().optional(),
  configuration: z.string().optional(),
  application_type: z.array(z.string()).optional(),
  features: z.array(z.string()).optional(),
  diode_type: z.string().optional(),
}).partial();

// 다이오드 정보 스키마
export const DiodeInfoSchema = z.object({
  // 전기적 특성
  forward_voltage: RangeSchema,
  forward_current: RangeSchema,
  reverse_voltage: RangeSchema,
  reverse_current: RangeSchema,
  
  // 다이오드 유형별 특성
  tvs_characteristics: TVSCharacteristicsSchema.optional(),
  schottky_characteristics: SchottkyCharacteristicsSchema.optional(),
  zener_characteristics: ZenerCharacteristicsSchema.optional(),
  rectifier_characteristics: RectifierCharacteristicsSchema.optional(),
  optical_characteristics: OpticalCharacteristicsSchema.optional(),
  
  // 열적 특성
  thermal_characteristics: ThermalCharacteristicsSchema,
  
  // 동적 특성
  switching_characteristics: SwitchingCharacteristicsSchema,
  
  // 물리적 특성
  physical_characteristics: PhysicalCharacteristicsSchema,
  
  // 기타 특성
  additional_characteristics: AdditionalCharacteristicsSchema,
}).partial();
