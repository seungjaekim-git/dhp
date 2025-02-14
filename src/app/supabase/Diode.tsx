import { z } from "zod";

export const DiodeInfoSchema = z.object({
  // 전기적 특성
  forward_voltage: z.object({
    min: z.number().optional().nullable().describe("최소 순방향 전압 (V)"),
    max: z.number().optional().nullable().describe("최대 순방향 전압 (V)"),
    typ: z.number().optional().nullable().describe("일반 순방향 전압 (V)"),
    unit: z.literal("V").optional().nullable().describe("전압 단위"),
    test_condition: z.string().optional().nullable().describe("테스트 조건")
  }).nullable().optional().describe("순방향 전압 (VF)"),

  forward_current: z.object({
    min: z.number().optional().nullable().describe("최소 순방향 전류 (mA)"),
    max: z.number().optional().nullable().describe("최대 순방향 전류 (mA)"),
    typ: z.number().optional().nullable().describe("일반 순방향 전류 (mA)"),
    unit: z.literal("mA").optional().nullable().describe("전류 단위"),
    pulse: z.number().optional().nullable().describe("펄스 조건에서의 최대 전류 (mA)")
  }).nullable().optional().describe("순방향 전류 (IF)"),

  reverse_voltage: z.object({
    max: z.number().optional().nullable().describe("최대 역방향 전압 (V)"),
    unit: z.literal("V").optional().nullable().describe("전압 단위"),
    test_condition: z.string().optional().nullable().describe("테스트 조건")
  }).nullable().optional().describe("역방향 전압 (VR)"),

  reverse_current: z.object({
    max: z.number().optional().nullable().describe("최대 역방향 전류 (μA)"),
    typ: z.number().optional().nullable().describe("일반 역방향 전류 (μA)"),
    unit: z.literal("μA").optional().nullable().describe("전류 단위"),
    test_condition: z.string().optional().nullable().describe("테스트 조건")
  }).nullable().optional().describe("역방향 전류 (IR)"),

  // TVS 다이오드 특성
  tvs_characteristics: z.object({
    breakdown_voltage: z.object({
      min: z.number().optional().nullable().describe("최소 항복 전압 (V)"),
      typ: z.number().optional().nullable().describe("일반 항복 전압 (V)"),
      unit: z.literal("V").optional().nullable()
    }).nullable().optional().describe("항복 전압 (VBR)"),
    
    clamping_voltage: z.object({
      max: z.number().optional().nullable().describe("최대 클램핑 전압 (V)"),
      unit: z.literal("V").optional().nullable(),
      test_condition: z.string().optional().nullable()
    }).nullable().optional().describe("클램핑 전압"),

    peak_pulse_current: z.object({
      max: z.number().optional().nullable().describe("최대 펄스 전류 (A)"),
      unit: z.literal("A").optional().nullable(),
      pulse_width: z.number().optional().nullable().describe("펄스 폭 (μs)")
    }).nullable().optional().describe("피크 펄스 전류")
  }).nullable().optional(),

  // 쇼트키 다이오드 특성
  schottky_characteristics: z.object({
    barrier_height: z.object({
      value: z.number().optional().nullable().describe("장벽 높이 (eV)"),
      unit: z.literal("eV").optional().nullable()
    }).nullable().optional().describe("장벽 높이"),
    
    forward_voltage_drop: z.object({
      typ: z.number().optional().nullable().describe("일반 순방향 전압 강하 (V)"),
      unit: z.literal("V").optional().nullable(),
      temperature: z.number().optional().nullable().describe("측정 온도 (°C)")
    }).nullable().optional().describe("순방향 전압 강하")
  }).nullable().optional(),

  // 제너 다이오드 특성
  zener_characteristics: z.object({
    zener_voltage: z.object({
      nominal: z.number().optional().nullable().describe("공칭 제너 전압 (V)"),
      tolerance: z.number().optional().nullable().describe("전압 공차 (%)"),
      unit: z.literal("V").optional().nullable(),
      test_current: z.number().optional().nullable().describe("테스트 전류 (mA)")
    }).nullable().optional().describe("제너 전압"),
    
    zener_impedance: z.object({
      max: z.number().optional().nullable().describe("최대 제너 임피던스 (Ω)"),
      unit: z.literal("Ω").optional().nullable()
    }).nullable().optional().describe("제너 임피던스")
  }).nullable().optional(),

  // 정류기 다이오드 특성
  rectifier_characteristics: z.object({
    average_rectified_current: z.object({
      max: z.number().optional().nullable().describe("최대 평균 정류 전류 (A)"),
      unit: z.literal("A").optional().nullable()
    }).nullable().optional().describe("평균 정류 전류"),
    
    surge_current: z.object({
      max: z.number().optional().nullable().describe("최대 서지 전류 (A)"),
      unit: z.literal("A").optional().nullable(),
      pulse_width: z.number().optional().nullable().describe("펄스 폭 (ms)")
    }).nullable().optional().describe("서지 전류")
  }).nullable().optional(),

  // 광학적 특성 (LED의 경우)
  optical_characteristics: z.object({
    wavelength: z.object({
      min: z.number().optional().nullable().describe("최소 파장 (nm)"),
      max: z.number().optional().nullable().describe("최대 파장 (nm)"),
      peak: z.number().optional().nullable().describe("피크 파장 (nm)"),
      unit: z.literal("nm").optional().nullable()
    }).nullable().optional().describe("파장"),
    
    luminous_intensity: z.object({
      min: z.number().optional().nullable().describe("최소 광도 (mcd)"),
      typ: z.number().optional().nullable().describe("일반 광도 (mcd)"),
      max: z.number().optional().nullable().describe("최대 광도 (mcd)"),
      unit: z.literal("mcd").optional().nullable(),
      test_condition: z.string().optional().nullable()
    }).nullable().optional().describe("광도"),

    viewing_angle: z.object({
      value: z.number().optional().nullable().describe("시야각 (도)"),
      unit: z.literal("°").optional().nullable()
    }).nullable().optional().describe("시야각")
  }).nullable().optional(),

  // 열적 특성
  thermal_characteristics: z.object({
    operating_temperature: z.object({
      min: z.number().optional().nullable().describe("최소 동작 온도 (°C)"),
      max: z.number().optional().nullable().describe("최대 동작 온도 (°C)"),
      unit: z.literal("°C").optional().nullable()
    }).nullable().optional().describe("동작 온도 범위"),

    storage_temperature: z.object({
      min: z.number().optional().nullable().describe("최소 보관 온도 (°C)"),
      max: z.number().optional().nullable().describe("최대 보관 온도 (°C)"),
      unit: z.literal("°C").optional().nullable()
    }).nullable().optional().describe("보관 온도 범위"),

    thermal_resistance: z.object({
      junction_to_ambient: z.number().optional().nullable().describe("접합-대기 열저항 (°C/W)"),
      junction_to_case: z.number().optional().nullable().describe("접합-케이스 열저항 (°C/W)"),
      unit: z.literal("°C/W").optional().nullable()
    }).nullable().optional().describe("열저항")
  }).nullable().optional(),

  // 동적 특성
  switching_characteristics: z.object({
    reverse_recovery_time: z.object({
      typ: z.number().optional().nullable().describe("일반 역회복 시간 (ns)"),
      max: z.number().optional().nullable().describe("최대 역회복 시간 (ns)"),
      unit: z.literal("ns").optional().nullable(),
      test_condition: z.string().optional().nullable()
    }).nullable().optional().describe("역회복 시간 (trr)"),

    forward_recovery_time: z.object({
      typ: z.number().optional().nullable().describe("일반 순방향 회복 시간 (ns)"),
      max: z.number().optional().nullable().describe("최대 순방향 회복 시간 (ns)"),
      unit: z.literal("ns").optional().nullable()
    }).nullable().optional().describe("순방향 회복 시간 (tfr)"),

    junction_capacitance: z.object({
      typ: z.number().optional().nullable().describe("일반 접합 용량 (pF)"),
      max: z.number().optional().nullable().describe("최대 접합 용량 (pF)"),
      unit: z.literal("pF").optional().nullable(),
      test_condition: z.string().optional().nullable()
    }).nullable().optional().describe("접합 용량 (Cj)")
  }).nullable().optional(),

  // 물리적 특성
  physical_characteristics: z.object({
    package_type: z.string().nullable().optional().describe("패키지 타입"),
    mounting_type: z.string().nullable().optional().describe("실장 방식"),
    weight: z.object({
      value: z.number().optional().nullable().describe("무게"),
      unit: z.string().optional().nullable().describe("무게 단위")
    }).nullable().optional().describe("무게"),
    dimensions: z.object({
      length: z.number().optional().nullable().describe("길이 (mm)"),
      width: z.number().optional().nullable().describe("너비 (mm)"),
      height: z.number().optional().nullable().describe("높이 (mm)"),
      unit: z.literal("mm").optional().nullable()
    }).nullable().optional().describe("치수")
  }).nullable().optional(),

  // 기타 특성
  additional_characteristics: z.object({
    polarity: z.enum(["Single", "Dual"]).nullable().optional().describe("극성"),
    configuration: z.enum(["Single", "Series", "Array"]).nullable().optional().describe("구성"),
    application_type: z.string().array().nullable().optional().describe("응용 분야"),
    features: z.string().array().nullable().optional().describe("주요 특징"),
    diode_type: z.enum([
      "Standard",
      "TVS",
      "Schottky",
      "Zener",
      "Rectifier",
      "LED",
      "Fast Recovery",
      "PIN",
      "Varactor"
    ]).nullable().optional().describe("다이오드 유형")
  }).nullable().optional()
}).nullable().optional();
