import { z } from "zod";

// 기본 정보 스키마
export const LEDDriverICInfoSchema = z.object({
  channels: z.union([z.number(), z.string()]).nullable().optional().describe("LED 채널 수 (예: 3x1, 3x4 또는 숫자)"),
  input_voltage: z.object({
    min: z.number().optional().nullable().describe("최소 입력 전압 (V)"),
    max: z.number().optional().nullable().describe("최대 입력 전압 (V)"), 
    typ: z.number().optional().nullable().describe("일반 입력 전압 (V)"),
    unit: z.enum(["V", "mV", "kV", "MV"]).optional().nullable().describe("전압 단위"),
  }).nullable().optional().describe("입력 전압 (VIN)"),

  output_voltage: z.object({
    min: z.number().optional().nullable().describe("최소 출력 전압 (V)"),
    max: z.number().optional().nullable().describe("최대 출력 전압 (V)"),
    typ: z.number().optional().nullable().describe("일반 출력 전압 (V)"),
    unit: z.enum(["V", "mV", "kV", "MV"]).optional().nullable().describe("전압 단위"),
    description: z.string().optional().nullable().describe("출력 전압 설명")
  }).nullable().optional().describe("출력 전압 (VOUT)"),

  output_current: z.object({
    min: z.number().optional().nullable().describe("최소 출력 전류 (mA)"),
    max: z.number().optional().nullable().describe("최대 출력 전류 (mA)"),
    typ: z.number().optional().nullable().describe("일반 출력 전류 (mA)"),
    description: z.string().optional().nullable().describe("출력 전류 설명"),
    unit: z.enum(["mA", "A", "µA"]).optional().nullable().describe("전류 단위")
  }).nullable().optional().describe("출력 전류 (IOUT)"),

  current_accuracy: z.object({
    between_ics: z.number().optional().nullable().describe("IC 간 전류 정확도 (%)"),
    between_channels: z.number().optional().nullable().describe("채널 간 전류 정확도 (%)")
  }).nullable().optional().describe("전류 정확도"),

  operating_temperature: z.object({
    min: z.number().optional().nullable().describe("최소 동작 온도 (°C)"),
    max: z.number().optional().nullable().describe("최대 동작 온도 (°C)"),
    unit: z.enum(["°C", "K", "°F"]).optional().nullable().describe("온도 단위")
  }).nullable().optional().describe("동작 온도"),

  package_type: z.string().nullable().optional().describe("패키지 타입"),
  thermal_pad: z.boolean().nullable().optional().describe("Thermal Pad 포함 여부"),
  topology: z.enum([
    "Buck",
    "Boost", 
    "Buck-Boost",
    "Charge Pump",
    "Linear Regulator",
    "Constant Current Sink",
    "SEPIC",
    "Flyback",
    "Forward",
    "Half-Bridge",
    "Full-Bridge",
    "Other"
  ]).array().nullable().optional().describe("토폴로지"),
  dimming_method: z.enum(["PWM", "Analog"]).array().nullable().optional().describe("조정 방법"),
  switching_frequency: z.object({
    min: z.number().optional().nullable().describe("최소 스위칭 주파수 (kHz)"),
    max: z.number().optional().nullable().describe("최대 스위칭 주파수 (kHz)"),
    typ: z.number().optional().nullable().describe("일반 스위칭 주파수 (kHz)"),
    unit: z.enum(["Hz", "kHz", "MHz", "GHz"]).optional().nullable().describe("주파수 단위")
  }).nullable().optional().describe("스위칭 주파수"),

  gray_scale_clock_frequency: z.object({
    min: z.number().optional().nullable().describe("최소 그레이스케일 주파수 (Hz)"),
    max: z.number().optional().nullable().describe("최대 그레이스케일 주파수 (Hz)"), 
    typ: z.number().optional().nullable().describe("일반 그레이스케일 주파수 (Hz)"),
    unit: z.enum(["Hz", "kHz", "MHz", "GHz"]).optional().nullable().describe("주파수 단위"),
    description: z.string().optional().nullable().describe("그레이스케일 주파수 설명")
  }).nullable().optional().describe("그레이스케일 주파수"),

  data_clock_frequency: z.object({
    min: z.number().optional().nullable().describe("최소 데이터 클럭 주파수 (Hz)"),
    max: z.number().optional().nullable().describe("최대 데이터 클럭 주파수 (Hz)"),
    typ: z.number().optional().nullable().describe("일반 데이터 클럭 주파수 (Hz)"),
    unit: z.enum(["Hz", "kHz", "MHz", "GHz"]).optional().nullable().describe("주파수 단위"),
    description: z.string().optional().nullable().describe("데이터 클럭 주파수 설명")
  }).nullable().optional().describe("데이터 클럭 주파수"),

  supply_package: z.string().nullable().optional().describe("공급 장치 패키지"),
  package_case: z.string().nullable().optional().describe("패키지/케이스"),
  mounting_type: z.string().nullable().optional().describe("실장 유형"),
  internal_switch: z.boolean().nullable().optional().describe("내부스위치 유무"),

  transmission_interface: z.object({
    topology: z.string().optional().nullable().describe("전송 인터페이스 토폴로지 (예: 2-Wire)"),
    clock_integrity: z.string().optional().nullable().describe("클럭 무결성 (예: Clock Regeneration)"),
    clock_direction: z.string().optional().nullable().describe("클럭 방향 (예: Clock Inversion)"),
    bidirectional: z.boolean().optional().nullable().describe("양방향 지원 여부")
  }).nullable().optional().describe("전송 인터페이스 특성"),

  led_matrix: z.object({
    max_pixels: z.number().optional().nullable().describe("최대 RGB LED 픽셀 수"),
    configuration: z.string().optional().nullable().describe("LED 매트릭스 구성"),
    description: z.string().optional().nullable().describe("LED 매트릭스 설명")
  }).nullable().optional().describe("LED 매트릭스 구성"),

  communication_interface: z.object({
    type: z.string().nullable().optional().describe("통신 인터페이스 유형 (예: SPI, I2C)"),
    speed: z.number().optional().nullable().describe("통신 속도 (MHz)"),
    proprietary: z.boolean().optional().nullable().describe("독점 프로토콜 여부"),
    description: z.string().optional().nullable().describe("인터페이스 설명")
  }).nullable().optional().describe("통신 인터페이스"),

  pwm: z.object({
    resolution: z.string().optional().nullable().describe("PWM 해상도 (예: 10-bit)"),
    frequency: z.number().optional().nullable().describe("PWM 주파수 (kHz)"),
    description: z.string().optional().nullable().describe("PWM 특성 설명")
  }).nullable().optional().describe("PWM 특성"),

  scan_design: z.object({
    type: z.string().nullable().optional().describe("스캔 설계 유형"),
    max_channels: z.number().optional().nullable().describe("최대 스캔 채널 수"),
    description: z.string().optional().nullable().describe("스캔 설계 설명")
  }).nullable().optional().describe("스캔 설계 특성")
}).nullable().optional();

