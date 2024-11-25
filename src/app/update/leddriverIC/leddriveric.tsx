'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronsUpDown, Plus, Trash2, X } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
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
  FormLabel,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { db: { schema: 'dhp' }}
)

const FormSchema = z.object({
  // Product 정보
  name: z.string().min(1, "제품명은 필수입니다"),
  part_number: z.string().min(1, "Part Number는 필수입니다"),
  manufacturer_id: z.number({
    required_error: "제조사를 선택해주세요",
  }).nullable(),
  division_id: z.number({
    required_error: "구분을 선택해주세요",
  }).nullable(),
  description: z.string().optional(),
  images: z.array(z.object({
    title: z.string().optional(),
    url: z.string().min(1, "이미지 URL은 필수입니다"),
    description: z.string().optional()
  })).optional(),
  documents: z.array(z.object({
    title: z.string().min(1, "문서 제목은 필수입니다"),
    url: z.string().min(1, "문서 URL은 필수입니다"),
    type: z.string().optional()
  })),

  // LED Driver IC 정보
  category_id: z.number({
    required_error: "카테고리를 선택해주세요",
  }).nullable(),
  subtitle: z.string().optional(),
  number_of_outputs: z.number().min(1, "출력 수는 필수입니다").nullable(),
  topologies: z.array(z.string()),
  dimming_methods: z.array(z.string()),
  input_voltage_min: z.number().nullable(),
  input_voltage_max: z.number().nullable(),
  typical_input_voltage: z.number().nullable(),
  operating_frequency_min: z.number().nullable(),
  operating_frequency_max: z.number().nullable(),
  typical_operating_frequency: z.number().nullable(),
  output_current_min: z.number().nullable(),
  output_current_max: z.number().nullable(),
  typical_output_current: z.number().nullable(),
  output_voltage_min: z.number().nullable(),
  output_voltage_max: z.number().nullable(),
  typical_output_voltage: z.number().nullable(),
  operating_temperature_min: z.number().min(-273.15, "최소 동작 온도는 -273.15°C 이상이어야 합니다").nullable(),
  operating_temperature_max: z.number().min(-273.15, "최대 동작 온도는 -273.15°C 이상이어야 합니다").nullable(),
  category_specific_attributes: z.record(z.unknown()).optional(),

  // M:M 관계 테이블들
  certifications: z.array(z.number()),
  features: z.array(z.number()),
  applications: z.array(z.number()),

  // LED Driver IC 옵션 정보
  options: z.array(z.object({
    option_name: z.string().min(1, "옵션명은 필수입니다"),
    package_detail: z.string(),
    mounting_style: z.string().min(1, "실장 방식을 선택해주세요"),
    storage_type: z.string().optional(),
    notes: z.string().optional(),
    moq_start: z.number().nullable(),
    moq_step: z.number().nullable(),
    lead_time_min: z.number().nullable(),
    lead_time_max: z.number().nullable(),
    prices: z.record(z.unknown()).optional(),
    package_types: z.number().nullable(),
  }))
})

