import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../../types/product";
import DataSection_LEDDriverIC from "../product/DataSection_LEDDriverIC";
import { Sliders } from "lucide-react";

interface SpecificationsSectionProps {
  form: UseFormReturn<FormValues>;
}

export default function SpecificationsSection({ form }: SpecificationsSectionProps) {
  return (
    <Card className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800/50 shadow-md hover:shadow-lg transition-all">
      <CardHeader className="bg-gray-900/70 border-b border-gray-700">
        <CardTitle className="text-xl font-semibold flex items-center gap-2 text-blue-300">
          <Sliders className="h-5 w-5" />
          제품 사양
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6 text-white">
        <FormField
          control={form.control}
          name="specifications"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white font-medium">제품 사양 (JSON)</FormLabel>
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
                  className="font-mono min-h-[200px] bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
              
              <div className="mt-10 border-t border-gray-700 pt-6">
                <h3 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
                  <Sliders className="h-5 w-5" />
                  사양 미리보기
                </h3>
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 text-white">
                  {typeof field.value === 'object' ? (
                    <DataSection_LEDDriverIC data={field.value} />
                  ) : (
                    <p className="text-gray-300 italic">유효한 JSON 사양을 입력하면 미리보기가 여기에 표시됩니다.</p>
                  )}
                </div>
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
} 