"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import * as Schema from "./Schema";
import { z } from "zod";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
}

const MultiSelect = ({ options, selected, onChange }: MultiSelectProps) => {
  const handleCheckboxChange = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  return (
    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto border rounded-md p-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox
            id={option.value}
            checked={selected.includes(option.value)}
            onCheckedChange={() => handleCheckboxChange(option.value)}
          />
          <label
            htmlFor={option.value}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

interface MultiLevelOption {
  value: string;
  label: string;
  children?: MultiLevelOption[];
}

interface MultiLevelSelectProps {
  options: MultiLevelOption[];
  selected: string[];
  onChange: (values: string[]) => void;
}

const MultiLevelSelect = ({ options, selected, onChange }: MultiLevelSelectProps) => {
  const handleCheckboxChange = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const renderOptions = (options: MultiLevelOption[], level = 0) => {
    return options.map((option) => (
      <div key={option.value} className={`flex items-center space-x-2 ml-${level * 4}`}>
        <Checkbox
          id={option.value}
          checked={selected.includes(option.value)}
          onCheckedChange={() => handleCheckboxChange(option.value)}
        />
        <label
          htmlFor={option.value}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {option.label}
        </label>
        {option.children && renderOptions(option.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto border rounded-md p-2">
      {renderOptions(options)}
    </div>
  );
};

const INITIAL_FORM_VALUES = {
  name: "",
  subtitle: "",
  manufacturer_id: "",
  part_number: "",
  specifications: {},
  description: "",
  datasheet_url: "",
  country_id: "",
  storage_type_id: "",
  categories: [] as string[],
  applications: [] as string[],
  certifications: [] as string[],
  features: [] as string[],
  documents: [] as File[],
  images: [] as File[]
};

const schemas = [
  { categoryName: 'Base Component', schema: Schema.BaseComponentSchema },
  { categoryName: 'LED Driver IC', schema: Schema.LEDDriverICSchema },
  { categoryName: 'RGB LED Driver IC', schema: Schema.RGBLEDDriverICSchema },
  { categoryName: 'AMUSE LED Driver IC', schema: Schema.AMUSELEDDriverICSchema },
  { categoryName: 'DC-DC Converter LED Driver IC', schema: Schema.DCDCConverterLEDDriverICSchema },
  { categoryName: 'DC-DC Controller LED Driver IC', schema: Schema.DCDCControllerLEDDriverICSchema },
  { categoryName: 'PMIC', schema: Schema.PMICSchema },
  { categoryName: 'Connector', schema: Schema.ConnectorSchema },
  { categoryName: 'Other Component', schema: Schema.OtherComponentSchema },
  { categoryName: 'Mini/Micro LED Driver IC', schema: Schema.MiniMicroLEDDriverICSchema },
  { categoryName: 'SRAM Embedded LED Driver IC', schema: Schema.SRAMEmbeddedLEDDriverICSchema },
  { categoryName: 'SPWM LED Driver IC', schema: Schema.SPWMLEDDriverICSchema },
  { categoryName: 'Multi-Function LED Driver IC', schema: Schema.MultiFunctionLEDDriverICSchema },
  { categoryName: 'Rectifier Diode', schema: Schema.RectifierDiodeSchema },
  { categoryName: 'Zener Diode', schema: Schema.ZenerDiodeSchema },
  { categoryName: 'Schottky Diode', schema: Schema.SchottkyDiodeSchema },
  { categoryName: 'TVS Diode', schema: Schema.TVSDiodeSchema },
  { categoryName: 'PIR Sensor', schema: Schema.PIRSensorSchema },
  { categoryName: 'Temperature Sensor', schema: Schema.TemperatureSensorSchema },
  { categoryName: 'ADC', schema: Schema.ADCSchema },
  { categoryName: 'DAC', schema: Schema.DACSchema },
  { categoryName: 'Memory IC', schema: Schema.MemoryICSchema },
  { categoryName: 'Flash Memory IC', schema: Schema.FlashMemoryICSchema },
  { categoryName: 'SRAM IC', schema: Schema.SRAMICSchema },
  { categoryName: 'DRAM IC', schema: Schema.DRAMICSchema },
  { categoryName: 'MOSFET', schema: Schema.MOSFETSchema },
  { categoryName: 'N-Channel MOSFET', schema: Schema.NChannelMOSFETSchema },
  { categoryName: 'P-Channel MOSFET', schema: Schema.PChannelMOSFETSchema },
  { categoryName: 'Super Junction MOSFET', schema: Schema.SuperJunctionMOSFETSchema },
  { categoryName: 'IGBT', schema: Schema.IGBTSchema },
  { categoryName: 'Microcontroller', schema: Schema.MicrocontrollerSchema },
  { categoryName: 'ASIC', schema: Schema.ASICSchema },
  { categoryName: 'FPGA', schema: Schema.FPGASchema },
  { categoryName: 'Amplifier IC', schema: Schema.AmplifierICSchema },
];

export default function CreateProduct() {
  const [manufacturers, setManufacturers] = useState<Array<{id: number, name: string}>>([]);
  const [countries, setCountries] = useState<Array<{id: number, name: string}>>([]);
  const [storageTypes, setStorageTypes] = useState<Array<{id: number, name: string}>>([]);
  const [categories, setCategories] = useState<Array<{id: number, name: string, parent_id?: number}>>([]);
  const [applications, setApplications] = useState<Array<{id: number, name: string}>>([]);
  const [certifications, setCertifications] = useState<Array<{id: number, name: string}>>([]);
  const [features, setFeatures] = useState<Array<{id: number, name: string}>>([]);
  const [loading, setLoading] = useState(false);
  const [documentTypes, setDocumentTypes] = useState<Array<{id: number, name: string}>>([]);
  const [selectedSchema, setSelectedSchema] = useState<z.ZodTypeAny | null>(null);
  const form = useForm({
    defaultValues: INITIAL_FORM_VALUES
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchRelatedData = async (table: string) => {
        const { data, error } = await supabase
          .from(table)
          .select("*");
        if (error) console.error(`Error fetching ${table}:`, error);
        return data || [];
      };

      const [
        manufacturersData,
        countriesData,
        storageTypesData,
        categoriesData,
        applicationsData,
        certificationsData,
        featuresData,
        documentTypesData
      ] = await Promise.all([
        fetchRelatedData("manufacturers"),
        fetchRelatedData("countries"),
        fetchRelatedData("storage_types"),
        fetchRelatedData("categories"),
        fetchRelatedData("applications"),
        fetchRelatedData("certifications"),
        fetchRelatedData("features"),
        fetchRelatedData("document_types")
      ]);

      setManufacturers(manufacturersData);
      setCountries(countriesData);
      setStorageTypes(storageTypesData);
      setCategories(categoriesData);
      setApplications(applicationsData);
      setCertifications(certificationsData);
      setFeatures(featuresData);
      setDocumentTypes(documentTypesData);
    };

    fetchData();
  }, []);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Handle file uploads
      const imageUrls = await Promise.all((data.images || []).map(async (image: any) => {
        if (!image.file) return null;
        const fileName = `${Date.now()}-${image.file.name}`;
        await supabase.storage.from("product-images").upload(fileName, image.file);
        const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(fileName);
        return {
          url: publicUrl,
          title: image.title || image.file.name,
          description: image.description
        };
      }));

      const documentUrls = await Promise.all((data.documents || []).map(async (doc: any) => {
        if (!doc.file) return null;
        const fileName = `${Date.now()}-${doc.file.name}`;
        await supabase.storage.from("product-documents").upload(fileName, doc.file);
        const { data: { publicUrl } } = supabase.storage.from("product-documents").getPublicUrl(fileName);
        return {
          url: publicUrl,
          title: doc.title || doc.file.name,
          type_id: doc.type_id,
          updated_at: new Date().toISOString()
        };
      }));

      // Save product data
      const { data: product, error } = await supabase
        .from("products")
        .insert([{
          ...data,
          specifications: JSON.stringify(data.specifications),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      // Save relationships
      if (imageUrls.length) {
        await supabase.from("images").insert(
          imageUrls.filter(Boolean).map(img => ({
            ...img,
            product_id: product.id,
            updated_at: new Date().toISOString()
          }))
        );
      }

      if (documentUrls.length) {
        await supabase.from("documents").insert(
          documentUrls.filter(Boolean).map(doc => ({
            ...doc,
            product_id: product.id
          }))
        );
      }

      alert("Product successfully registered");
      form.reset();
      
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error occurred while registering product");
    } finally {
      setLoading(false);
    }
  };

  const renderSpecificationField = (key: string, value: z.ZodTypeAny, path: string) => {
  // LED Driver IC Schema 관련 필드 렌더링을 위한 함수
  const renderLEDDriverICFields = (schema: z.ZodObject<any>, path: string) => {
    const fields = schema.shape;

    return Object.entries(fields).map(([key, value]) => {
      // Range 타입 필드 처리 (전압, 전류 등의 범위값)
      if (key.includes('_voltage') || key.includes('_current') || key.includes('temperature')) {
        return (
          <div key={key} className="space-y-2">
            <FormLabel>{value.description}</FormLabel>
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name={`${path}.${key}.min`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">최소값</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`${path}.${key}.typ`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">일반값</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`${path}.${key}.max`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">최대값</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        );
      }

      // Value 타입 필드 처리 (단일 값)
      if (key.includes('_frequency') || key.includes('_power') || key.includes('_time')) {
        return (
          <FormField
            key={key}
            control={form.control}
            name={`${path}.${key}.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{value.description}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        );
      }

      // 배열 타입 필드 처리 (보호기능, 통신인터페이스 등)
      if (Array.isArray(value.element)) {
        return (
          <FormField
            key={key}
            control={form.control}
            name={`${path}.${key}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{value.description}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="쉼표로 구분하여 입력" />
                </FormControl>
              </FormItem>
            )}
          />
        );
      }

      // Enum 타입 필드 처리 (토폴로지, 스캔모드 등)
      if (value._def.typeName === 'ZodEnum') {
        return (
          <FormField
            key={key}
            control={form.control}
            name={`${path}.${key}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{value.description}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {value._def.values.map((val: string) => (
                      <SelectItem key={val} value={val}>
                        {val}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        );
      }

      // Boolean 타입 필드 처리 (절연여부, HDR지원 등)
      if (value._def.typeName === 'ZodBoolean') {
        return (
          <FormField
            key={key}
            control={form.control}
            name={`${path}.${key}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{value.description}</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        );
      }
    });
  };

  // 기본 필드 렌더링 로직
  if (typeof value === 'object' && value._def.typeName === 'ZodObject') {
    const schema = value as z.ZodObject<any>;
    
    // LED Driver IC 관련 스키마 확인
    if (schema.description?.includes('LED 드라이버 IC')) {
      return renderLEDDriverICFields(schema, path);
    }
  }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information Fields */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Manufacturer and Part Number */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="manufacturer_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacturer</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select manufacturer" />
                  </SelectTrigger>
                  <SelectContent>
                    {manufacturers.map((manufacturer) => (
                      <SelectItem key={manufacturer.id} value={manufacturer.id.toString()}>
                        {manufacturer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="part_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Part Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description and Datasheet URL */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="datasheet_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Datasheet URL</FormLabel>
              <FormControl>
                <Input {...field} type="url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Categories and Specifications */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => {
              const getChildCategories = (parentId: number | null) => {
                return categories.filter(cat => cat.parent_id === parentId);
              };

              const renderCategorySelect = (level: number, selectedValues: string[]) => {
                const parentId = level === 0 ? null : Number(selectedValues[level - 1]);
                const availableCategories = getChildCategories(parentId);

                if (availableCategories.length === 0) return null;

                return (
                  <Select
                    key={level}
                    onValueChange={(value) => {
                      const newValues = [...selectedValues.slice(0, level), value];
                      field.onChange(newValues);
                      
                      const selectedCategory = categories.find(c => c.id.toString() === value);
                      const matchedSchema = schemas.find(s => s.categoryName === selectedCategory?.name);
                      
                      if (matchedSchema) {
                        form.setValue('specifications', {
                          categoryId: value,
                          schema: matchedSchema.schema
                        });
                      }
                    }}
                    value={selectedValues[level]}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Level ${level + 1} Category`} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              };

              const selectedCategories = field.value || [];
              const maxDepth = 5;
              
              return (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <div className="flex flex-col gap-2">
                    {Array.from({ length: maxDepth }).map((_, index) => {
                      const select = renderCategorySelect(index, selectedCategories);
                      if (!select || (index > 0 && !selectedCategories[index - 1])) return null;
                      return select;
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="specifications"
            render={({ field }) => {
              if (!field.value?.schema) return null;

              const schema = field.value.schema;
              const schemaFields = Object.entries(schema.shape || {});

              return (
                <FormItem>
                  <FormLabel>Specifications</FormLabel>
                  <div className="space-y-4">
                    {schemaFields.map(([key, value]) => 
                      renderSpecificationField(key, value, `specifications.${key}`)
                    )}
                  </div>
                </FormItem>
              );
            }}
          />
        </div>

        {/* Applications and Features */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="applications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Applications</FormLabel>
                <MultiSelect
                  options={applications.map(app => ({
                    value: app.id.toString(),
                    label: app.name
                  }))}
                  selected={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Features</FormLabel>
                <MultiSelect
                  options={features.map(feature => ({
                    value: feature.id.toString(),
                    label: feature.name
                  }))}
                  selected={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Images and Documents */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <div className="space-y-2">
                  <Button
                    type="button"
                    onClick={() => {
                      field.onChange([...(field.value || []), { file: null, title: '', description: '' }]);
                    }}
                  >
                    Add Image
                  </Button>
                  {field.value?.map((image: any, index: number) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          const newImages = field.value.map((img: any, i: number) =>
                            i === index ? { ...img, file } : img
                          );
                          field.onChange(newImages);
                        }}
                      />
                      <Input
                        type="text"
                        placeholder="Image Title"
                        value={image.title || ''}
                        onChange={(e) => {
                          const newImages = field.value.map((img: any, i: number) =>
                            i === index ? { ...img, title: e.target.value } : img
                          );
                          field.onChange(newImages);
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                          const newImages = field.value.filter((_: any, i: number) => i !== index);
                          field.onChange(newImages);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="documents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documents</FormLabel>
                <div className="space-y-2">
                  <Button
                    type="button"
                    onClick={() => {
                      field.onChange([...(field.value || []), { file: null, title: '', type_id: '' }]);
                    }}
                  >
                    Add Document
                  </Button>
                  {field.value?.map((doc: any, index: number) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          const newDocs = field.value.map((d: any, i: number) =>
                            i === index ? { ...d, file } : d
                          );
                          field.onChange(newDocs);
                        }}
                      />
                      <Input
                        type="text"
                        placeholder="Document Title"
                        value={doc.title || ''}
                        onChange={(e) => {
                          const newDocs = field.value.map((d: any, i: number) =>
                            i === index ? { ...d, title: e.target.value } : d
                          );
                          field.onChange(newDocs);
                        }}
                      />
                      <Select
                        value={doc.type_id || ''}
                        onValueChange={(value) => {
                          const newDocs = field.value.map((d: any, i: number) =>
                            i === index ? { ...d, type_id: value } : d
                          );
                          field.onChange(newDocs);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {documentTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id.toString()}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => {
                          const newDocs = field.value.filter((_: any, i: number) => i !== index);
                          field.onChange(newDocs);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Register Product"}
        </Button>
      </form>
    </Form>
  );
}
