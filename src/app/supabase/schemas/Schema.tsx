import { z } from "zod";

import { LEDDriverICInfoSchema, ElectricalCharacteristicsSchema, MaximumRatingsSchema, PackagingInfoSchema } from "./LEDDriverIC";

// 기본 단위 스키마 정의
const VoltageUnitSchema = z.literal("V").describe('전압 단위');
const CurrentUnitSchema = z.literal("A").describe('전류 단위');
const FrequencyUnitSchema = z.literal("Hz").describe('주파수 단위');
const TemperatureUnitSchema = z.literal("°C").describe('온도 단위');
const CapacitanceUnitSchema = z.literal("F").describe('전기용량 단위');
const ResistanceUnitSchema = z.literal("Ω").describe('저항 단위');
const TimeUnitSchema = z.literal("s").describe('시간 단위');
const PowerUnitSchema = z.literal("W").describe('전력 단위');
const LengthUnitSchema = z.literal("mm").describe('길이 단위');
const MemoryUnitSchema = z.literal("KB").describe('메모리 단위');   
const PressureUnitSchema = z.literal("Pa").describe('압력 단위');
const ImpedanceUnitSchema = z.literal("Ω").describe('임피던스 단위');

// 공통 범위 스키마 정의
const RangeSchema = <T extends z.ZodTypeAny>(valueType: T, unit: z.ZodLiteral<string>) => 
  z.object({
    min: valueType.nullable(),
    max: valueType.nullable(),
    typ: valueType.nullable(),
    unit: unit
  }).refine((range) => !range.min || !range.max || range.min <= range.max, {
    message: '최소값은 최대값보다 클 수 없습니다.'
  });

// 공통 값 스키마 정의
const ValueSchema = <T extends z.ZodTypeAny>(valueType: T, unit: z.ZodLiteral<string>) =>
  z.object({
    value: valueType.nullable(),
    unit: unit
  });

// 기본 전자부품 스키마 (최상위)
export const BaseComponentSchema = z.object({
  manufacturer: z.string().describe('제조사'),
  part_number: z.string().describe('부품번호'),
  description: z.string().nullable().describe('설명'),
  datasheet_url: z.string().url().nullable().describe('데이터시트 URL'),
}).describe('기본 전자부품 사양');

// LED 드라이버 IC 스키마
export const LEDDriverICSchema = BaseComponentSchema.extend({
  ...LEDDriverICInfoSchema.shape,
  ...ElectricalCharacteristicsSchema.shape,
  ...MaximumRatingsSchema.shape,
  ...PackagingInfoSchema.shape
}).describe('LED 드라이버 IC 사양');

// 일반 IC 스키마 
export const ICSchema = BaseComponentSchema.extend({
  supply_voltage: RangeSchema(z.number(), VoltageUnitSchema).describe('공급 전압 범위'),
  operating_frequency: ValueSchema(z.number(), FrequencyUnitSchema).describe('동작 주파수'),
  power_consumption: ValueSchema(z.number(), PowerUnitSchema).describe('소비 전력'),
  logic_family: z.string().nullable().describe('로직 패밀리'),
  interface: z.array(z.string()).describe('인터페이스 유형')
}).describe('IC 사양');

// 다이오드 스키마
export const DiodeSchema = BaseComponentSchema.extend({
  forward_voltage: ValueSchema(z.number(), VoltageUnitSchema).describe('순방향 전압'),
  reverse_voltage: ValueSchema(z.number(), VoltageUnitSchema).describe('역방향 전압'),
  forward_current: ValueSchema(z.number(), CurrentUnitSchema).describe('순방향 전류'),
  reverse_current: ValueSchema(z.number(), CurrentUnitSchema).describe('역방향 전류'),
  recovery_time: ValueSchema(z.number(), TimeUnitSchema).nullable().describe('회복 시간')
}).describe('다이오드 사양');

// 센서 스키마
export const SensorSchema = BaseComponentSchema.extend({
  sensor_type: z.string().describe('센서 유형'),
  measurement_range: z.string().describe('측정 범위'),
  accuracy: z.string().describe('정확도'),
  response_time: ValueSchema(z.number(), TimeUnitSchema).describe('응답 시간'),
  output_type: z.string().describe('출력 신호 유형')
}).describe('센서 사양');

