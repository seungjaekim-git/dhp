import { useCallback, useMemo } from 'react';
import { ProductSchema } from '../leddrivericListPage';

export const useFilteredData = (
  data: ProductSchema[],
  filterState: Record<string, any>,
  searchQuery: string
) => {
  // 검색어 필터링 로직
  const matchesSearchQuery = useCallback((item: ProductSchema) => {
    if (!searchQuery.trim()) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.subtitle?.toLowerCase().includes(searchLower) ||
      item.description?.toLowerCase().includes(searchLower) ||
      item.part_number?.toLowerCase().includes(searchLower) ||
      item.manufacturer?.name.toLowerCase().includes(searchLower)
    );
  }, [searchQuery]);

  // 필터 조건 확인 로직
  const checkFilterCondition = useCallback((item: ProductSchema, key: string, value: any) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return true;

    const filterConditions: Record<string, () => boolean> = {
      // 제조사 필터
      manufacturers: () => {
        if (!item.manufacturer?.name) return false;
        return Array.isArray(value) 
          ? value.includes(item.manufacturer.name)
          : item.manufacturer.name === value;
      },
      
      // 카테고리/인증/응용분야 필터
      certifications: () => {
        if (!item.certifications || item.certifications.length === 0) return false;
        return item.certifications.some(c => 
          Array.isArray(value) ? value.includes(c.certification.name) : c.certification.name === value
        );
      },
      
      applications: () => {
        if (!item.applications || item.applications.length === 0) return false;
        return item.applications.some(a => 
          Array.isArray(value) ? value.includes(a.application.name) : a.application.name === value
        );
      },
      
      categories: () => {
        if (item.categories) {
          return item.categories.some(c => 
            Array.isArray(value) ? value.includes(c.category.name) : c.category.name === value
          );
        }
        return item.category?.name === value;
      },
      
      // 채널 필터
      channels: () => {
        if (!item.specifications?.channels) return false;
        return String(item.specifications.channels).includes(value);
      },
      
      // 전기적 특성 필터
      inputVoltage: () => {
        if (!item.specifications?.input_voltage) return false;
        const min = item.specifications.input_voltage.min || 0;
        const max = item.specifications.input_voltage.max || 0;
        return min >= value[0] && max <= value[1];
      },
      
      outputVoltage: () => {
        if (!item.specifications?.output_voltage) return false;
        const min = item.specifications.output_voltage.min || 0;
        const max = item.specifications.output_voltage.max || 0;
        return min >= value[0] && max <= value[1];
      },
      
      outputCurrent: () => {
        if (!item.specifications?.output_current) return false;
        const min = item.specifications.output_current.min || 0;
        const max = item.specifications.output_current.max || 0;
        return min >= value[0] && max <= value[1]; 
      },
      
      switchingFrequency: () => {
        if (!item.specifications?.switching_frequency) return false;
        const min = item.specifications.switching_frequency.min || 0;
        const max = item.specifications.switching_frequency.max || 0;
        return min >= value[0] && max <= value[1];
      },
      
      // 물리적 특성 필터
      operatingTemperature: () => {
        if (!item.specifications?.operating_temperature) return false;
        const min = item.specifications.operating_temperature.min || -40;
        const max = item.specifications.operating_temperature.max || 125;
        return min >= value[0] && max <= value[1];
      },
      
      packageTypes: () => {
        if (!item.specifications?.package_type) return false;
        return Array.isArray(value) 
          ? value.includes(item.specifications.package_type)
          : item.specifications.package_type === value;
      },
      
      mountingTypes: () => {
        if (!item.specifications?.mounting_type) return false;
        return Array.isArray(value) 
          ? value.includes(item.specifications.mounting_type)
          : item.specifications.mounting_type === value;
      },
      
      internalSwitch: () => {
        if (item.specifications?.internal_switch === undefined) return false;
        
        // "있음"/"없음" 값을 boolean으로 변환
        const hasSwitch = item.specifications.internal_switch === true;
        return value.includes(hasSwitch ? '있음' : '없음');
      },
      
      thermalPad: () => {
        if (item.specifications?.thermal_pad === undefined) return false;
        
        // "있음"/"없음" 값을 boolean으로 변환
        const hasThermalPad = item.specifications.thermal_pad === true;
        return value.includes(hasThermalPad ? '있음' : '없음');
      },
      
      // 제어 특성 필터
      topologies: () => {
        if (!item.specifications?.topology) return false;
        return Array.isArray(value)
          ? value.some(v => item.specifications?.topology?.includes(v))
          : item.specifications.topology.includes(value);
      },
      
      dimmingMethods: () => {
        if (!item.specifications?.dimming_method) return false;
        return Array.isArray(value)
          ? value.some(v => item.specifications?.dimming_method?.includes(v))
          : item.specifications.dimming_method.includes(value);
      }
    };

    return filterConditions[key]?.() ?? true;
  }, []);

  // 필터링된 데이터 반환
  const filteredData = useMemo(() => {
    return data.filter(item => 
      Object.entries(filterState).every(([key, value]) => 
        checkFilterCondition(item, key, value)
      ) && matchesSearchQuery(item)
    );
  }, [data, filterState, checkFilterCondition, matchesSearchQuery]);

  // 필터 통계
  const filterStats = useMemo(() => {
    return {
      total: data.length,
      filtered: filteredData.length,
      percentage: data.length > 0 ? Math.round((filteredData.length / data.length) * 100) : 0
    };
  }, [data.length, filteredData.length]);

  return { filteredData, filterStats };
}; 