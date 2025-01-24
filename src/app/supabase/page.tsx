import { z } from "zod";

// LED Driver IC 스키마
export const LEDDriverICSchema = z.object({
  input_voltage_range: z
    .object({
      min: z.number().nullable().describe('최소 입력 전압 (V)'),
      typical: z.number().nullable().describe('일반 입력 전압 (V)'),
      max: z.number().nullable().describe('최대 입력 전압 (V)'),
      unit: z.literal("V").describe('전압 단위'),
    })
    .refine((range) => !range.min || !range.max || range.min <= range.max, {
      message: '최소값은 최대값보다 클 수 없습니다.',
    })
    .describe('입력 전압 범위'),
  output_current_range: z
    .object({
      min: z.number().nullable().describe('최소 출력 전류 (mA)'),
      typical: z.number().nullable().describe('일반 출력 전류 (mA)'),
      max: z.number().nullable().describe('최대 출력 전류 (mA)'),
      unit: z.literal("mA").describe('전류 단위'),
    })
    .refine((range) => !range.min || !range.max || range.min <= range.max, {
      message: '최소값은 최대값보다 클 수 없습니다.',
    })
    .describe('출력 전류 범위'),
  output_voltage_range: z
    .object({
      min: z.number().nullable().describe('최소 출력 전압 (V)'),
      typical: z.number().nullable().describe('일반 출력 전압 (V)'),
      max: z.number().nullable().describe('최대 출력 전압 (V)'),
      unit: z.literal("V").describe('전압 단위'),
    })
    .refine((range) => !range.min || !range.max || range.min <= range.max, {
      message: '최소값은 최대값보다 클 수 없습니다.',
    })
    .describe('출력 전압 범위'),
  efficiency: z.object({
    value: z.number().min(0).max(100).describe('효율 (%)'),
    unit: z.literal("%").describe('효율 단위'),
  }).describe('효율'),
  dimming_methods: z
    .array(z.string())
    .nonempty()
    .describe('디밍 방식 (예: PWM, 아날로그)'),
  protection_features: z
    .array(z.string())
    .nonempty()
    .describe('보호 기능 (예: OVP, OCP, SCP)'),
  operating_frequency: z.object({
    typical: z.number().nullable().describe('일반 동작 주파수 (kHz)'),
    unit: z.literal("kHz").describe('주파수 단위'),
  }).describe('동작 주파수'),
  channels: z.number().min(1).describe('채널 수'),
  programmable: z.boolean().nullable().default(false).describe('프로그래밍 가능 여부'),
  package_type: z.string().nullable().describe('패키지 타입 (예: SOP, QFN)'),
  operating_temperature_range: z
    .object({
      min: z.number().nullable().describe('최소 동작 온도 (°C)'),
      typical: z.number().nullable().describe('일반 동작 온도 (°C)'),
      max: z.number().nullable().describe('최대 동작 온도 (°C)'),
      unit: z.literal("°C").describe('온도 단위'),
    })
    .refine((range) => !range.min || !range.max || range.min <= range.max, {
      message: '최소값은 최대값보다 클 수 없습니다.',
    })
    .describe('동작 온도 범위'),
}).describe('LED 드라이버 IC 사양');


// 다이오드 스키마
export const DiodeSchema = z.object({
  type: z.string().nullable().describe('다이오드 종류 (예: 쇼트키, 고속)'),
  forward_voltage: z.object({
    value: z.number().nullable().describe('순방향 전압 강하 (V)'),
    unit: z.literal("V").describe('전압 단위'),
  }).describe('순방향 전압'),
  reverse_voltage: z.object({
    value: z.number().nullable().describe('최대 역방향 전압 (V)'),
    unit: z.literal("V").describe('전압 단위'),
  }).describe('역방향 전압'),
  forward_current: z.object({
    value: z.number().nullable().describe('순방향 전류 정격 (A)'),
    unit: z.literal("A").describe('전류 단위'),
  }).describe('순방향 전류'),
  leakage_current: z.object({
    value: z.number().nullable().describe('역방향 누설 전류 (uA)'),
    unit: z.literal("uA").describe('전류 단위'),
  }).describe('누설 전류'),
  reverse_recovery_time: z.object({
    value: z.number().nullable().describe('역회복 시간 (ns)'),
    unit: z.literal("ns").describe('시간 단위'),
  }).describe('역회복 시간'),
  capacitance: z.object({
    value: z.number().nullable().describe('접합 커패시턴스 (pF)'),
    unit: z.literal("pF").describe('커패시턴스 단위'),
  }).describe('커패시턴스'),
  package_type: z.string().nullable().describe('패키지 타입 (예: DO-214AC, SOD-123)'),
  operating_temperature_range: z.object({
    min: z.number().nullable().describe('최소 동작 온도 (°C)'),
    max: z.number().nullable().describe('최대 동작 온도 (°C)'),
    unit: z.literal("°C").describe('온도 단위'),
  }).describe('동작 온도 범위'),
}).describe('다이오드 사양');