// 케이블 스키마
export const CableSchema = z.object({
  cable_type: z.string().describe('케이블 유형'),
  conductor_material: z.string().describe('도체 재질'),
  insulation_material: z.string().describe('절연체 재질'),
  wire_gauge: z.string().describe('전선 규격 (AWG/mm²)'),
  voltage_rating: ValueSchema(z.number(), VoltageUnitSchema).describe('정격 전압'),
  current_rating: ValueSchema(z.number(), CurrentUnitSchema).describe('정격 전류'),
  temperature_rating: ValueSchema(z.number(), TemperatureUnitSchema).describe('사용 온도 범위'),
  shielding_type: z.string().optional().describe('차폐 유형'),
  outer_diameter: ValueSchema(z.number(), LengthUnitSchema).describe('외경')
}).describe('케이블 사양');

// 커넥터 스키마
export const ConnectorSchema = z.object({
  connector_type: z.string().describe('커넥터 유형'),
  pin_count: z.number().describe('핀 수'),
  gender: z.enum(['male', 'female']).describe('성별'),
  contact_material: z.string().describe('접점 재질'),
  housing_material: z.string().describe('하우징 재질'),
  current_rating: ValueSchema(z.number(), CurrentUnitSchema).describe('정격 전류'),
  voltage_rating: ValueSchema(z.number(), VoltageUnitSchema).describe('정격 전압'),
  protection_rating: z.string().describe('보호 등급 (IP)'),
  mating_cycles: z.number().describe('체결 수명')
}).describe('커넥터 사양');

// 기타 부품 스키마
export const OtherComponentSchema = BaseComponentSchema.extend({
  component_type: z.string().describe('부품 유형'),
  specifications: z.record(z.string()).describe('세부 사양'),
  features: z.array(z.string()).describe('주요 기능')
}).describe('기타 부품 사양');

// Linear Regulator LED Drirver IC 스키마
export const LinearRegulatorLEDDriverICSchema = LEDDriverICSchema.extend({
  test: z.string().describe('테스트'),
}).describe('선형 리그레이터 LED 드라이버 IC 사양');

// Mini-/Micro LED Driver IC 스키마
export const MiniMicroLEDDriverICSchema = LEDDriverICSchema.extend({
  pixel_count: z.number().min(1).describe('픽셀 수'),
  scan_mode: z.enum(['Static', 'Dynamic']).describe('스캔 모드'),
  grayscale_bits: z.number().min(8).max(16).describe('그레이스케일 비트 수'),
  current_accuracy: z.number().describe('전류 정확도 (%)'),
  minimum_pulse_width: ValueSchema(z.number(), TimeUnitSchema).describe('최소 펄스 폭')
}).describe('Mini-/Micro LED 드라이버 IC 사양');

// SRAM Embedded LED Driver IC 스키마 
export const SRAMEmbeddedLEDDriverICSchema = LEDDriverICSchema.extend({
  memory_size: z.number().describe('내장 SRAM 크기 (Kb)'),
  refresh_rate: ValueSchema(z.number(), FrequencyUnitSchema).describe('리프레시 레이트'),
  gamma_correction: z.boolean().describe('감마 보정 지원 여부'),
  frame_rate: ValueSchema(z.number(), FrequencyUnitSchema).describe('프레임 레이트')
}).describe('SRAM 내장형 LED 드라이버 IC 사양');

// S-PWM LED Driver IC 스키마
export const SPWMLEDDriverICSchema = LEDDriverICSchema.extend({
  pwm_frequency: ValueSchema(z.number(), FrequencyUnitSchema).describe('PWM 주파수'),
  spread_spectrum: z.boolean().describe('스펙트럼 확산 지원 여부'),
  phase_shift: z.number().describe('위상 시프트 (도)'),
  duty_cycle_range: RangeSchema(z.number(), z.literal('%')).describe('듀티 사이클 범위')
}).describe('S-PWM LED 드라이버 IC 사양');

