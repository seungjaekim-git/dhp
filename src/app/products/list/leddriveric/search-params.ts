import {
  createParser,
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  parseAsTimestamp,
} from "nuqs/server";

import {
  ARRAY_DELIMITER,
  RANGE_DELIMITER,
  SLIDER_DELIMITER,
} from "@/lib/delimiters";

export const parseAsSort = createParser({
  parse(queryValue) {
    const [id, desc] = queryValue.split(".");
    if (!id && !desc) return null;
    return { id, desc: desc === "desc" };
  },
  serialize(value) {
    return `${value.id}.${value.desc ? "desc" : "asc"}`;
  },
});

export const searchParamsParser = {
  // FILTERS
  subtitle: parseAsString,
  number_of_outputs: parseAsArrayOf(parseAsInteger, SLIDER_DELIMITER),
  input_voltage_range: parseAsArrayOf(parseAsInteger, RANGE_DELIMITER),
  output_current_range: parseAsArrayOf(parseAsInteger, RANGE_DELIMITER), 
  operating_temperature: parseAsArrayOf(parseAsInteger, RANGE_DELIMITER),
  mounting_style: parseAsString,
  storage_type: parseAsString,
  package_type: parseAsString,
  package_detail: parseAsString,
  topologies: parseAsArrayOf(parseAsString, ARRAY_DELIMITER),
  dimming_methods: parseAsArrayOf(parseAsString, ARRAY_DELIMITER),
  certifications: parseAsArrayOf(parseAsString, ARRAY_DELIMITER),
  applications: parseAsArrayOf(parseAsString, ARRAY_DELIMITER)
};

export const searchParamsCache = createSearchParamsCache(searchParamsParser);