// 케이블 스키마
export const CableSchema = z.object({
  type: z.string().nullable().describe('케이블 종류 (예: 전원, 신호)'),
  conductor_count: z.number().min(1).describe('도체 수'),
  awg_size: z.number().nullable().describe('AWG 규격'),
  shield_type: z.string().nullable().describe('차폐 타입 (예: 편조, 호일)'),
  jacket_material: z.string().nullable().describe('피복 재질 (예: PVC, PE)'),
  length: z.object({
    value: z.number().nullable().describe('케이블 길이 (m)'),
    unit: z.literal("m").describe('길이 단위'),
  }).describe('길이'),
  voltage_rating: z.object({
    value: z.number().nullable().describe('정격 전압 (V)'),
    unit: z.literal("V").describe('전압 단위'),
  }).describe('전압 정격'),
  current_rating: z.object({
    value: z.number().nullable().describe('정격 전류 (A)'),
    unit: z.literal("A").describe('전류 단위'),
  }).describe('전류 정격'),
  temperature_rating: z.object({
    min: z.number().nullable().describe('최소 온도 정격 (°C)'),
    max: z.number().nullable().describe('최대 온도 정격 (°C)'),
    unit: z.literal("°C").describe('온도 단위'),
  }).describe('온도 정격'),
  color: z.string().nullable().describe('케이블 색상'),
  flexibility_type: z.string().nullable().describe('유연성 타입 (예: 가요성, 경성)'),
  certifications: z.array(z.string()).describe('인증 (예: UL, CE, KC)'),
}).describe('케이블 사양');

// 커넥터 스키마
export const ConnectorSchema = z.object({
  type: z.string().nullable().describe('커넥터 종류 (예: 신호용, 전원용)'),
  pin_count: z.number().nullable().describe('핀 수'),
  gender: z.string().nullable().describe('성별 (수/암)'),
  mounting_type: z.string().nullable().describe('장착 방식 (예: 관통홀, SMT)'),
  pitch: z.object({
    value: z.number().nullable().describe('핀 피치 (mm)'),
    unit: z.literal("mm").describe('길이 단위'),
  }).describe('피치'),
  current_rating_per_contact: z.object({
    value: z.number().nullable().describe('접점당 정격 전류 (A)'),
    unit: z.literal("A").describe('전류 단위'),
  }).describe('접점 전류 정격'),
  voltage_rating: z.object({
    value: z.number().nullable().describe('정격 전압 (V)'),
    unit: z.literal("V").describe('전압 단위'),
  }).describe('전압 정격'),
  mating_cycles: z.object({
    value: z.number().nullable().describe('결합 수명 (회)'),
  }).describe('결합 수명'),
  ip_rating: z.string().nullable().describe('IP 보호 등급'),
  contact_material: z.string().nullable().describe('접점 재질 (예: 금, 주석)'),
  housing_material: z.string().nullable().describe('하우징 재질'),
  orientation: z.string().nullable().describe('방향 (예: 직각, 수직)'),
  locking_mechanism: z.string().nullable().describe('잠금 방식 (예: 래치, 나사)'),
}).describe('커넥터 사양');

