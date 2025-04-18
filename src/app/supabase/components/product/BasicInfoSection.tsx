import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormValues, Manufacturer, StorageType } from "../../types/product";
import { Cpu } from "lucide-react";

interface BasicInfoSectionProps {
  form: UseFormReturn<FormValues>;
  manufacturers: Manufacturer[];
  storageTypes: StorageType[];
}

export default function BasicInfoSection({ form, manufacturers, storageTypes }: BasicInfoSectionProps) {
  return (
    <Card className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/50 shadow-md hover:shadow-lg transition-all">
      <CardHeader className="bg-gray-900/70 border-b border-gray-700">
        <CardTitle className="text-xl font-semibold flex items-center gap-2 text-blue-300">
          <Cpu className="h-5 w-5" />
          기본 정보
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">제품명</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className="bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white" 
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">부제목</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    className="bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white" 
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="manufacturer_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">제조사</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white">
                    <SelectValue placeholder="제조사 선택" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {manufacturers.map((manufacturer) => (
                      <SelectItem 
                        key={manufacturer.id} 
                        value={manufacturer.id.toString()}
                        className="focus:bg-blue-900/50 focus:text-blue-200 text-white"
                      >
                        {manufacturer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        
          <FormField
            control={form.control}
            name="storage_type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">보관 유형</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white">
                    <SelectValue placeholder="보관 유형 선택" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {storageTypes.map((type) => (
                      <SelectItem 
                        key={type.id} 
                        value={type.id.toString()}
                        className="focus:bg-blue-900/50 focus:text-blue-200 text-white"
                      >
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="part_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">부품 번호</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white" 
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">설명</FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
                  className="bg-gray-900 border-gray-700 min-h-[120px] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white" 
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
} 