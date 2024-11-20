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
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"
import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ChevronsUpDown } from "lucide-react"
import { Command, CommandItem, CommandGroup, CommandInput, CommandEmpty } from "@/components/ui/command"
import { Check } from "lucide-react"

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

// 문서 폼 스키마
const DocumentFormSchema = z.object({
  title: z.string().min(1, "문서 제목은 필수입니다"),
  url: z.string().url("올바른 URL을 입력해주세요"),
  type: z.string().optional()
})

// 이미지 폼 스키마
const ImageFormSchema = z.object({
  title: z.string().optional(),
  url: z.string().url("올바른 URL을 입력해주세요"),
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
  description: z.string().optional()
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

    fetchDivisions()
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
              <FormControl>
                <Input {...field} placeholder="국가를 입력하세요" />
              </FormControl>
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
    resolver: zodResolver(CategoryFormSchema)
  })

  const onSubmit = async (data: z.infer<typeof CategoryFormSchema>) => {
    try {
      const { error } = await supabase
        .from('categories')
        .insert([data])
      
      if (error) throw error
      
      form.reset()
      alert("카테고리 정보가 저장되었습니다.")
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
              <FormLabel>상위 카테고리 ID</FormLabel>
              <FormControl>
                <Input {...field} type="number" placeholder="상위 카테고리 ID를 입력하세요" />
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

// 문서 폼 컴포넌트
export function DocumentForm() {
  const form = useForm<z.infer<typeof DocumentFormSchema>>({
    resolver: zodResolver(DocumentFormSchema)
  })

  const onSubmit = async (data: z.infer<typeof DocumentFormSchema>) => {
    try {
      const { error } = await supabase
        .from('documents')
        .insert([data])
      
      if (error) throw error
      
      form.reset()
      alert("문서 정보가 저장되었습니다.")
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>문서 제목</FormLabel>
              <FormControl>
                <Input {...field} placeholder="문서 제목을 입력하세요" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} type="url" placeholder="문서 URL을 입력하세요" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>문서 유형</FormLabel>
              <FormControl>
                <Input {...field} placeholder="문서 유형을 입력하세요" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">저장</Button>
      </form>
    </Form>
  )
}

// 이미지 폼 컴포넌트
export function ImageForm() {
  const form = useForm<z.infer<typeof ImageFormSchema>>({
    resolver: zodResolver(ImageFormSchema)
  })

  const onSubmit = async (data: z.infer<typeof ImageFormSchema>) => {
    try {
      const { error } = await supabase
        .from('images')
        .insert([data])
      
      if (error) throw error
      
      form.reset()
      alert("이미지 정보가 저장되었습니다.")
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이미지 제목</FormLabel>
              <FormControl>
                <Input {...field} placeholder="이미지 제목을 입력하세요" />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} type="url" placeholder="이미지 URL을 입력하세요" />
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
                <Textarea {...field} placeholder="이미지 설명을 입력하세요" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">저장</Button>
      </form>
    </Form>
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
  const form = useForm<z.infer<typeof ApplicationFormSchema>>({
    resolver: zodResolver(ApplicationFormSchema)
  })

  const onSubmit = async (data: z.infer<typeof ApplicationFormSchema>) => {
    try {
      const { error } = await supabase
        .from('applications')
        .insert([data])
      
      if (error) throw error
      
      form.reset()
      alert("애플리케이션 정보가 저장되었습니다.")
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
              <FormLabel>애플리케이션명</FormLabel>
              <FormControl>
                <Input {...field} placeholder="애플리케이션명을 입력하세요" />
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
                <Textarea {...field} placeholder="애플리케이션 설명을 입력하세요" />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">저장</Button>
      </form>
    </Form>
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
        <h2 className="text-xl font-bold mb-4">문서 등록</h2>
        <DocumentForm />
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">이미지 등록</h2>
        <ImageForm />
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