// 센서 스키마
export const SensorSchema = z.object({
  type: z.string().nullable().describe('센서 종류 (예: 온도, 습도)'),
  measurement_range: z.object({
    min: z.number().nullable().describe('최소 측정 범위'),
    max: z.number().nullable().describe('최대 측정 범위'),
    unit: z.string().describe('측정 단위'),
  }).describe('측정 범위'),
  accuracy: z.object({
    value: z.number().nullable().describe('정확도'),
    unit: z.string().describe('정확도 단위'),
  }).describe('정확도'),
  resolution: z.object({
    value: z.number().nullable().describe('분해능'),
    unit: z.string().describe('분해능 단위'),
  }).describe('분해능'),
  response_time: z.object({
    value: z.number().nullable().describe('응답 시간 (ms)'),
    unit: z.literal("ms").describe('시간 단위'),
  }).describe('응답 시간'),
  output_type: z.string().nullable().describe('출력 타입 (예: 디지털, 아날로그)'),
  protocol: z.string().nullable().describe('통신 프로토콜 (예: I2C, SPI)'),
  supply_voltage_range: z.object({
    min: z.number().nullable().describe('최소 공급 전압 (V)'),
    max: z.number().nullable().describe('최대 공급 전압 (V)'),
    unit: z.literal("V").describe('전압 단위'),
  }).describe('공급 전압 범위'),
  power_consumption: z.object({
    value: z.number().nullable().describe('소비 전력 (mW)'),
    unit: z.literal("mW").describe('전력 단위'),
  }).describe('소비 전력'),
  calibrated: z.boolean().nullable().describe('교정 여부'),
  self_test: z.boolean().nullable().describe('자가 진단 기능 여부'),
  interface: z.array(z.string()).describe('인터페이스 (예: I2C, SPI)'),
}).describe('센서 사양');

// PMIC 스키마
export const PMICSchema = z.object({
  topology: z.string().nullable().describe('토폴로지 유형 (예: Buck, Boost)'),
  input_voltage_range: z.object({
    min: z.number().nullable().describe('최소 입력 전압 (V)'),
    max: z.number().nullable().describe('최대 입력 전압 (V)'),
    unit: z.literal("V").describe('전압 단위'),
  }).describe('입력 전압 범위'),
  output_voltage_range: z.object({
    min: z.number().nullable().describe('최소 출력 전압 (V)'),
    max: z.number().nullable().describe('최대 출력 전압 (V)'),
    unit: z.literal("V").describe('전압 단위'),
  }).describe('출력 전압 범위'),
  output_current: z.object({
    value: z.number().nullable().describe('출력 전류 (A)'),
    unit: z.literal("A").describe('전류 단위'),
  }).describe('출력 전류'),
  switching_frequency: z.object({
    value: z.number().nullable().describe('스위칭 주파수 (kHz)'),
    unit: z.literal("kHz").describe('주파수 단위'),
  }).describe('스위칭 주파수'),
  efficiency: z.object({
    value: z.number().min(0).max(100).describe('효율 (%)'),
    unit: z.literal("%").describe('효율 단위'),
  }).describe('효율'),
  protection_features: z.array(z.string()).describe('보호 기능 목록'),
  package_type: z.string().nullable().describe('패키지 타입'),
  operating_temperature: z.object({
    min: z.number().nullable().describe('최소 동작 온도 (°C)'),
    max: z.number().nullable().describe('최대 동작 온도 (°C)'),
    unit: z.literal("°C").describe('온도 단위'),
  }).describe('동작 온도'),
}).describe('PMIC 사양');

// TVS 다이오드 스키마
export const TVSDiodeSchema = z.object({
  breakdown_voltage: z.object({
    value: z.number().nullable().describe('항복 전압 (V)'),
    unit: z.literal("V").describe('전압 단위'),
  }).describe('항복 전압'),
  clamping_voltage: z.object({
    value: z.number().nullable().describe('클램핑 전압 (V)'),
    unit: z.literal("V").describe('전압 단위'),
  }).describe('클램핑 전압'),
  peak_pulse_current: z.object({
    value: z.number().nullable().describe('피크 펄스 전류 (A)'),
    unit: z.literal("A").describe('전류 단위'),
  }).describe('피크 펄스 전류'),
  response_time: z.object({
    value: z.number().nullable().describe('응답 시간 (ps)'),
    unit: z.literal("ps").describe('시간 단위'),
  }).describe('응답 시간'),
  capacitance: z.object({
    value: z.number().nullable().describe('정전 용량 (pF)'),
    unit: z.literal("pF").describe('용량 단위'),
  }).describe('정전 용량'),
  power_rating: z.object({
    value: z.number().nullable().describe('전력 정격 (W)'),
    unit: z.literal("W").describe('전력 단위'),
  }).describe('전력 정격'),
  direction: z.string().nullable().describe('방향성 (단방향/양방향)'),
  package_type: z.string().nullable().describe('패키지 타입'),
  operating_temperature: z.object({
    min: z.number().nullable().describe('최소 동작 온도 (°C)'),
    max: z.number().nullable().describe('최대 동작 온도 (°C)'),
    unit: z.literal("°C").describe('온도 단위'),
  }).describe('동작 온도'),
}).describe('TVS 다이오드 사양');