export default function LEDDriverICForm() {
  const [manufacturers, setManufacturers] = useState<any[]>([])
  const [divisions, setDivisions] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [packageTypes, setPackageTypes] = useState<any[]>([])
  const [certifications, setCertifications] = useState<any[]>([])
  const [features, setFeatures] = useState<any[]>([])
  const [applications, setApplications] = useState<any[]>([])
  const [mountingStyles, setMountingStyles] = useState<string[]>([])
  const [storageTypes, setStorageTypes] = useState<string[]>([])
  const [topologies, setTopologies] = useState<string[]>([])
  const [dimmingMethods, setDimmingMethods] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const router = useRouter();
    
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      part_number: '',
      manufacturer_id: null,
      division_id: null,
      description: '',
      images: [],
      documents: [],
      category_id: null,
      subtitle: '',
      number_of_outputs: null,
      topologies: [],
      dimming_methods: [],
      input_voltage_min: null,
      input_voltage_max: null,
      typical_input_voltage: null,
      operating_frequency_min: null,
      operating_frequency_max: null,
      typical_operating_frequency: null,
      output_current_min: null,
      output_current_max: null,
      typical_output_current: null,
      output_voltage_min: null,
      output_voltage_max: null,
      typical_output_voltage: null,
      operating_temperature_min: null,
      operating_temperature_max: null,
      category_specific_attributes: {},
      certifications: [],
      features: [],
      applications: [],
      options: [{
        option_name: '',
        package_detail: "",
        mounting_style: '',
        storage_type: '',
        notes: '',
        moq_start: null,
        moq_step: null,
        lead_time_min: null,
        lead_time_max: null,
        prices: {},
        package_types: null
      }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options"
  })

  const searchProducts = async (searchTerm: string) => {
    const { data, error } = await supabase
      .from('products')
      .select('id, name')
      .eq('name', searchTerm)
      .single()
    
    if (error) {
      console.error('제품 검색 오류:', error)
      return null
    }
    return data
  }

  const handleSearch = async (value: string) => {
    setSearchTerm(value)
    const result = await searchProducts(value)
    if (result) {
      handleProductSelect(result.id)
    }
  }

  const handleProductSelect = async (productId: string) => {
    setSelectedProduct(productId)
    await loadProductData(productId)
  }

  const loadProductData = async (productId: string) => {
    // 기본 데이터 가져오기
    const { data: manufacturersData } = await supabase.from('manufacturers').select('*')
    const { data: divisionsData } = await supabase.from('divisions').select('*')
    const { data: categoriesData } = await supabase.from('categories').select('*')
    const { data: packageTypesData } = await supabase.from('package_types').select('*')
    const { data: certificationsData } = await supabase.from('certifications').select('*')
    const { data: featuresData } = await supabase.from('features').select('*')
    const { data: applicationsData } = await supabase.from('applications').select('*')
    
    // Enum 타입 데이터 가져오기
    const { data: mountingStylesData } = await supabase.rpc('get_enum_values', {
        enum_type_name: 'mounting_style',
      });
    const { data: storageTypesData } = await supabase.rpc('get_enum_values', {
        enum_type_name: 'storage_type',
      });
    const { data: topologiesData } = await supabase.rpc('get_enum_values', {
        enum_type_name: 'topology',
      });
    const { data: dimmingMethodsData } = await supabase.rpc('get_enum_values', {
        enum_type_name: 'dimming_method',
      });

    // LED Driver IC 데이터 가져오기
    const { data: ledDriverData, error: ledDriverError } = await supabase
      .from('led_driver_ic')
      .select(`
        *,
        products (
          *,
          images (*),
          product_documents (
            documents (*)
          )
        ),
        led_driver_ic_certifications (certification_id),
        led_driver_ic_features (feature_id),
        led_driver_ic_applications (application_id),
        led_driver_ic_options (
          *,
          led_driver_ic_option_package_types (package_type_id)
        )
      `)
      .eq('id', productId)
      .single()

    if (ledDriverError) {
      console.error('LED Driver IC 데이터 로드 오류:', ledDriverError)
      alert('데이터를 불러오는데 실패했습니다.')
      return
    }

    setManufacturers(manufacturersData || [])
    setDivisions(divisionsData || [])
    setCategories(categoriesData || [])
    setPackageTypes(packageTypesData || [])
    setCertifications(certificationsData || [])
    setFeatures(featuresData || [])
    setApplications(applicationsData || [])
    setMountingStyles(mountingStylesData || [])
    setStorageTypes(storageTypesData || [])
    setTopologies(topologiesData || [])
    setDimmingMethods(dimmingMethodsData || [])

    // 폼 데이터 설정
    if (ledDriverData) {
      const product = ledDriverData.product
      const formData = {
        name: product.name,
        part_number: product.part_number,
        manufacturer_id: product.manufacturer_id,
        division_id: product.division_id,
        description: product.description || '',
        images: product.images,
        documents: product.product_documents.map(pd => pd.documents),
        category_id: ledDriverData.category_id,
        subtitle: ledDriverData.subtitle || '',
        number_of_outputs: ledDriverData.number_of_outputs,
        topologies: ledDriverData.topologies || [],
        dimming_methods: ledDriverData.dimming_methods || [],
        input_voltage_min: ledDriverData.input_voltage_range ? JSON.parse(ledDriverData.input_voltage_range)[0] : null,
        input_voltage_max: ledDriverData.input_voltage_range ? JSON.parse(ledDriverData.input_voltage_range)[1] : null,
        typical_input_voltage: ledDriverData.typical_input_voltage,
        operating_frequency_min: ledDriverData.operating_frequency_range ? JSON.parse(ledDriverData.operating_frequency_range)[0] : null,
        operating_frequency_max: ledDriverData.operating_frequency_range ? JSON.parse(ledDriverData.operating_frequency_range)[1] : null,
        typical_operating_frequency: ledDriverData.typical_operating_frequency,
        output_current_min: ledDriverData.output_current_range ? JSON.parse(ledDriverData.output_current_range)[0] : null,
        output_current_max: ledDriverData.output_current_range ? JSON.parse(ledDriverData.output_current_range)[1] : null,
        typical_output_current: ledDriverData.typical_output_current,
        output_voltage_min: ledDriverData.output_voltage_range ? JSON.parse(ledDriverData.output_voltage_range)[0] : null,
        output_voltage_max: ledDriverData.output_voltage_range ? JSON.parse(ledDriverData.output_voltage_range)[1] : null,
        typical_output_voltage: ledDriverData.typical_output_voltage,
        operating_temperature_min: ledDriverData.operating_temperature ? JSON.parse(ledDriverData.operating_temperature)[0] : null,
        operating_temperature_max: ledDriverData.operating_temperature ? JSON.parse(ledDriverData.operating_temperature)[1] : null,
        category_specific_attributes: ledDriverData.category_specific_attributes || {},
        certifications: ledDriverData.led_driver_ic_certifications.map(c => c.certification_id),
        features: ledDriverData.led_driver_ic_features.map(f => f.feature_id),
        applications: ledDriverData.led_driver_ic_applications.map(a => a.application_id),
        options: ledDriverData.led_driver_ic_options.map(option => ({
          option_name: option.option_name,
          package_detail: option.package_detail || '',
          mounting_style: option.mounting_style,
          storage_type: option.storage_type || '',
          notes: option.notes || '',
          moq_start: option.moq_start,
          moq_step: option.moq_step,
          lead_time_min: option.lead_time_range ? JSON.parse(option.lead_time_range)[0] : null,
          lead_time_max: option.lead_time_range ? JSON.parse(option.lead_time_range)[1] : null,
          prices: option.prices || {},
          package_types: option.led_driver_ic_option_package_types[0]?.package_type_id || null
        }))
      }
      form.reset(formData)
    }
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!selectedProduct) {
      alert("수정할 제품을 선택해주세요.")
      return
    }

    try {
      // 1. Product 테이블 업데이트
      const { data: productData, error: productError } = await supabase
        .from('products')
        .update({
          name: data.name,
          part_number: data.part_number,
          manufacturer_id: data.manufacturer_id,
          division_id: data.division_id,
          description: data.description || null
        })
        .eq('id', selectedProduct)
        .select()
        .single()

      if (productError) throw productError

      // 이미지 데이터 업데이트
      if (data.images && data.images.length > 0) {
        // 기존 이미지 삭제
        await supabase
          .from('images')
          .delete()
          .eq('product_id', productData.id)

        // 새 이미지 추가
        const { error: imagesError } = await supabase
          .from('images')
          .insert(
            data.images.map(image => ({
              ...image,
              product_id: productData.id
            }))
          )

        if (imagesError) throw imagesError
      }

      // 문서 데이터 업데이트
      if (data.documents && data.documents.length > 0) {
        // 기존 연결 삭제
        await supabase
          .from('product_documents')
          .delete()
          .eq('product_id', productData.id)

        // 새 문서 추가
        const { data: documentsData, error: documentsError } = await supabase
          .from('documents')
          .insert(data.documents)
          .select()

        if (documentsError) throw documentsError

        // 새 연결 추가
        const { error: productDocumentsError } = await supabase
          .from('product_documents')
          .insert(
            documentsData.map(doc => ({
              product_id: productData.id,
              document_id: doc.id
            }))
          )

        if (productDocumentsError) throw productDocumentsError
      }

      // 2. LED Driver IC 테이블 업데이트
      const { error: ledDriverError } = await supabase
        .from('led_driver_ic')
        .update({
          category_id: data.category_id,
          subtitle: data.subtitle || null,
          number_of_outputs: data.number_of_outputs,
          topologies: data.topologies,
          dimming_methods: data.dimming_methods,
          input_voltage_range: data.input_voltage_min !== null && data.input_voltage_max !== null ? 
            `[${data.input_voltage_min},${data.input_voltage_max}]` : null,
          typical_input_voltage: data.typical_input_voltage,
          operating_frequency_range: data.operating_frequency_min !== null && data.operating_frequency_max !== null ?
            `[${data.operating_frequency_min},${data.operating_frequency_max}]` : null,
          typical_operating_frequency: data.typical_operating_frequency,
          output_current_range: data.output_current_min !== null && data.output_current_max !== null ?
            `[${data.output_current_min},${data.output_current_max}]` : null,
          typical_output_current: data.typical_output_current,
          output_voltage_range: data.output_voltage_min !== null && data.output_voltage_max !== null ?
            `[${data.output_voltage_min},${data.output_voltage_max}]` : null,
          typical_output_voltage: data.typical_output_voltage,
          operating_temperature: data.operating_temperature_min !== null && data.operating_temperature_max !== null ?
            `[${data.operating_temperature_min},${data.operating_temperature_max}]` : null,
          category_specific_attributes: data.category_specific_attributes || null
        })
        .eq('id', selectedProduct)

      if (ledDriverError) throw ledDriverError

      // M:M 관계 테이블들 업데이트
      // 기존 데이터 삭제
      await Promise.all([
        supabase.from('led_driver_ic_certifications').delete().eq('led_driver_ic_id', selectedProduct),
        supabase.from('led_driver_ic_features').delete().eq('led_driver_ic_id', selectedProduct),
        supabase.from('led_driver_ic_applications').delete().eq('led_driver_ic_id', selectedProduct)
      ])

      // 새 데이터 추가
      if (data.certifications.length > 0) {
        const { error: certificationsError } = await supabase
          .from('led_driver_ic_certifications')
          .insert(
            data.certifications.map(certId => ({
              led_driver_ic_id: selectedProduct,
              certification_id: certId
            }))
          )

        if (certificationsError) throw certificationsError
      }

      if (data.features.length > 0) {
        const { error: featuresError } = await supabase
          .from('led_driver_ic_features')
          .insert(
            data.features.map(featureId => ({
              led_driver_ic_id: selectedProduct,
              feature_id: featureId
            }))
          )

        if (featuresError) throw featuresError
      }

      if (data.applications.length > 0) {
        const { error: applicationsError } = await supabase
          .from('led_driver_ic_applications')
          .insert(
            data.applications.map(appId => ({
              led_driver_ic_id: selectedProduct,
              application_id: appId
            }))
          )

        if (applicationsError) throw applicationsError
      }

      // 3. LED Driver IC 옵션 테이블 업데이트
      // 기존 옵션 삭제
      await supabase
        .from('led_driver_ic_options')
        .delete()
        .eq('product_id', selectedProduct)

      // 새 옵션 추가
      for (const option of data.options) {
        const { data: optionData, error: optionError } = await supabase
          .from('led_driver_ic_options')
          .insert({
            product_id: selectedProduct,
            option_name: option.option_name,
            package_detail: option.package_detail || null,
            mounting_style: option.mounting_style,
            storage_type: option.storage_type || null,
            notes: option.notes || null,
            moq_start: option.moq_start,
            moq_step: option.moq_step,
            lead_time_range: option.lead_time_min !== null && option.lead_time_max !== null ?
              `[${option.lead_time_min},${option.lead_time_max}]` : null,
            prices: option.prices || null
          })
          .select()
          .single()

        if (optionError) throw optionError

        // 4. 패키지 타입 연결 테이블 업데이트
        if (option.package_types !== null) {
          const { error: packageTypeError } = await supabase
            .from('led_driver_ic_option_package_types')
            .insert({
              option_id: optionData.id,
              package_type_id: option.package_types
            })

          if (packageTypeError) throw packageTypeError
        }
      }

      alert("LED Driver IC 데이터가 수정되었습니다.")
      router.push('/products')
    } catch (error) {
      console.error("데이터 수정 오류:", error)
      alert("수정 실패. 다시 시도하세요.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">제품 검색</h2>
            <div className="flex gap-2">
              <Input
                placeholder="제품명을 입력하세요" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[300px]"
              />
              <Button 
                type="button"
                onClick={() => handleSearch(searchTerm)}
                variant="outline"
              >
                검색
              </Button>
            </div>
          </div>

          <h2 className="text-lg font-bold">제품 기본 정보</h2>
          
          {/* 제품 기본 정보 필드들 */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    제품명
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="제품명을 입력하세요" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="part_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    Part Number
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Part Number를 입력하세요" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* 제조사, 구분 선택 ComboBox */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="manufacturer_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    제조사
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
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
                            ? manufacturers.find(m => m.id === field.value)?.name
                            : "제조사 선택"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="제조사 검색..." />
                        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                        <CommandGroup>
                          {manufacturers.map((manufacturer) => (
                            <CommandItem
                              key={manufacturer.id}
                              value={manufacturer.name}
                              onSelect={() => {
                                form.setValue("manufacturer_id", manufacturer.id)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  manufacturer.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {manufacturer.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="division_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    구분
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
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
                            ? divisions.find(d => d.id === field.value)?.name
                            : "구분 선택"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="구분 검색..." />
                        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                        <CommandGroup>
                          {divisions.map((division) => (
                            <CommandItem
                              key={division.id}
                              value={division.name}
                              onSelect={() => {
                                form.setValue("division_id", division.id)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  division.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {division.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  설명
                  {field.value && <Check className="h-4 w-4 text-green-500" />}
                </FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="제품 설명을 입력하세요" />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">제품 이미지</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const currentImages = form.getValues("images") || [];
                  form.setValue("images", [
                    ...currentImages,
                    { title: "", url: "", description: "" }
                  ]);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                이미지 추가
              </Button>
            </div>

            {form.watch("images")?.map((_, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">이미지 {index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const currentImages = form.getValues("images") || [];
                      form.setValue(
                        "images",
                        currentImages.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`images.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          이미지 제목
                          {field.value && <Check className="h-4 w-4 text-green-500" />}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="이미지 제목을 입력하세요" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`images.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          이미지 URL
                          {field.value && <Check className="h-4 w-4 text-green-500" />}
                        </FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="이미지 URL을 입력하세요"
                            onBlur={(e) => {
                              field.onBlur();
                              // URL이 유효한지 확인
                              const img = new Image();
                              img.onload = () => {
                                console.log("이미지가 정상적으로 로드되었습니다.");
                              };
                              img.onerror = () => {
                                console.error("이미지 URL이 유효하지 않습니다.");
                                form.setError(`images.${index}.url`, {
                                  type: "manual",
                                  message: "유효하지 않은 이미지 URL입니다."
                                });
                              };
                              img.src = e.target.value;
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`images.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="flex items-center gap-2">
                          이미지 설명
                          {field.value && <Check className="h-4 w-4 text-green-500" />}
                        </FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="이미지에 대한 설명을 입력하세요" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 문서 정보 */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">문서 정보</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const documents = form.getValues("documents") || []
                  form.setValue("documents", [
                    ...documents,
                    { title: "", url: "", type: "" }
                  ])
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                문서 추가
              </Button>
            </div>

            {form.watch("documents")?.map((_, index) => (
              <div key={index} className="space-y-4 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">문서 {index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const documents = form.getValues("documents")
                      form.setValue(
                        "documents",
                        documents.filter((_, i) => i !== index)
                      )
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name={`documents.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          문서 제목
                          {field.value && <Check className="h-4 w-4 text-green-500" />}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="문서 제목을 입력하세요" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`documents.${index}.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          문서 URL
                          {field.value && <Check className="h-4 w-4 text-green-500" />}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="문서 URL을 입력하세요" />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`documents.${index}.type`}
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel className="flex items-center gap-2">
                          문서 유형
                          {field.value && <Check className="h-4 w-4 text-green-500" />}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="문서 유형을 입력하세요" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LED Driver IC 상세 정보 */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold">LED Driver IC 상세 정보</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="category_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    카테고리
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
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
                            ? categories.find(c => c.id === field.value)?.name
                            : "카테고리 선택"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="카테고리 검색..." />
                        <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                        <CommandGroup className="max-h-[200px] overflow-y-auto">
                          {categories.map((category) => (
                            <CommandItem
                              key={category.id}
                              value={category.name}
                              onSelect={() => {
                                form.setValue("category_id", category.id)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  category.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {category.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    부제목
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="부제목을 입력하세요" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="number_of_outputs" 
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  출력 수
                  {field.value && <Check className="h-4 w-4 text-green-500" />}
                </FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="number"
                    min="1"
                    placeholder="출력 수를 입력하세요"
                    onChange={e => field.onChange(Number(e.target.value))}
                    value={field.value ?? ''} 
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="input_voltage_min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    최소 입력 전압 (V)
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      type="number" 
                      step="0.1"
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                      placeholder="최소 입력 전압을 입력하세요"
                      value={field.value ?? ''} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="input_voltage_max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    최대 입력 전압 (V)
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.1" onChange={e => field.onChange(parseFloat(e.target.value))} placeholder="최대 입력 전압을 입력하세요" value={field.value ?? ''} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="typical_input_voltage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  일반적인 입력 전압 (V)
                  {field.value && <Check className="h-4 w-4 text-green-500" />}
                </FormLabel>
                <FormControl>
                  <Input {...field} type="number" step="0.1" onChange={e => field.onChange(parseFloat(e.target.value))} placeholder="일반적인 입력 전압을 입력하세요" value={field.value ?? ''} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="operating_frequency_min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    최소 동작 주파수 (Hz)
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.1" onChange={e => field.onChange(parseFloat(e.target.value))} placeholder="최소 동작 주파수를 입력하세요" value={field.value ?? ''} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="operating_frequency_max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    최대 동작 주파수 (Hz)
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.1" onChange={e => field.onChange(parseFloat(e.target.value))} placeholder="최대 동작 주파수를 입력하세요" value={field.value ?? ''} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="typical_operating_frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  일반적인 동작 주파수 (Hz)
                  {field.value && <Check className="h-4 w-4 text-green-500" />}
                </FormLabel>
                <FormControl>
                  <Input {...field} type="number" step="0.1" onChange={e => field.onChange(parseFloat(e.target.value))} placeholder="일반적인 동작 주파수를 입력하세요" value={field.value ?? ''} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="output_current_min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    최소 출력 전류 (mA)
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.1" onChange={e => field.onChange(parseFloat(e.target.value))} placeholder="최소 출력 전류를 입력하세요" value={field.value ?? ''} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="output_current_max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    최대 출력 전류 (mA)
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.1" onChange={e => field.onChange(parseFloat(e.target.value))} placeholder="최대 출력 전류를 입력하세요" value={field.value ?? ''} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="typical_output_current"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  일반적인 출력 전류 (mA)
                  {field.value && <Check className="h-4 w-4 text-green-500" />}
                </FormLabel>
                <FormControl>
                  <Input {...field} type="number" step="0.1" onChange={e => field.onChange(parseFloat(e.target.value))} placeholder="일반적인 출력 전류를 입력하세요" value={field.value ?? ''} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="output_voltage_min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    최소 출력 전압 (V)
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.1" onChange={e => field.onChange(parseFloat(e.target.value))} placeholder="최소 출력 전압을 입력하세요" value={field.value ?? ''} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="output_voltage_max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    최대 출력 전압 (V)
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.1" onChange={e => field.onChange(parseFloat(e.target.value))} placeholder="최대 출력 전압을 입력하세요" value={field.value ?? ''} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="typical_output_voltage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  일반적인 출력 전압 (V)
                  {field.value && <Check className="h-4 w-4 text-green-500" />}
                </FormLabel>
                <FormControl>
                  <Input {...field} type="number" step="0.1" onChange={e => field.onChange(parseFloat(e.target.value))} placeholder="일반적인 출력 전압을 입력하세요" value={field.value ?? ''} />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="operating_temperature_min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    최소 동작 온도 (°C)
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="1" onChange={e => field.onChange(parseInt(e.target.value))} placeholder="최소 동작 온도를 입력하세요" value={field.value ?? ''} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="operating_temperature_max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    최대 동작 온도 (°C)
                    {field.value && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="1" onChange={e => field.onChange(parseInt(e.target.value))} placeholder="최대 동작 온도를 입력하세요" value={field.value ?? ''} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="topologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    토폴로지
                    {field.value?.length > 0 && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
                  <div className="space-y-2">
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                          >
                            토폴로지 선택
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0">
                          <Command>
                            <CommandInput placeholder="토폴로지 검색..." />
                            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                            <CommandGroup className="max-h-[200px] overflow-y-auto">
                              {topologies.map((topology) => (
                                <CommandItem
                                  key={topology}
                                  onSelect={() => {
                                    const values = field.value || []
                                    const newValue = values.includes(topology)
                                      ? values.filter((v) => v !== topology)
                                      : [...values, topology]
                                    field.onChange(newValue)
                                  }}
                                >
                                  <Checkbox
                                    checked={field.value?.includes(topology)}
                                    className="mr-2"
                                  />
                                  {topology}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <div className="flex flex-wrap gap-2">
                      {field.value?.map((topology) => (
                        <Button
                          key={topology}
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            field.onChange(field.value?.filter((v) => v !== topology))
                          }}
                        >
                          {topology}
                          <X className="ml-2 h-3 w-3" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dimming_methods"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    디밍 방식
                    {field.value?.length > 0 && <Check className="h-4 w-4 text-green-500" />}
                  </FormLabel>
                  <div className="space-y-2">
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-between"
                          >
                            디밍 방식 선택
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-0">
                          <Command>
                            <CommandInput placeholder="디밍 방식 검색..." />
                            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                            <CommandGroup className="max-h-[200px] overflow-y-auto">
                              {dimmingMethods.map((method) => (
                                <CommandItem
                                  key={method}
                                  onSelect={() => {
                                    const values = field.value || []
                                    const newValue = values.includes(method)
                                      ? values.filter((v) => v !== method)
                                      : [...values, method]
                                    field.onChange(newValue)
                                  }}
                                >
                                  <Checkbox
                                    checked={field.value?.includes(method)}
                                    className="mr-2"
                                  />
                                  {method}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <div className="flex flex-wrap gap-2">
                      {field.value?.map((method) => (
                        <Button
                          key={method}
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            field.onChange(field.value?.filter((v) => v !== method))
                          }}
                        >
                          {method}
                          <X className="ml-2 h-3 w-3" />
                        </Button>
                      ))}
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-bold">인증 및 특징</h2>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="certifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>인증</FormLabel>
                    <div className="space-y-2">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                            >
                              인증 선택
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[400px] p-0">
                            <Command>
                              <CommandInput placeholder="인증 검색..." />
                              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                              <CommandGroup className="max-h-[200px] overflow-y-auto">
                                {certifications.map((cert) => (
                                  <CommandItem
                                    key={cert.id}
                                    onSelect={() => {
                                      const values = field.value || []
                                      const newValue = values.includes(cert.id)
                                        ? values.filter((v) => v !== cert.id)
                                        : [...values, cert.id]
                                      field.onChange(newValue)
                                    }}
                                  >
                                    <Checkbox
                                      checked={field.value?.includes(cert.id)}
                                      className="mr-2"
                                    />
                                    {cert.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
                        {field.value?.map((certId) => {
                          const cert = certifications.find(c => c.id === certId)
                          return (
                            <Button
                              key={certId}
                              variant="secondary"
                              size="sm"
                              onClick={() => {
                                field.onChange(field.value?.filter((v) => v !== certId))
                              }}
                            >
                              {cert?.name}
                              <X className="ml-2 h-3 w-3" />
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>특징</FormLabel>
                    <div className="space-y-2">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                            >
                              특징 선택
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[400px] p-0">
                            <Command>
                              <CommandInput placeholder="특징 검색..." />
                              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                              <CommandGroup className="max-h-[200px] overflow-y-auto">
                                {features.map((feature) => (
                                  <CommandItem
                                    key={feature.id}
                                    onSelect={() => {
                                      const values = field.value || []
                                      const newValue = values.includes(feature.id)
                                        ? values.filter((v) => v !== feature.id)
                                        : [...values, feature.id]
                                      field.onChange(newValue)
                                    }}
                                  >
                                    <Checkbox
                                      checked={field.value?.includes(feature.id)}
                                      className="mr-2"
                                    />
                                    {feature.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
                        {field.value?.map((featureId) => {
                          const feature = features.find(f => f.id === featureId)
                          return (
                            <Button
                              key={featureId}
                              variant="secondary"
                              size="sm"
                              onClick={() => {
                                field.onChange(field.value?.filter((v) => v !== featureId))
                              }}
                            >
                              {feature?.name}
                              <X className="ml-2 h-3 w-3" />
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="applications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>응용분야</FormLabel>
                    <div className="space-y-2">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-between"
                            >
                              응용분야 선택
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[400px] p-0">
                            <Command>
                              <CommandInput placeholder="응용분야 검색..." />
                              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                              <CommandGroup className="max-h-[200px] overflow-y-auto">
                                {applications.map((app) => (
                                  <CommandItem
                                    key={app.id}
                                    onSelect={() => {
                                      const values = field.value || []
                                      const newValue = values.includes(app.id)
                                        ? values.filter((v) => v !== app.id)
                                        : [...values, app.id]
                                      field.onChange(newValue)
                                    }}
                                  >
                                    <Checkbox
                                      checked={field.value?.includes(app.id)}
                                      className="mr-2"
                                    />
                                    {app.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto">
                        {field.value?.map((appId) => {
                          const app = applications.find(a => a.id === appId)
                          return (
                            <Button
                              key={appId}
                              variant="secondary"
                              size="sm"
                              onClick={() => {
                                field.onChange(field.value?.filter((v) => v !== appId))
                              }}
                            >
                              {app?.name}
                              <X className="ml-2 h-3 w-3" />
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-bold">추가 속성</h2>
            <FormField
              control={form.control}
              name="category_specific_attributes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>속성 트리</FormLabel>
                  <div className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newValue = {
                            ...(field.value || {}),
                            [`새 속성 ${Object.keys(field.value || {}).length + 1}`]: ""
                          }
                          field.onChange(newValue)
                        }}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        최상위 속성 추가
                      </Button>
                    </div>

                    {Object.entries(field.value || {}).map(([key, value], index) => (
                      <div key={index} className="space-y-2 pl-4">
                        <div className="flex items-center gap-2">
                          <Input
                            value={key}
                            onChange={(e) => {
                              try {
                                const newValue = JSON.parse(JSON.stringify(field.value || {}))
                                const oldValue = newValue[key]
                                delete newValue[key]
                                newValue[e.target.value] = oldValue
                                field.onChange(newValue)
                              } catch (error) {
                                console.error('속성 이름 변경 중 오류:', error)
                              }
                            }}
                            className="w-48"
                            placeholder="속성 이름"
                          />
                          {typeof value === 'object' ? (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                try {
                                  const newValue = JSON.parse(JSON.stringify(field.value || {}))
                                  if (!newValue[key]) newValue[key] = {}
                                  newValue[key][`하위 속성 ${Object.keys(newValue[key]).length + 1}`] = ''
                                  field.onChange(newValue)
                                } catch (error) {
                                  console.error('하위 속성 추가 중 오류:', error)
                                }
                              }}
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              하위 속성 추가
                            </Button>
                          ) : (
                            <Input
                              value={value as string}
                              onChange={(e) => {
                                try {
                                  const newValue = JSON.parse(JSON.stringify(field.value || {}))
                                  newValue[key] = e.target.value
                                  field.onChange(newValue)
                                } catch (error) {
                                  console.error('값 변경 중 오류:', error)
                                }
                              }}
                              className="w-48"
                              placeholder="값"
                            />
                          )}
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              try {
                                const newValue = JSON.parse(JSON.stringify(field.value || {}))
                                if (typeof value === 'string') {
                                  newValue[key] = {}
                                } else {
                                  newValue[key] = ''
                                }
                                field.onChange(newValue)
                              } catch (error) {
                                console.error('타입 변경 중 오류:', error)
                              }
                            }}
                          >
                            {typeof value === 'string' ? '객체로 변경' : '값으로 변경'}
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              try {
                                const newValue = JSON.parse(JSON.stringify(field.value || {}))
                                delete newValue[key]
                                field.onChange(newValue)
                              } catch (error) {
                                console.error('속성 삭제 중 오류:', error)
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {typeof value === 'object' && Object.entries(value as Record<string, unknown>).map(([subKey, subValue], subIndex) => (
                          <div key={subIndex} className="pl-4 flex items-center gap-2">
                            <Input
                              value={subKey}
                              onChange={(e) => {
                                try {
                                  const newValue = JSON.parse(JSON.stringify(field.value || {}))
                                  const oldValue = newValue[key][subKey]
                                  delete newValue[key][subKey]
                                  newValue[key][e.target.value] = oldValue
                                  field.onChange(newValue)
                                } catch (error) {
                                  console.error('하위 속성 이름 변경 중 오류:', error)
                                }
                              }}
                              className="w-48"
                              placeholder="하위 속성 이름"
                            />
                            <Input
                              value={subValue as string}
                              onChange={(e) => {
                                try {
                                  const newValue = JSON.parse(JSON.stringify(field.value || {}))
                                  newValue[key][subKey] = e.target.value
                                  field.onChange(newValue)
                                } catch (error) {
                                  console.error('하위 속성 값 변경 중 오류:', error)
                                }
                              }}
                              className="w-48"
                              placeholder="값"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                try {
                                  const newValue = JSON.parse(JSON.stringify(field.value || {}))
                                  delete newValue[key][subKey]
                                  field.onChange(newValue)
                                } catch (error) {
                                  console.error('하위 속성 삭제 중 오류:', error)
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </div>

        </div>

        {/* LED Driver IC 옵션 정보 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">옵션 정보</h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({
                option_name: "",
                package_detail: "",
                mounting_style: "",
                storage_type: "",
                notes: "",
                moq_start: null,
                moq_step: null,
                lead_time_min: null,
                lead_time_max: null,
                prices: {},
                package_types: null
              })}
            >
              <Plus className="mr-2 h-4 w-4" />
              옵션 추가
            </Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">옵션 {index + 1}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`options.${index}.option_name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>옵션명</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="옵션명을 입력하세요" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`options.${index}.package_detail`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>패키지 상세</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="패키지 상세 정보를 입력하세요" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`options.${index}.mounting_style`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>실장 방식</FormLabel>
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
                              {field.value || "실장 방식 선택"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="실장 방식 검색..." />
                            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                            <CommandGroup>
                              {mountingStyles.map((style) => (
                                <CommandItem
                                  key={style}
                                  value={style}
                                  onSelect={() => field.onChange(style)}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === style ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {style}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`options.${index}.storage_type`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>보관 방식</FormLabel>
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
                              {field.value || "보관 방식 선택"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="보관 방식 검색..." />
                            <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
                            <CommandGroup>
                              {storageTypes.map((type) => (
                                <CommandItem
                                  key={type}
                                  value={type}
                                  onSelect={() => field.onChange(type)}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === type ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {type}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`options.${index}.moq_start`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>최소 주문 수량</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)} placeholder="최소 주문 수량을 입력하세요" value={field.value ?? ''} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`options.${index}.moq_step`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>주문 단위</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)} placeholder="주문 단위를 입력하세요" value={field.value ?? ''} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`options.${index}.lead_time_min`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>최소 리드타임 (일)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)} placeholder="최소 리드타임을 입력하세요" value={field.value ?? ''} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`options.${index}.lead_time_max`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>최대 리드타임 (일)</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : null)} placeholder="최대 리드타임을 입력하세요" value={field.value ?? ''} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`options.${index}.notes`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비고</FormLabel>
                    <FormControl>
                      <Textarea {...field} placeholder="추가 정보를 입력하세요" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`options.${index}.package_types`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>패키지 타입</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) => {
                          field.onChange(parseInt(value))
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="패키지 타입 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          {packageTypes.map((pt) => (
                            <SelectItem key={pt.id} value={pt.id.toString()}>
                              {pt.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`options.${index}.prices`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>가격 정보</FormLabel>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">가격 구간 설정</h4>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const newPrices = {
                                ...(field.value || {}),
                                [`type_${Object.keys(field.value || {}).length + 1}`]: {
                                  type: "",
                                  ranges: {}
                                }
                              };
                              field.onChange(newPrices);
                            }}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            가격 형식 추가
                          </Button>
                        </div>
                      </div>

                      {Object.entries(field.value || {}).map(([typeKey, typeValue]: [string, any], typeIndex) => (
                        <div key={typeKey} className="space-y-4 p-4 border rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                              <Input
                                value={typeValue.type}
                                onChange={(e) => {
                                  const newPrices = { ...field.value };
                                  newPrices[typeKey] = {
                                    ...typeValue,
                                    type: e.target.value
                                  };
                                  field.onChange(newPrices);
                                }}
                                placeholder="형식 이름 (예: 컷테이프, 릴)"
                                className="w-48"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const newPrices = { ...field.value };
                                  newPrices[typeKey] = {
                                    ...typeValue,
                                    ranges: {
                                      ...typeValue.ranges,
                                      [`${Object.keys(typeValue.ranges || {}).length + 1}`]: ""
                                    }
                                  };
                                  field.onChange(newPrices);
                                }}
                              >
                                <Plus className="mr-2 h-4 w-4" />
                                구간 추가
                              </Button>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                const newPrices = { ...field.value };
                                delete newPrices[typeKey];
                                field.onChange(newPrices);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          {Object.entries(typeValue.ranges || {}).map(([quantity, price], idx) => (
                            <div key={idx} className="flex items-center gap-4">
                              <div className="flex-1">
                                <Input
                                  type="number"
                                  placeholder="수량"
                                  value={quantity}
                                  onChange={(e) => {
                                    const newPrices = { ...field.value };
                                    const oldPrice = typeValue.ranges[quantity];
                                    const newRanges = { ...typeValue.ranges };
                                    delete newRanges[quantity];
                                    newRanges[parseInt(e.target.value)] = oldPrice;
                                    newPrices[typeKey] = {
                                      ...typeValue,
                                      ranges: newRanges
                                    };
                                    field.onChange(newPrices);
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <Input
                                  type="number"
                                  placeholder="가격 (원)"
                                  value={price}
                                  onChange={(e) => {
                                    const newPrices = { ...field.value };
                                    newPrices[typeKey] = {
                                      ...typeValue,
                                      ranges: {
                                        ...typeValue.ranges,
                                        [quantity]: parseInt(e.target.value)
                                      }
                                    };
                                    field.onChange(newPrices);
                                  }}
                                />
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const newPrices = { ...field.value };
                                  const newRanges = { ...typeValue.ranges };
                                  delete newRanges[quantity];
                                  newPrices[typeKey] = {
                                    ...typeValue,
                                    ranges: newRanges
                                  };
                                  field.onChange(newPrices);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        <Button 
          type="submit" 
          className="w-full"
          onClick={() => {
            console.log('폼 데이터:', form.getValues())
          }}
        >
          저장
        </Button>
      </form>
    </Form>
  )
}
