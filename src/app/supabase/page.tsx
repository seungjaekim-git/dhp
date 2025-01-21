import { z } from "zod";

export const LEDDriverICSchema = z.object({
  input_voltage_range: z.object({
    min: z.number().nullable(), // Minimum input voltage
    max: z.number().nullable(), // Maximum input voltage
    unit: z.literal("V"),
  }),
  output_current_range: z.object({
    min: z.number().nullable(), // Minimum output current
    max: z.number().nullable(), // Maximum output current
    unit: z.literal("mA"),
  }),
  output_voltage_range: z.object({
    min: z.number().nullable(), // Minimum output voltage
    max: z.number().nullable(), // Maximum output voltage
    unit: z.literal("V"),
  }),
  efficiency: z.object({
    value: z.number().nullable(), // Efficiency percentage
    unit: z.literal("%"),
  }),
  dimming_methods: z.array(z.string()), // Dimming methods (e.g., "PWM", "Analog")
  protection_features: z.array(z.string()), // Protection features (e.g., "OVP", "OCP")
  operating_frequency: z.object({
    typical: z.number().nullable(), // Typical operating frequency
    unit: z.literal("kHz"),
  }),
  channels: z.number().nullable(), // Number of channels
  programmable: z.boolean().nullable(), // Whether it's programmable
  package_type: z.string().nullable(), // Package type (e.g., "SMD")
  operating_temperature_range: z.object({
    min: z.number().nullable(), // Minimum operating temperature
    max: z.number().nullable(), // Maximum operating temperature
    unit: z.literal("°C"),
  }),
});