// 정류 다이오드 스키마
export const RectifierDiodeSchema = z.object({
  forward_voltage: z.object({
    value: z.number().nullable().describe('순방향 전압 (V)'),
    unit: z.literal("V").describe('전압 단위'),
  }).describe('순방향 전압'),
  reverse_voltage: z.object({
    value: z.number().nullable().describe('역방향 전압 (V)'),
    unit: z.literal("V").describe('전압 단위'),
  }).describe('역방향 전압'),
  forward_current: z.object({
    value: z.number().nullable().describe('순방향 전류 (A)'),
    unit: z.literal("A").describe('전류 단위'),
  }).describe('순방향 전류'),
  reverse_current: z.object({
    value: z.number().nullable().describe('역방향 전류 (μA)'),
    unit: z.literal("μA").describe('전류 단위'),
  }).describe('역방향 전류'),
  recovery_time: z.object({
    value: z.number().nullable().describe('회복 시간 (ns)'),
    unit: z.literal("ns").describe('시간 단위'),
  }).describe('회복 시간'),
  junction_capacitance: z.object({
    value: z.number().nullable().describe('접합 용량 (pF)'),
    unit: z.literal("pF").describe('용량 단위'),
  }).describe('접합 용량'),
  package_type: z.string().nullable().describe('패키지 타입'),
  operating_temperature: z.object({
    min: z.number().nullable().describe('최소 동작 온도 (°C)'),
    max: z.number().nullable().describe('최대 동작 온도 (°C)'),
    unit: z.literal("°C").describe('온도 단위'),
  }).describe('동작 온도'),
}).describe('정류 다이오드 사양');

// MOSFET 스키마
export const MOSFETSchema = z.object({
  drain_source_voltage: z.object({
    value: z.number().nullable().describe('드레인-소스 전압 (V)'),
    unit: z.literal("V").describe('전압 단위'),
  }).describe('드레인-소스 전압'),
  gate_source_voltage: z.object({
    value: z.number().nullable().describe('게이트-소스 전압 (V)'),
    unit: z.literal("V").describe('전압 단위'),
  }).describe('게이트-소스 전압'),
  drain_current: z.object({
    value: z.number().nullable().describe('드레인 전류 (A)'),
    unit: z.literal("A").describe('전류 단위'),
  }).describe('드레인 전류'),
  on_resistance: z.object({
    value: z.number().nullable().describe('ON 저항 (Ω)'),
    unit: z.literal("Ω").describe('저항 단위'),
  }).describe('ON 저항'),
  input_capacitance: z.object({
    value: z.number().nullable().describe('입력 커패시턴스 (pF)'),
    unit: z.literal("pF").describe('용량 단위'),
  }).describe('입력 커패시턴스'),
  gate_charge: z.object({
    value: z.number().nullable().describe('게이트 전하량 (nC)'),
    unit: z.literal("nC").describe('전하량 단위'),
  }).describe('게이트 전하량'),
  switching_speed: z.object({
    rise_time: z.number().nullable().describe('상승 시간 (ns)'),
    fall_time: z.number().nullable().describe('하강 시간 (ns)'),
    unit: z.literal("ns").describe('시간 단위'),
  }).describe('스위칭 속도'),
  package_type: z.string().nullable().describe('패키지 타입'),
  operating_temperature: z.object({
    min: z.number().nullable().describe('최소 동작 온도 (°C)'),
    max: z.number().nullable().describe('최대 동작 온도 (°C)'),
    unit: z.literal("°C").describe('온도 단위'),
  }).describe('동작 온도'),
}).describe('MOSFET 사양');



  
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import CreateProduct from "./CreateProduct";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent } from "@/components/ui/card";

  export default function ProductManagementPage() {
    return (
      <div className="container mx-auto py-10">
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="create">제품 생성</TabsTrigger>
            <TabsTrigger value="search">제품 검색</TabsTrigger>
            <TabsTrigger value="inventory">재고 관리</TabsTrigger>
            <TabsTrigger value="analytics">분석</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            <Card>
              <CardContent className="pt-6">
                <CreateProduct />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="search">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">제품 검색</h2>
                <p>제품 검색 기능은 개발 중입니다.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inventory">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">재고 관리</h2>
                <p>재고 관리 기능은 개발 중입니다.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold mb-4">분석</h2>
                <p>분석 기능은 개발 중입니다.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }