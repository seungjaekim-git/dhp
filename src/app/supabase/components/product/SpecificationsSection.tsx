import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../../types/product";
import DataSection_LEDDriverIC from "../product/DataSection_LEDDriverIC";

interface SpecificationsSectionProps {
  form: UseFormReturn<FormValues>;
}

export default function SpecificationsSection({ form }: SpecificationsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>제품 사양</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={form.control}
          name="specifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제품 사양 (JSON)</FormLabel>
              <FormControl>
                <Textarea 
                  value={typeof field.value === 'object' ? JSON.stringify(field.value, null, 2) : field.value}
                  onChange={(e) => {
                    try {
                      const jsonValue = JSON.parse(e.target.value);
                      field.onChange(jsonValue);
                    } catch (err) {
                      field.onChange(e.target.value);
                    }
                  }}
                  placeholder="제품 사양을 JSON 형식으로 입력하세요"
                  className="font-mono min-h-[200px]"
                />
              </FormControl>
              <FormLabel className="text-2xl font-bold tracking-tight text-gray-900 mt-8 mb-4">사양 미리보기</FormLabel>
              {typeof field.value === 'object' && <DataSection_LEDDriverIC data={field.value} />}
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
} 