export const DiodeSchema = z.object({
    type: z.string().nullable(), // Type of diode (e.g., "Schottky")
    forward_voltage: z.object({
      value: z.number().nullable(), // Forward voltage drop
      unit: z.literal("V"),
    }),
    reverse_voltage: z.object({
      value: z.number().nullable(), // Peak reverse voltage
      unit: z.literal("V"),
    }),
    forward_current: z.object({
      value: z.number().nullable(), // Forward current rating
      unit: z.literal("A"),
    }),
    leakage_current: z.object({
      value: z.number().nullable(), // Reverse leakage current
      unit: z.literal("uA"),
    }),
    reverse_recovery_time: z.object({
      value: z.number().nullable(), // Reverse recovery time
      unit: z.literal("ns"),
    }),
    capacitance: z.object({
      value: z.number().nullable(), // Junction capacitance
      unit: z.literal("pF"),
    }),
    package_type: z.string().nullable(), // Package type (e.g., "DO-214AC")
    operating_temperature_range: z.object({
      min: z.number().nullable(), // Minimum operating temperature
      max: z.number().nullable(), // Maximum operating temperature
      unit: z.literal("°C"),
    }),
  });

  export const CableSchema = z.object({
    type: z.string().nullable(), // Type of cable (e.g., "Power")
    conductor_count: z.number().nullable(), // Number of conductors
    awg_size: z.number().nullable(), // AWG size
    shield_type: z.string().nullable(), // Shield type (e.g., "Braided")
    jacket_material: z.string().nullable(), // Jacket material (e.g., "PVC")
    length: z.object({
      value: z.number().nullable(), // Cable length
      unit: z.literal("m"),
    }),
    voltage_rating: z.object({
      value: z.number().nullable(), // Voltage rating
      unit: z.literal("V"),
    }),
    current_rating: z.object({
      value: z.number().nullable(), // Current rating
      unit: z.literal("A"),
    }),
    temperature_rating: z.object({
      min: z.number().nullable(), // Minimum temperature rating
      max: z.number().nullable(), // Maximum temperature rating
      unit: z.literal("°C"),
    }),
    color: z.string().nullable(), // Cable color
    flexibility_type: z.string().nullable(), // Flexibility type (e.g., "Flexible")
    certifications: z.array(z.string()), // Certifications (e.g., "UL", "CE")
  });

  export const ConnectorSchema = z.object({
    type: z.string().nullable(), // Connector type (e.g., "Signal")
    pin_count: z.number().nullable(), // Number of pins
    gender: z.string().nullable(), // Gender (e.g., "Male", "Female")
    mounting_type: z.string().nullable(), // Mounting type (e.g., "Through Hole")
    pitch: z.object({
      value: z.number().nullable(), // Pin pitch
      unit: z.literal("mm"),
    }),
    current_rating_per_contact: z.object({
      value: z.number().nullable(), // Current rating per contact
      unit: z.literal("A"),
    }),
    voltage_rating: z.object({
      value: z.number().nullable(), // Voltage rating
      unit: z.literal("V"),
    }),
    mating_cycles: z.object({
      value: z.number().nullable(), // Number of mating cycles
    }),
    ip_rating: z.string().nullable(), // IP protection rating
    contact_material: z.string().nullable(), // Contact material (e.g., "Gold")
    housing_material: z.string().nullable(), // Housing material
    orientation: z.string().nullable(), // Orientation (e.g., "Right Angle")
    locking_mechanism: z.string().nullable(), // Locking mechanism (e.g., "Latch")
  });

  export const SensorSchema = z.object({
    type: z.string().nullable(), // Sensor type (e.g., "Temperature")
    measurement_range: z.object({
      min: z.number().nullable(), // Minimum measurement range
      max: z.number().nullable(), // Maximum measurement range
      unit: z.string(), // Unit of measurement (e.g., "°C")
    }),
    accuracy: z.object({
      value: z.number().nullable(), // Accuracy of the sensor
      unit: z.string(),
    }),
    resolution: z.object({
      value: z.number().nullable(), // Resolution
      unit: z.string(),
    }),
    response_time: z.object({
      value: z.number().nullable(), // Response time
      unit: z.literal("ms"),
    }),
    output_type: z.string().nullable(), // Output type (e.g., "Digital")
    protocol: z.string().nullable(), // Protocol (e.g., "I2C")
    supply_voltage_range: z.object({
      min: z.number().nullable(), // Minimum supply voltage
      max: z.number().nullable(), // Maximum supply voltage
      unit: z.literal("V"),
    }),
    power_consumption: z.object({
      value: z.number().nullable(), // Power consumption
      unit: z.literal("mW"),
    }),
    calibrated: z.boolean().nullable(), // Whether the sensor is calibrated
    self_test: z.boolean().nullable(), // Whether self-test is available
    interface: z.array(z.string()), // Available interfaces (e.g., ["I2C", "SPI"])
  });
  
  export const PMICSchema = z.object({
    topology: z.string().nullable(), // 토폴로지 유형 (e.g., "Buck", "Boost", "Buck-Boost")
    input_voltage_range: z.object({
      min: z.number().nullable(), // 최소 입력 전압
      max: z.number().nullable(), // 최대 입력 전압
      unit: z.literal("V"),
    }),
    output_voltage_range: z.object({
      min: z.number().nullable(), // 최소 출력 전압
      max: z.number().nullable(), // 최대 출력 전압
      unit: z.literal("V"), 
    }),
    output_current: z.object({
      value: z.number().nullable(), // 출력 전류
      unit: z.literal("A"),
    }),
    switching_frequency: z.object({
      value: z.number().nullable(), // 스위칭 주파수
      unit: z.literal("kHz"),
    }),
    efficiency: z.object({
      value: z.number().nullable(), // 효율
      unit: z.literal("%"),
    }),
    protection_features: z.array(z.string()), // 보호 기능 목록
    package_type: z.string().nullable(), // 패키지 타입
    operating_temperature: z.object({
      min: z.number().nullable(), // 최소 동작 온도
      max: z.number().nullable(), // 최대 동작 온도
      unit: z.literal("°C"),
    }),
  });

  export const TVSDiodeSchema = z.object({
    breakdown_voltage: z.object({
      value: z.number().nullable(), // 항복 전압
      unit: z.literal("V"),
    }),
    clamping_voltage: z.object({
      value: z.number().nullable(), // 클램핑 전압
      unit: z.literal("V"),
    }),
    peak_pulse_current: z.object({
      value: z.number().nullable(), // 피크 펄스 전류
      unit: z.literal("A"),
    }),
    response_time: z.object({
      value: z.number().nullable(), // 응답 시간
      unit: z.literal("ps"),
    }),
    capacitance: z.object({
      value: z.number().nullable(), // 정전 용량
      unit: z.literal("pF"),
    }),
    power_rating: z.object({
      value: z.number().nullable(), // 전력 정격
      unit: z.literal("W"),
    }),
    direction: z.string().nullable(), // 방향성 (uni/bi-directional)
    package_type: z.string().nullable(), // 패키지 타입
    operating_temperature: z.object({
      min: z.number().nullable(), // 최소 동작 온도
      max: z.number().nullable(), // 최대 동작 온도
      unit: z.literal("°C"),
    }),
  });

  export const RectifierDiodeSchema = z.object({
    forward_voltage: z.object({
      value: z.number().nullable(), // 순방향 전압
      unit: z.literal("V"),
    }),
    reverse_voltage: z.object({
      value: z.number().nullable(), // 역방향 전압
      unit: z.literal("V"),
    }),
    forward_current: z.object({
      value: z.number().nullable(), // 순방향 전류
      unit: z.literal("A"),
    }),
    reverse_current: z.object({
      value: z.number().nullable(), // 역방향 전류
      unit: z.literal("μA"),
    }),
    recovery_time: z.object({
      value: z.number().nullable(), // 회복 시간
      unit: z.literal("ns"),
    }),
    junction_capacitance: z.object({
      value: z.number().nullable(), // 접합 용량
      unit: z.literal("pF"),
    }),
    package_type: z.string().nullable(), // 패키지 타입
    operating_temperature: z.object({
      min: z.number().nullable(), // 최소 동작 온도
      max: z.number().nullable(), // 최대 동작 온도
      unit: z.literal("°C"),
    }),
  });

  export const MOSFETSchema = z.object({
    drain_source_voltage: z.object({
      value: z.number().nullable(), // 드레인-소스 전압
      unit: z.literal("V"),
    }),
    gate_source_voltage: z.object({
      value: z.number().nullable(), // 게이트-소스 전압
      unit: z.literal("V"), 
    }),
    drain_current: z.object({
      value: z.number().nullable(), // 드레인 전류
      unit: z.literal("A"),
    }),
    on_resistance: z.object({
      value: z.number().nullable(), // ON 저항
      unit: z.literal("Ω"),
    }),
    input_capacitance: z.object({
      value: z.number().nullable(), // 입력 커패시턴스
      unit: z.literal("pF"),
    }),
    gate_charge: z.object({
      value: z.number().nullable(), // 게이트 전하량
      unit: z.literal("nC"),
    }),
    switching_speed: z.object({
      rise_time: z.number().nullable(), // 상승 시간
      fall_time: z.number().nullable(), // 하강 시간
      unit: z.literal("ns"),
    }),
    package_type: z.string().nullable(), // 패키지 타입
    operating_temperature: z.object({
      min: z.number().nullable(), // 최소 동작 온도
      max: z.number().nullable(), // 최대 동작 온도
      unit: z.literal("°C"),
    }),
  });