// 전기적 특성 스키마 (Electrical Characteristics)
export const ElectricalCharacteristicsSchema = z.object({
  supply_voltage: z.object({
    min: z.number().min(0).describe("Minimum supply voltage (V)"),
    max: z.number().max(7.0).describe("Maximum supply voltage (V)"),
    unit: z.literal("V").describe("Voltage unit"),
  }).describe("Supply Voltage (VDD)"),
  output_current: z.object({
    min: z.number().min(0).describe("Minimum output current (mA)"),
    max: z.number().max(90).describe("Maximum output current (mA)"),
    unit: z.literal("mA").describe("Current unit"),
  }).describe("Output Current (IOUT)"),
});

// 최대 허용 사양 스키마 (Maximum Ratings)
export const MaximumRatingsSchema = z.object({
  supply_voltage: z.object({
    min: z.number().min(0).describe("Minimum supply voltage (V)"),
    max: z.number().max(7.0).describe("Maximum supply voltage (V)"),
    unit: z.literal("V").describe("Voltage unit"),
  }).describe("Supply Voltage (VDD)"),
  output_current: z.object({
    max: z.number().max(90).describe("Maximum output current (mA)"),
    unit: z.literal("mA").describe("Current unit"),
  }).describe("Output Current (IOUT)"),
  operating_temperature: z.object({
    min: z.number().describe("Minimum operating temperature (°C)"),
    max: z.number().describe("Maximum operating temperature (°C)"),
    unit: z.literal("°C").describe("Temperature unit"),
  }).describe("Operating Temperature (Topr)"),
  storage_temperature: z.object({
    min: z.number().describe("Minimum storage temperature (°C)"),
    max: z.number().describe("Maximum storage temperature (°C)"),
    unit: z.literal("°C").describe("Temperature unit"),
  }).describe("Storage Temperature (Tstg)"),
  power_dissipation: z.array(
    z.object({
      package_type: z.string().describe("Package type"),
      value: z.number().describe("Power dissipation (W)"),
      unit: z.literal("W").describe("Power unit"),
    })
  ).describe("Power Dissipation (PD)"),
});

// 패키징 정보 스키마 (Packaging Information)
export const PackagingInfoSchema = z.object({
  package_type: z.string().describe("Package type (e.g., SOP-8, QFN)"),
  has_thermal_pad: z.boolean().describe("Indicates if thermal pad is included"),
  dimensions: z.object({
    length: z.number().describe("Length (mm)"),
    width: z.number().describe("Width (mm)"),
    height: z.number().describe("Height (mm)"),
  }).describe("Package Dimensions"),
});
