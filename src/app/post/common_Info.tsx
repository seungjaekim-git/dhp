'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@supabase/supabase-js"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ChevronsUpDown, Trash2 } from "lucide-react"
import { Command, CommandItem, CommandGroup, CommandInput, CommandEmpty } from "@/components/ui/command"
import { Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"


// Supabase 클라이언트 초기화
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { db: { schema: 'dhp' }}
)

// 제조사 폼 스키마
const ManufacturerFormSchema = z.object({
  name: z.string().min(1, "제조사명은 필수입니다"),
  country: z.string().optional(),
  website: z.string().url().optional(),
  division_id: z.number().optional()

})

// 구분 폼 스키마 
const DivisionFormSchema = z.object({
  name: z.string().min(1, "구분명은 필수입니다"),
  description: z.string().optional()
})

// 카테고리 폼 스키마
const CategoryFormSchema = z.object({
  name: z.string().min(1, "카테고리명은 필수입니다"),
  parent_id: z.number().optional(),
  description: z.string().optional()
})

// 인증 폼 스키마
const CertificationFormSchema = z.object({
  name: z.string().min(1, "인증명은 필수입니다"),
  description: z.string().optional()
})

// 애플리케이션 폼 스키마
const ApplicationFormSchema = z.object({
  name: z.string().min(1, "애플리케이션명은 필수입니다"),
})

// 특징 폼 스키마
const FeatureFormSchema = z.object({
  description: z.string().min(1, "특징 설명은 필수입니다")
})

// 패키지 유형 폼 스키마
const PackageTypeFormSchema = z.object({
  name: z.string().min(1, "패키지 유형명은 필수입니다"),
  description: z.string().optional()
})

