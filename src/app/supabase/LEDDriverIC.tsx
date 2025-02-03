import { z } from "zod";

// 기본 정보 스키마
export const LEDDriverICInfoSchema = z.object({
  channels: z.number().min(1).describe("LED 채널 수"),
  input_voltage: z.object({
    min: z.number().describe("최소 입력 전압 (V)"),
    max: z.number().describe("최대 입력 전압 (V)"), 
    typ: z.number().optional().describe("일반 입력 전압 (V)"),
    unit: z.literal("V").describe("전압 단위")
  }).describe("입력 전압 (VIN)"),
  output_voltage: z.object({
    min: z.number().describe("최소 출력 전압 (V)"),
    max: z.number().describe("최대 출력 전압 (V)"),
    typ: z.number().optional().describe("일반 출력 전압 (V)"),
    unit: z.literal("V").describe("전압 단위")
  }).describe("출력 전압 (VOUT)"),
  output_current: z.object({
    min: z.number().describe("최소 출력 전류 (mA)"),
    max: z.number().describe("최대 출력 전류 (mA)"),
    typ: z.number().optional().describe("일반 출력 전류 (mA)"),
    unit: z.literal("mA").describe("전류 단위")
  }).describe("출력 전류 (IOUT)"),
  current_accuracy: z.object({
    between_ics: z.number().describe("IC 간 전류 정확도 (%)"),
    between_channels: z.number().describe("채널 간 전류 정확도 (%)")
  }).describe("전류 정확도"),
  operating_temperature: z.object({
    min: z.number().describe("최소 동작 온도 (°C)"),
    max: z.number().describe("최대 동작 온도 (°C)"),
    unit: z.literal("°C").describe("온도 단위")
  }).describe("동작 온도"),
  package_type: z.string().describe("패키지 타입"),
  thermal_pad: z.boolean().describe("Thermal Pad 포함 여부"),
  topology: z.enum([  "Buck",
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
    "Other"]).array().describe("토폴로지"),
  dimming_method: z.enum(["PWM", "Analog"]).array().describe("조정 방법"),
});


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
