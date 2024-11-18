'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Supabase 클라이언트 초기화
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { db: { schema: 'DHP' }}
)

const dimmingMethods = [
  { label: "Digital", value: "Digital" },
  { label: "Analog", value: "Analog" }
] as const

const certifications = [
  { label: "RoHS", value: "RoHS" },
  { label: "CE", value: "CE" },
  { label: "UL", value: "UL" }
] as const

const FormSchema = z.object({
  part_number: z.string().min(1, "Part Number는 필수입니다"),
  manufacturer_id: z.string({
    required_error: "제조사를 선택해주세요",
  }),
  category_id: z.string({
    required_error: "카테고리를 선택해주세요",
  }),
  series: z.string().optional(),
  subtitle: z.string().optional(),
  number_of_outputs: z.string().min(1, "Number of Outputs는 필수입니다"),
  output_current_min: z.string().optional(),
  output_voltage_max: z.string().optional(),
  operating_temperature_min: z.string().optional(),
  operating_temperature_max: z.string().optional(),
  dimming_method: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  applications: z.string().optional(),
  package: z.string().optional(),
  moq: z.string().optional(),
  lead_time: z.string().optional(),
  price: z.string().optional()
})

export default function LEDDriverICForm() {
  const [manufacturers, setManufacturers] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  // 제조사와 카테고리 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      // 제조사 데이터 가져오기
      const { data: manufacturersData, error: manufacturersError } = await supabase
        .from('manufacturers')
        .select('*')
      
      if (manufacturersError) {
        console.error('제조사 데이터 로딩 오류:', manufacturersError)
      } else {
        setManufacturers(manufacturersData)
      }

      // 카테고리 데이터 가져오기 
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
      
      if (categoriesError) {
        console.error('카테고리 데이터 로딩 오류:', categoriesError)
      } else {
        setCategories(categoriesData)
      }
    }

    fetchData()
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      // Supabase에 데이터 저장
      const { data: result, error } = await supabase
        .from('led_driver_ics')
        .insert([{...data}])
        .select()

      if (error) throw error

      console.log("저장된 데이터:", result)
      form.reset()
      alert("LED Driver IC 데이터가 저장되었습니다.")
    } catch (error) {
      console.error("데이터 저장 오류:", error)
      alert("저장 실패. 다시 시도하세요.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <h1 className="text-lg font-bold">LED Driver IC 입력 폼</h1>
        
        {/* 기본 정보 섹션 */}
        <section className="space-y-2">
          <h2 className="text-md font-semibold">기본 정보</h2>
          <FormField
            control={form.control}
            name="part_number"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Part Number (예: MBI1801)" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="manufacturer_id"
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? manufacturers.find(
                              (manufacturer) => manufacturer.id === field.value
                            )?.name
                          : "제조사 선택"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="제조사 검색..." />
                      <CommandList>
                        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                        <CommandGroup>
                          {manufacturers.map((manufacturer) => (
                            <CommandItem
                              value={manufacturer.name}
                              key={manufacturer.id}
                              onSelect={() => {
                                form.setValue("manufacturer_id", manufacturer.id)
                              }}
                            >
                              {manufacturer.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  manufacturer.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? categories.find(
                              (category) => category.id === field.value
                            )?.name
                          : "카테고리 선택"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="카테고리 검색..." />
                      <CommandList>
                        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              value={category.name}
                              key={category.id}
                              onSelect={() => {
                                form.setValue("category_id", category.id)
                              }}
                            >
                              {category.name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  category.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="series"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Series (예: All-Ways-On)" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} placeholder="Subtitle (제품에 대한 간략한 설명)" />
                </FormControl>
              </FormItem>
            )}
          />
        </section>
        
        {/* 전기적 특성 섹션 */}
        <section className="space-y-2">
          <h2 className="text-md font-semibold">전기적 특성</h2>
          <FormField
            control={form.control}
            name="number_of_outputs"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="number" placeholder="Number of Outputs" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="output_current_min"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="number" placeholder="Output Current Min (mA)" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="output_voltage_max"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="number" placeholder="Output Voltage Max (V)" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="operating_temperature_min"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="number" placeholder="Operating Temperature Min (°C)" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="operating_temperature_max"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="number" placeholder="Operating Temperature Max (°C)" />
                </FormControl>
              </FormItem>
            )}
          />
        </section>
        
        {/* 기능 및 인증 섹션 */}
        <section className="space-y-2">
          <h2 className="text-md font-semibold">기능 및 인증</h2>
          <FormField
            control={form.control}
            name="dimming_method"
            render={({ field }) => (
              <FormItem>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? dimmingMethods.find(
                              (method) => method.value === field.value
                            )?.label
                          : "Dimming Method 선택"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Dimming Method 검색..." />
                      <CommandList>
                        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                        <CommandGroup>
                          {dimmingMethods.map((method) => (
                            <CommandItem
                              value={method.label}
                              key={method.value}
                              onSelect={() => {
                                form.setValue("dimming_method", method.value)
                              }}
                            >
                              {method.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  method.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="applications"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea {...field} placeholder="Applications (예: High-flux LED lighting)" />
                </FormControl>
              </FormItem>
            )}
          />
        </section>
        
        {/* 패키지 정보 섹션 */}
        <section className="space-y-2">
          <h2 className="text-md font-semibold">패키지 정보</h2>
          <FormField
            control={form.control}
            name="package"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="Package Type (예: SOP8L-150-1.27)" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="moq"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="number" placeholder="MOQ (최소 주문 수량)" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lead_time"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="number" placeholder="Lead Time (주 단위)" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type="number" step="0.01" placeholder="Price (USD)" />
                </FormControl>
              </FormItem>
            )}
          />
        </section>
        
        <Button type="submit" className="bg-blue-500 text-white">
          저장
        </Button>
      </form>
    </Form>
  );
}