// 제조사 폼 컴포넌트
export function ManufacturerForm() {
  const form = useForm<z.infer<typeof ManufacturerFormSchema>>({
    resolver: zodResolver(ManufacturerFormSchema)
  })

  const [divisions, setDivisions] = useState<any[]>([])
  const [countries, setCountries] = useState<any[]>([])

  useEffect(() => {
    const fetchDivisions = async () => {
      const { data, error } = await supabase
        .from('divisions')
        .select('*')
      
      if (error) {
        console.error('구분 데이터 로딩 오류:', error)
      } else {
        setDivisions(data || [])
      }
    }

    const fetchCountries = async () => {
      const { data, error } = await supabase
        .rpc('get_enum_values', {
          enum_type_name: 'country',
        });
      console.log(data);
      if (error) {
        console.error('국가 데이터 로딩 오류:', error)
      } else {
        setCountries(data || [])
      }
    }
    fetchDivisions()
    fetchCountries()
  }, [])

  const onSubmit = async (data: z.infer<typeof ManufacturerFormSchema>) => {
    try {
      const { error } = await supabase
        .from('manufacturers')
        .insert([data])
      
      if (error) throw error
      
      form.reset()
      alert("제조사 정보가 저장되었습니다.")
    } catch (error) {
      console.error("저장 오류:", error)
      alert("저장에 실패했습니다.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제조사명</FormLabel>
              <FormControl>
                <Input {...field} placeholder="제조사명을 입력하세요" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>국가</FormLabel>
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
                      onClick={() => {
                        if (!field.value) {
                          form.setValue("country", "");
                        }
                      }}
                    >
                      {field.value
                        ? countries.find(
                            (country) => country === field.value
                          )
                        : "국가를 선택하세요"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="국가 검색..." />
                    <CommandEmpty>국가를 찾을 수 없습니다.</CommandEmpty>
                    <CommandGroup>
                      {countries.map((country) => (
                        console.log(country),
                        <CommandItem
                          value={country}
                          key={country}
                          onSelect={() => {
                            form.setValue("country", country);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              country === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {country}
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
              <FormLabel>구분</FormLabel>
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
                        ? divisions.find(
                            (division) => division.id === field.value
                          )?.name
                        : "구분을 선택하세요"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="구분 검색..." />
                    <CommandEmpty>구분을 찾을 수 없습니다.</CommandEmpty>
                    <CommandGroup>
                      {divisions.map((division) => (
                        <CommandItem
                          value={division.name}
                          key={division.id}
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

        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>웹사이트</FormLabel>
              <FormControl>
                <Input {...field} type="url" placeholder="웹사이트 URL을 입력하세요" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">저장</Button>
      </form>
    </Form>
  )
}

// 구분 폼 컴포넌트
export function DivisionForm() {
  const form = useForm<z.infer<typeof DivisionFormSchema>>({
    resolver: zodResolver(DivisionFormSchema)
  })

  const onSubmit = async (data: z.infer<typeof DivisionFormSchema>) => {
    try {
      const { error } = await supabase
        .from('divisions')
        .insert([data])
      
      if (error) throw error
      
      form.reset()
      alert("구분 정보가 저장되었습니다.")
    } catch (error) {
      console.error("저장 오류:", error)
      alert("저장에 실패했습니다.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>구분명</FormLabel>
              <FormControl>
                <Input {...field} placeholder="구분명을 입력하세요" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>설명</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="설명을 입력하세요" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">저장</Button>
      </form>
    </Form>
  )
}

// 카테고리 폼 컴포넌트
export function CategoryForm() {
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: '',
      parent_id: undefined,
      description: ''
    }
  })

  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('id')
      
      if (error) throw error
      setCategories(data || [])
    } catch (error) {
      console.error("카테고리 조회 오류:", error)
    }
  }

  const buildCategoryTree = (categories: any[], parentId: number | null = null): any[] => {
    return categories
      .filter(category => category.parent_id === parentId)
      .map(category => ({
        ...category,
        children: buildCategoryTree(categories, category.id)
      }))
  }

  const renderCategoryTree = (node: any, depth = 0) => {
    return (
      <div key={node.id} className="space-y-2">
        <div className="flex items-center gap-2" style={{ marginLeft: `${depth * 20}px` }}>
          <span>{node.name}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              form.setValue('parent_id', node.id)
            }}
          >
            하위 카테고리 추가
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={async () => {
              try {
                const { error } = await supabase
                  .from('categories')
                  .delete()
                  .eq('id', node.id)
                
                if (error) throw error
                fetchCategories()
              } catch (error) {
                console.error("카테고리 삭제 오류:", error)
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        {node.children?.map((child: any) => renderCategoryTree(child, depth + 1))}
      </div>
    )
  }

  const onSubmit = async (data: z.infer<typeof CategoryFormSchema>) => {
    try {
      const { error } = await supabase
        .from('categories')
        .insert([data])
      
      if (error) throw error
      
      form.reset()
      fetchCategories()
      alert("카테고리 정보가 저장되었습니다.")
    } catch (error) {
      console.error("저장 오류:", error)
      alert("저장에 실패했습니다.")
    }
  }

  const categoryTree = buildCategoryTree(categories)

  return (
    <div className="space-y-8">
      <div className="border rounded-lg p-4">
        <h3 className="font-semibold mb-4">카테고리 트리</h3>
        <div className="space-y-2">
          {categoryTree.map(node => renderCategoryTree(node))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>카테고리명</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="카테고리명을 입력하세요" />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parent_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>상위 카테고리</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value === 'null' ? null : Number(value))}
                    value={field.value?.toString() || 'null'}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="상위 카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="null">최상위 카테고리</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>설명</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="설명을 입력하세요" />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">저장</Button>
        </form>
      </Form>
    </div>
  )
}

// 인증 폼 컴포넌트
export function CertificationForm() {
  const form = useForm<z.infer<typeof CertificationFormSchema>>({
    resolver: zodResolver(CertificationFormSchema)
  })

  const onSubmit = async (data: z.infer<typeof CertificationFormSchema>) => {
    try {
      const { error } = await supabase
        .from('certifications')
        .insert([data])
      
      if (error) throw error
      
      form.reset()
      alert("인증 정보가 저장되었습니다.")
    } catch (error) {
      console.error("저장 오류:", error)
      alert("저장에 실패했습니다.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>인증명</FormLabel>
              <FormControl>
                <Input {...field} placeholder="인증명을 입력하세요" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>설명</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="인증 설명을 입력하세요" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">저장</Button>
      </form>
    </Form>
  )
}
// 애플리케이션 폼 컴포넌트
export function ApplicationForm() {
  const [applications, setApplications] = useState<Array<{id: number, name: string}>>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredApplications, setFilteredApplications] = useState<Array<{id: number, name: string}>>([])

  const form = useForm<z.infer<typeof ApplicationFormSchema>>({
    resolver: zodResolver(ApplicationFormSchema),
    defaultValues: {
      name: ''
    }
  })

  // 애플리케이션 목록 조회
  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('id, name')
        .order('name')
      
      if (error) throw error
      if (data) {
        setApplications(data)
        setFilteredApplications(data)
      }
    } catch (error) {
      console.error("조회 오류:", error)
      alert("애플리케이션 목록 조회에 실패했습니다.")
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  // 검색어에 따른 필터링
  useEffect(() => {
    const filtered = applications.filter(app => 
      app.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredApplications(filtered)
  }, [searchTerm, applications])

  const onSubmit = async (data: z.infer<typeof ApplicationFormSchema>) => {
    try {
      const applicationNames = data.name.split(',').map(name => name.trim()).filter(name => name !== '')

      // 중복 체크
      const duplicates = applicationNames.filter(newName => 
        applications.some(app => app.name.toLowerCase() === newName.toLowerCase())
      )

      if (duplicates.length > 0) {
        alert(`다음 애플리케이션명이 이미 존재합니다: ${duplicates.join(', ')}`)
        return
      }

      const applicationsToInsert = applicationNames.map(name => ({ name }))
      const { error } = await supabase
        .from('applications')
        .insert(applicationsToInsert)
      
      if (error) throw error
      
      form.reset({ name: '' })
      alert("애플리케이션 정보가 저장되었습니다.")
      fetchApplications() // 목록 새로고침
    } catch (error) {
      console.error("저장 오류:", error)
      alert("저장에 실패했습니다.")
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>애플리케이션명</FormLabel>
                <FormControl>
                  <Input 
                    {...field}
                    value={field.value || ''} 
                    placeholder="애플리케이션명을 입력하세요 (콤마로 구분하여 여러 개 입력 가능)" 
                  />
                </FormControl>
                <FormDescription>
                  여러 개의 애플리케이션을 입력할 경우 콤마(,)로 구분하여 입력하세요.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit">저장</Button>
        </form>
      </Form>

      <div className="space-y-4">
        <div>
          <Label htmlFor="search">애플리케이션 검색</Label>
          <Input
            id="search"
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="border rounded-md">
          <div className="h-[300px] overflow-y-auto p-4">
            {filteredApplications.length > 0 ? (
              <ul className="space-y-2">
                {filteredApplications.map((app) => (
                  <li key={app.id} className="p-2 bg-gray-50 rounded-md">
                    {app.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// 특징 폼 컴포넌트
export function FeatureForm() {
  const form = useForm<z.infer<typeof FeatureFormSchema>>({
    resolver: zodResolver(FeatureFormSchema)
  })

  const onSubmit = async (data: z.infer<typeof FeatureFormSchema>) => {
    try {
      const { error } = await supabase
        .from('features')
        .insert([data])
      
      if (error) throw error
      
      form.reset()
      alert("특징 정보가 저장되었습니다.")
    } catch (error) {
      console.error("저장 오류:", error)
      alert("저장에 실패했습니다.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>특징 설명</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="특징을 설명해주세요" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">저장</Button>
      </form>
    </Form>
  )
}

// 패키지 유형 폼 컴포넌트
export function PackageTypeForm() {
  const form = useForm<z.infer<typeof PackageTypeFormSchema>>({
    resolver: zodResolver(PackageTypeFormSchema)
  })

  const onSubmit = async (data: z.infer<typeof PackageTypeFormSchema>) => {
    try {
      const { error } = await supabase
        .from('package_types')
        .insert([data])
      
      if (error) throw error
      
      form.reset()
      alert("패키지 유형 정보가 저장되었습니다.")
    } catch (error) {
      console.error("저장 오류:", error)
      alert("저장에 실패했습니다.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>패키지 유형명</FormLabel>
              <FormControl>
                <Input {...field} placeholder="패키지 유형명을 입력하세요" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>설명</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="패키지 유형 설명을 입력하세요" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">저장</Button>
      </form>
    </Form>
  )
}

export default function CommonInfoPage() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-4">제조사 등록</h2>
        <ManufacturerForm />
      </section>
      
      <section>
        <h2 className="text-xl font-bold mb-4">구분 등록</h2>
        <DivisionForm />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">카테고리 등록</h2>
        <CategoryForm />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">인증 등록</h2>
        <CertificationForm />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">애플리케이션 등록</h2>
        <ApplicationForm />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">특징 등록</h2>
        <FeatureForm />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">패키지 유형 등록</h2>
        <PackageTypeForm />
      </section>
    </div>
  )
}