// Multi-Function LED Driver IC 스키마
export const MultiFunctionLEDDriverICSchema = LEDDriverICSchema.extend({
  protection_features: z.array(z.string()).describe('보호 기능 목록'),
  communication_interfaces: z.array(z.string()).describe('통신 인터페이스'),
  diagnostic_features: z.array(z.string()).describe('진단 기능'),
  programmable_parameters: z.array(z.string()).describe('프로그래머블 파라미터')
}).describe('다기능 LED 드라이버 IC 사양');

// Classic LED Driver IC 스키마
export const ClassicLEDDriverICSchema = LEDDriverICSchema.extend({
  topology: z.enum(['Buck', 'Boost', 'Buck-Boost']).describe('토폴로지'),
  efficiency: z.number().min(0).max(100).describe('효율 (%)'),
  switching_frequency: ValueSchema(z.number(), FrequencyUnitSchema).describe('스위칭 주파수')
}).describe('클래식 LED 드라이버 IC 사양');

// Lighting LED Driver IC I 스키마
export const LightingLEDDriverICISchema = LEDDriverICSchema.extend({
  power_factor: z.number().min(0).max(1).describe('역률'),
  thd: z.number().describe('총 고조파 왜곡 (%)'),
  dimming_range: RangeSchema(z.number(), z.literal('%')).describe('디밍 범위'),
  isolation: z.boolean().describe('절연 여부')
}).describe('조명용 LED 드라이버 IC I 사양');

// Lighting LED Driver IC II 스키마
export const LightingLEDDriverICIISchema = LEDDriverICSchema.extend({
  power_factor: z.number().min(0).max(1).describe('역률'),
  thd: z.number().describe('총 고조파 왜곡 (%)'),
  dimming_range: RangeSchema(z.number(), z.literal('%')).describe('디밍 범위'),
  isolation: z.boolean().describe('절연 여부'),
  fald_support: z.boolean().describe('FALD 지원 여부'),
  zone_count: z.number().nullable().describe('로컬 디밍 존 수')
}).describe('조명용 LED 드라이버 IC II 사양');

// FALD Backlight LED Driver IC 스키마
export const FALDBacklightLEDDriverICSchema = LEDDriverICSchema.extend({
  zone_count: z.number().min(1).describe('로컬 디밍 존 수'),
  contrast_ratio: z.string().describe('명암비'),
  hdr_support: z.boolean().describe('HDR 지원 여부'),
  scanning_frequency: ValueSchema(z.number(), FrequencyUnitSchema).describe('스캐닝 주파수'),
  zone_control: z.enum(['Independent', 'Group', 'Matrix']).describe('존 제어 방식')
}).describe('FALD 백라이트 LED 드라이버 IC 사양');

// Interactive Display LED Driver IC 스키마
export const InteractiveDisplayLEDDriverICSchema = LEDDriverICSchema.extend({
  touch_detection: z.boolean().describe('터치 감지 지원'),
  sensing_channels: z.number().nullable().describe('센싱 채널 수'),
  response_time: ValueSchema(z.number(), TimeUnitSchema).describe('응답 시간'),
  noise_immunity: z.string().describe('노이즈 내성 레벨'),
  detection_modes: z.array(z.string()).describe('감지 모드')
}).describe('인터랙티브 디스플레이 LED 드라이버 IC 사양');

// RGB LED Driver IC 스키마
export const RGBLEDDriverICSchema = LEDDriverICSchema.extend({
  color_channels: z.literal(3).describe('RGB 채널 수'),
  color_depth: z.number().describe('컬러 뎁스 (비트)'),
  color_calibration: z.boolean().describe('컬러 캘리브레이션 지원'),
  independent_channel_control: z.boolean().describe('독립 채널 제어'),
  color_mixing: z.boolean().describe('컬러 믹싱 지원')
}).describe('RGB LED 드라이버 IC 사양');

// AMUSE LED Driver IC 스키마
export const AMUSELEDDriverICSchema = LEDDriverICSchema.extend({
  animation_support: z.boolean().describe('애니메이션 지원'),
  pattern_memory: z.number().describe('패턴 메모리 크기 (KB)'),
  synchronization: z.boolean().describe('다중 IC 동기화 지원'),
  effect_types: z.array(z.string()).describe('지원 이펙트 종류'),
  programmable_sequences: z.number().describe('프로그래머블 시퀀스 수')
}).describe('AMUSE LED 드라이버 IC 사양');

// DC/DC Converter LED Driver IC 스키마
export const DCDCConverterLEDDriverICSchema = LEDDriverICSchema.extend({
  topology: z.enum(['Buck', 'Boost', 'Buck-Boost']).describe('토폴로지'),
  input_voltage: RangeSchema(z.number(), VoltageUnitSchema).describe('입력 전압 범위'),
  output_voltage: RangeSchema(z.number(), VoltageUnitSchema).describe('출력 전압 범위'), 
  switching_frequency: ValueSchema(z.number(), FrequencyUnitSchema).describe('스위칭 주파수'),
  efficiency: z.number().min(0).max(100).describe('효율 (%)'),
  feedback_type: z.enum(['Voltage Mode', 'Current Mode']).describe('피드백 방식'),
  protection_features: z.array(z.string()).describe('보호 기능'),
  soft_start: ValueSchema(z.number(), TimeUnitSchema).describe('소프트 스타트 시간')
}).describe('DC/DC 컨버터 LED 드라이버 IC 사양');


// DC/DC Controller LED Driver IC 스키마
export const DCDCControllerLEDDriverICSchema = LEDDriverICSchema.extend({
  control_method: z.enum(['PWM', 'PFM', 'Hybrid']).describe('제어 방식'),
  compensation_type: z.enum(['Type I', 'Type II', 'Type III']).describe('보상 타입'),
  loop_bandwidth: ValueSchema(z.number(), FrequencyUnitSchema).describe('루프 대역폭'),
  phase_margin: z.number().min(0).max(180).describe('위상 마진 (도)'),
  gain_margin: z.number().describe('이득 마진 (dB)'),
  transient_response: ValueSchema(z.number(), TimeUnitSchema).describe('과도 응답 시간'),
  regulation_accuracy: z.number().min(0).max(100).describe('레귤레이션 정확도 (%)'),
  control_interface: z.enum(['I2C', 'SPI', 'Analog']).describe('제어 인터페이스')
}).describe('DC/DC 컨트롤러 LED 드라이버 IC 사양');

// PMIC 스키마
export const PMICSchema = LEDDriverICSchema.extend({
  input_voltage_range: RangeSchema(z.number(), VoltageUnitSchema).describe('입력 전압 범위'),
  output_channels: z.number().describe('출력 채널 수'),
  output_voltage_accuracy: z.number().describe('출력 전압 정확도 (%)'),
  protection_features: z.array(z.string()).describe('보호 기능'),
  thermal_shutdown: z.number().describe('열 차단 온도 (°C)'),
  soft_start: z.boolean().describe('소프트 스타트 지원'),
  power_good: z.boolean().describe('파워 구드 신호 지원'),
  efficiency: z.number().min(0).max(100).describe('효율 (%)')
}).describe('전원 관리 IC 사양');

// 마이크로컨트롤러 스키마 
export const MicrocontrollerSchema = LEDDriverICSchema.extend({
  cpu_architecture: z.string().describe('CPU 아키텍처'),
  cpu_speed: ValueSchema(z.number(), FrequencyUnitSchema).describe('CPU 속도'),
  memory_size: z.object({
    flash: ValueSchema(z.number(), MemoryUnitSchema).describe('플래시 메모리'),
    ram: ValueSchema(z.number(), MemoryUnitSchema).describe('RAM'),
  }).describe('메모리 크기'),
  peripherals: z.array(z.string()).describe('내장 주변장치'),
  gpio_count: z.number().describe('GPIO 핀 수'),
  adc_channels: z.number().describe('ADC 채널 수'),
  communication_interfaces: z.array(z.string()).describe('통신 인터페이스')
}).describe('마이크로컨트롤러 사양');

// ASIC 스키마
export const ASICSchema = LEDDriverICSchema.extend({
  process_node: ValueSchema(z.number(), z.literal('nm')).describe('공정 노드'),
  gate_count: z.number().describe('게이트 수'),
  power_consumption: ValueSchema(z.number(), PowerUnitSchema).describe('소비 전력'),
  application_specific_features: z.array(z.string()).describe('특화 기능'),
  design_methodology: z.string().describe('설계 방법론'),
  ip_cores: z.array(z.string()).describe('IP 코어')
}).describe('ASIC 사양');

