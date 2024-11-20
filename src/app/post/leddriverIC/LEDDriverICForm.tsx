'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
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
  { db: { schema: 'dhp' }}
)

const FormSchema = z.object({
  part_number: z.string().min(1, "Part Number는 필수입니다"),
  manufacturer_id: z.number({
    required_error: "제조사를 선택해주세요",
  }),
  category_id: z.number({
    required_error: "카테고리를 선택해주세요",
  }),
  subtitle: z.string().optional(),
  number_of_outputs: z.number().min(1, "출력 수는 필수입니다"),
  input_voltage_min: z.number().optional(),
  input_voltage_max: z.number().optional(),
  typical_input_voltage: z.number().optional(),
  operating_frequency_min: z.number().optional(), 
  operating_frequency_max: z.number().optional(),
  typical_operating_frequency: z.number().optional(),
  output_current_min: z.number().optional(),
  output_current_max: z.number().optional(),
  typical_output_current: z.number().optional(),
  output_voltage_min: z.number().optional(),
  output_voltage_max: z.number().optional(),
  typical_output_voltage: z.number().optional(),
  operating_temperature_min: z.number().min(-273.15, "최소 동작 온도는 -273.15°C 이상이어야 합니다"),
  operating_temperature_max: z.number().min(-273.15, "최대 동작 온도는 -273.15°C 이상이어야 합니다"),
  category_specific_attributes: z.record(z.unknown()).optional()
})

export default function LEDDriverICForm() {
  const [manufacturers, setManufacturers] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

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
        .from('led_driver_ic')
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
        </section>

        {/* 전기적 특성 섹션 */}
        <section className="space-y-2">
          <h2 className="text-md font-semibold">전기적 특성</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="input_voltage_min"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="number" step="0.01" placeholder="최소 입력 전압 (V)" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="input_voltage_max"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="number" step="0.01" placeholder="최대 입력 전압 (V)" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="output_current_min"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="number" step="0.01" placeholder="최소 출력 전류 (mA)" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="output_current_max"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="number" step="0.01" placeholder="최대 출력 전류 (mA)" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="operating_temperature_min"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="number" step="0.1" placeholder="최소 동작 온도 (°C)" />
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
                    <Input {...field} type="number" step="0.1" placeholder="최대 동작 온도 (°C)" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </section>

        <Button type="submit" className="bg-blue-500 text-white">
          저장
        </Button>
      </form>
    </Form>
  )
}