// FPGA 스키마
export const FPGASchema = LEDDriverICSchema.extend({
  logic_elements: z.number().describe('로직 엘리먼트 수'),
  memory_blocks: ValueSchema(z.number(), MemoryUnitSchema).describe('메모리 블록'),
  dsp_blocks: z.number().describe('DSP 블록 수'),
  io_pins: z.number().describe('I/O 핀 수'),
  clock_regions: z.number().describe('클럭 영역 수'),
  configuration_memory: ValueSchema(z.number(), MemoryUnitSchema).describe('구성 메모리'),
  programming_interface: z.array(z.string()).describe('프로그래밍 인터페이스')
}).describe('FPGA 사양');

// 증폭기 IC 스키마
export const AmplifierICSchema = LEDDriverICSchema.extend({
  gain_bandwidth: ValueSchema(z.number(), FrequencyUnitSchema).describe('이득 대역폭'),
  input_offset_voltage: ValueSchema(z.number(), VoltageUnitSchema).describe('입력 오프셋 전압'),
  input_impedance: ValueSchema(z.number(), ImpedanceUnitSchema).describe('입력 임피던스'),
  output_impedance: ValueSchema(z.number(), ImpedanceUnitSchema).describe('출력 임피던스'),
  slew_rate: ValueSchema(z.number(), z.literal('V/µs')).describe('슬루율'),
  cmrr: ValueSchema(z.number(), z.literal('dB')).describe('공통 모드 제거비'),
  psrr: ValueSchema(z.number(), z.literal('dB')).describe('전원 제거비'),
  thd: z.number().min(0).max(100).describe('전고조파 왜곡 (%)'),
  noise_figure: ValueSchema(z.number(), z.literal('dB')).describe('잡음 지수'),
  output_current_capability: ValueSchema(z.number(), CurrentUnitSchema).describe('출력 전류 용량')
}).describe('증폭기 IC 사양');

// ADC IC 스키마
export const ADCSchema = LEDDriverICSchema.extend({
  resolution: z.number().describe('해상도 (비트)'),
  sampling_rate: ValueSchema(z.number(), FrequencyUnitSchema).describe('샘플링 속도'),
  input_channels: z.number().describe('입력 채널 수'),
  input_type: z.enum(['Single-ended', 'Differential']).describe('입력 타입'),
  reference_voltage: ValueSchema(z.number(), VoltageUnitSchema).describe('기준 전압'),
  snr: ValueSchema(z.number(), z.literal('dB')).describe('신호 대 잡음비'),
  enob: z.number().describe('유효 비트 수'),
  latency: ValueSchema(z.number(), TimeUnitSchema).describe('지연 시간')
}).describe('ADC IC 사양');

// DAC IC 스키마
export const DACSchema = LEDDriverICSchema.extend({
  resolution: z.number().describe('해상도 (비트)'),
  update_rate: ValueSchema(z.number(), FrequencyUnitSchema).describe('갱신 속도'),
  output_channels: z.number().describe('출력 채널 수'),
  output_type: z.enum(['Voltage', 'Current']).describe('출력 타입'),
  reference_voltage: ValueSchema(z.number(), VoltageUnitSchema).describe('기준 전압'),
  dnl: z.number().describe('차분 비선형성 (LSB)'),
  inl: z.number().describe('적분 비선형성 (LSB)'),
  settling_time: ValueSchema(z.number(), TimeUnitSchema).describe('정착 시간')
}).describe('DAC IC 사양');

// 메모리 IC 스키마
export const MemoryICSchema = LEDDriverICSchema.extend({
  capacity: ValueSchema(z.number(), MemoryUnitSchema).describe('저장 용량'),
  access_time: ValueSchema(z.number(), TimeUnitSchema).describe('접근 시간'),
  read_cycle_time: ValueSchema(z.number(), TimeUnitSchema).describe('읽기 사이클 시간'),
  write_cycle_time: ValueSchema(z.number(), TimeUnitSchema).describe('쓰기 사이클 시간'),
  data_width: z.number().describe('데이터 폭 (비트)'),
  address_width: z.number().describe('주소 폭 (비트)'),
  endurance: z.number().describe('내구성 (사이클)'),
  retention_time: ValueSchema(z.number(), TimeUnitSchema).describe('데이터 유지 시간')
}).describe('메모리 IC 사양');

// Flash 메모리 IC 스키마 
export const FlashMemoryICSchema = MemoryICSchema.extend({
  erase_time: ValueSchema(z.number(), TimeUnitSchema).describe('소거 시간'),
  program_time: ValueSchema(z.number(), TimeUnitSchema).describe('프로그램 시간'),
  erase_block_size: ValueSchema(z.number(), MemoryUnitSchema).describe('소거 블록 크기'),
  page_size: ValueSchema(z.number(), MemoryUnitSchema).describe('페이지 크기'),
  interface_type: z.enum(['SPI', 'I2C', 'Parallel']).describe('인터페이스 타입')
}).describe('플래시 메모리 IC 사양');

// SRAM IC 스키마
export const SRAMICSchema = MemoryICSchema.extend({
  standby_current: ValueSchema(z.number(), CurrentUnitSchema).describe('대기 전류'),
  active_power: ValueSchema(z.number(), PowerUnitSchema).describe('동작 전력'),
  interface_type: z.enum(['Async', 'Sync']).describe('인터페이스 타입')
}).describe('SRAM IC 사양');

// DRAM IC 스키마 
export const DRAMICSchema = MemoryICSchema.extend({
  refresh_rate: ValueSchema(z.number(), FrequencyUnitSchema).describe('리프레시 속도'),
  refresh_current: ValueSchema(z.number(), CurrentUnitSchema).describe('리프레시 전류'),
  row_address_strobe: ValueSchema(z.number(), TimeUnitSchema).describe('행 주소 스트로브 시간'),
  column_address_strobe: ValueSchema(z.number(), TimeUnitSchema).describe('열 주소 스트로브 시간'),
  interface_type: z.enum(['SDR', 'DDR', 'DDR2', 'DDR3', 'DDR4', 'DDR5']).describe('인터페이스 타입')
}).describe('DRAM IC 사양');

// MOSFET 스키마
export const MOSFETSchema = ICSchema.extend({
  drain_source_voltage: ValueSchema(z.number(), VoltageUnitSchema).describe('드레인-소스 전압'),
  gate_source_voltage: ValueSchema(z.number(), VoltageUnitSchema).describe('게이트-소스 전압'),
  drain_current: ValueSchema(z.number(), CurrentUnitSchema).describe('드레인 전류'),
  gate_threshold_voltage: ValueSchema(z.number(), VoltageUnitSchema).describe('게이트 임계 전압'),
  input_capacitance: ValueSchema(z.number(), CapacitanceUnitSchema).describe('입력 커패시턴스'),
  output_capacitance: ValueSchema(z.number(), CapacitanceUnitSchema).describe('출력 커패시턴스'),
  rds_on: ValueSchema(z.number(), ResistanceUnitSchema).describe('온-저항'),
  switching_speed: ValueSchema(z.number(), FrequencyUnitSchema).describe('스위칭 속도')
}).describe('MOSFET 사양');

// N-채널 MOSFET 스키마
export const NChannelMOSFETSchema = MOSFETSchema.extend({
  channel_type: z.literal('N-Channel').describe('채널 타입'),
  body_diode: z.boolean().describe('바디 다이오드 내장 여부'),
  esd_protection: z.boolean().describe('ESD 보호 기능 여부')
}).describe('N-채널 MOSFET 사양');

// P-채널 MOSFET 스키마
export const PChannelMOSFETSchema = MOSFETSchema.extend({
  channel_type: z.literal('P-Channel').describe('채널 타입'),
  body_diode: z.boolean().describe('바디 다이오드 내장 여부'),
  esd_protection: z.boolean().describe('ESD 보호 기능 여부')
}).describe('P-채널 MOSFET 사양');

// 슈퍼 정션 MOSFET 스키마
export const SuperJunctionMOSFETSchema = MOSFETSchema.extend({
  breakdown_voltage: ValueSchema(z.number(), VoltageUnitSchema).describe('항복 전압'),
  figure_of_merit: z.number().describe('성능 지수'),
  qg_total: ValueSchema(z.number(), CapacitanceUnitSchema).describe('총 게이트 전하량')
}).describe('슈퍼 정션 MOSFET 사양');

// IGBT 스키마
export const IGBTSchema = MOSFETSchema.extend({
  collector_emitter_voltage: ValueSchema(z.number(), VoltageUnitSchema).describe('컬렉터-이미터 전압'),
  collector_current: ValueSchema(z.number(), CurrentUnitSchema).describe('컬렉터 전류'),
  saturation_voltage: ValueSchema(z.number(), VoltageUnitSchema).describe('포화 전압'),
  tail_current: ValueSchema(z.number(), CurrentUnitSchema).describe('테일 전류'),
  short_circuit_withstand: ValueSchema(z.number(), TimeUnitSchema).describe('단락 내량 시간')
}).describe('IGBT 사양');


// 정류 다이오드 스키마
export const RectifierDiodeSchema = DiodeSchema.extend({
  forward_voltage: ValueSchema(z.number(), VoltageUnitSchema).describe('순방향 전압'),
  reverse_recovery_time: ValueSchema(z.number(), TimeUnitSchema).describe('역회복 시간'),
  surge_current: ValueSchema(z.number(), CurrentUnitSchema).describe('서지 전류'),
  leakage_current: ValueSchema(z.number(), CurrentUnitSchema).describe('누설 전류')
}).describe('정류 다이오드 사양');

// 제너 다이오드 스키마
export const ZenerDiodeSchema = DiodeSchema.extend({
  zener_voltage: ValueSchema(z.number(), VoltageUnitSchema).describe('제너 전압'),
  zener_impedance: ValueSchema(z.number(), ResistanceUnitSchema).describe('제너 임피던스'),
  temperature_coefficient: z.number().describe('온도 계수 (%/°C)'),
  power_rating: ValueSchema(z.number(), PowerUnitSchema).describe('정격 전력')
}).describe('제너 다이오드 사양');

// 쇼트키 다이오드 스키마
export const SchottkyDiodeSchema = DiodeSchema.extend({
  forward_voltage_drop: ValueSchema(z.number(), VoltageUnitSchema).describe('순방향 전압 강하'),
  reverse_leakage: ValueSchema(z.number(), CurrentUnitSchema).describe('역방향 누설 전류'),
  junction_capacitance: ValueSchema(z.number(), CapacitanceUnitSchema).describe('접합 용량'),
  switching_speed: ValueSchema(z.number(), FrequencyUnitSchema).describe('스위칭 속도')
}).describe('쇼트키 다이오드 사양');

// TVS 다이오드 스키마
export const TVSDiodeSchema = DiodeSchema.extend({
  breakdown_voltage: ValueSchema(z.number(), VoltageUnitSchema).describe('항복 전압'),
  clamping_voltage: ValueSchema(z.number(), VoltageUnitSchema).describe('클램핑 전압'),
  peak_pulse_current: ValueSchema(z.number(), CurrentUnitSchema).describe('피크 펄스 전류'),
  response_time: ValueSchema(z.number(), TimeUnitSchema).describe('응답 시간')
}).describe('TVS 다이오드 사양');

// PIR 센서 스키마
export const PIRSensorSchema = SensorSchema.extend({
  detection_range: ValueSchema(z.number(), LengthUnitSchema).describe('감지 범위'),
  detection_angle: z.number().describe('감지 각도 (도)'),
  response_time: ValueSchema(z.number(), TimeUnitSchema).describe('응답 시간'),
  trigger_mode: z.enum(['Retriggering', 'Non-retriggering']).describe('트리거 모드')
}).describe('PIR 센서 사양');

// 온도 센서 스키마
export const TemperatureSensorSchema = SensorSchema.extend({
  temperature_range: RangeSchema(z.number(), TemperatureUnitSchema).describe('온도 측정 범위'),
  accuracy: z.number().describe('정확도 (±°C)'),
  response_time: ValueSchema(z.number(), TimeUnitSchema).describe('응답 시간'),
  self_heating: z.number().describe('자체 발열 (°C/mW)')
}).describe('온도 센서 사양');

// 습도 센서 스키마
export const HumiditySensorSchema = SensorSchema.extend({
  humidity_range: RangeSchema(z.number(), z.literal('%RH')).describe('습도 측정 범위'),
  accuracy: z.number().describe('정확도 (±%RH)'),
  response_time: ValueSchema(z.number(), TimeUnitSchema).describe('응답 시간'),
  hysteresis: z.number().describe('히스테리시스 (%RH)')
}).describe('습도 센서 사양');

// 압력 센서 스키마
export const PressureSensorSchema = SensorSchema.extend({
  pressure_range: RangeSchema(z.number(), PressureUnitSchema).describe('압력 측정 범위'),
  accuracy: z.number().describe('정확도 (%)'),
  response_time: ValueSchema(z.number(), TimeUnitSchema).describe('응답 시간'),
  overload_pressure: ValueSchema(z.number(), PressureUnitSchema).describe('과부하 압력')
}).describe('압력 센서 사양');

// 근접 센서 스키마
export const ProximitySensorSchema = SensorSchema.extend({
  sensing_distance: ValueSchema(z.number(), LengthUnitSchema).describe('감지 거리'),
  hysteresis: z.number().describe('히스테리시스 (%)'),
  response_frequency: ValueSchema(z.number(), FrequencyUnitSchema).describe('응답 주파수'),
  target_material: z.array(z.string()).describe('감지 가능 물체')
}).describe('근접 센서 사양');

// 조도 센서 스키마
export const LightSensorSchema = SensorSchema.extend({
  spectral_range: RangeSchema(z.number(), z.literal('nm')).describe('분광 범위'),
  sensitivity: ValueSchema(z.number(), z.literal('mV/(µW/cm²)')).describe('감도'),
  dark_current: ValueSchema(z.number(), CurrentUnitSchema).describe('암전류'),
  response_time: ValueSchema(z.number(), TimeUnitSchema).describe('응답 시간')
}).describe('조도 센서 사양');

// 가스 센서 스키마
export const GasSensorSchema = SensorSchema.extend({
  gas_type: z.array(z.string()).describe('검출 가능 가스'),
  detection_range: RangeSchema(z.number(), z.literal('ppm')).describe('검출 범위'),
  response_time: ValueSchema(z.number(), TimeUnitSchema).describe('응답 시간'),
  sensitivity: z.number().describe('감도 (ppm)'),
  cross_sensitivity: z.array(z.string()).describe('교차 감도'),
  warm_up_time: ValueSchema(z.number(), TimeUnitSchema).describe('예열 시간')
}).describe('가스 센서 사양');


// 전원 케이블 스키마 
export const PowerCableSchema = CableSchema.extend({
  conductor_count: z.number().describe('도체 수'),
  power_rating: ValueSchema(z.number(), z.literal('W')).describe('전력 용량'),
  ground_wire: z.boolean().describe('접지선 포함 여부')
}).describe('전원 케이블 사양');

// 신호 케이블 스키마
export const SignalCableSchema = CableSchema.extend({
  signal_type: z.string().describe('신호 유형'),
  impedance: ValueSchema(z.number(), z.literal('Ω')).describe('임피던스'),
  bandwidth: ValueSchema(z.number(), FrequencyUnitSchema).describe('대역폭'),
  attenuation: z.number().describe('감쇠 (dB/m)')
}).describe('신호 케이블 사양');

// 보드 대 보드 커넥터 스키마
export const BoardToBoardConnectorSchema = ConnectorSchema.extend({
  mounting_type: z.string().describe('장착 방식'),
  stack_height: ValueSchema(z.number(), LengthUnitSchema).describe('적층 높이'),
  pitch: ValueSchema(z.number(), LengthUnitSchema).describe('핀 간격')
}).describe('보드 대 보드 커넥터 사양');

// 와이어 대 보드 커넥터 스키마
export const WireToBoardConnectorSchema = ConnectorSchema.extend({
  wire_gauge_range: RangeSchema(z.number(), z.literal('AWG')).describe('적용 전선 규격'),
  termination_type: z.string().describe('접속 방식'),
  orientation: z.string().describe('장착 방향')
}).describe('와이어 대 보드 커넥터 사양');



