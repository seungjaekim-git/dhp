import { z } from "zod";

// Maximum Ratings Schema
export const MaximumRatingsSchema = z.object({
  supply_voltage: z.object({
    min: z.number().min(0).describe("Minimum supply voltage (V)"),
    max: z.number().max(7.0).describe("Maximum supply voltage (V)"),
    unit: z.literal("V").describe("Voltage unit"),
  }).describe("Supply Voltage (VDD)"),
  input_voltage: z.object({
    min: z.number().nullable().describe("Minimum input voltage (V)"),
    max: z.number().nullable().describe("Maximum input voltage (V)"),
    unit: z.literal("V").describe("Voltage unit"),
  }).describe("Input Voltage (VIN)"),
  output_current: z.object({
    max: z.number().max(90).describe("Maximum output current (mA)"),
    unit: z.literal("mA").describe("Current unit"),
  }).describe("Output Current (IOUT)"),
  output_voltage: z.object({
    min: z.number().nullable().describe("Minimum output voltage (V)"),
    max: z.number().nullable().describe("Maximum output voltage (V)"),
    unit: z.literal("V").describe("Voltage unit"),
  }).describe("Output Voltage (VDS)"),
  clock_frequency: z.object({
    max: z.number().max(25).describe("Maximum clock frequency (MHz)"),
    unit: z.literal("MHz").describe("Frequency unit"),
  }).describe("Clock Frequency (FCLK)"),
  gnd_terminal_current: z.object({
    max: z.number().max(1440).describe("Maximum GND terminal current (mA)"),
    unit: z.literal("mA").describe("Current unit"),
  }).describe("GND Terminal Current (IGND)"),
  power_dissipation: z.array(
    z.object({
      package_type: z.string().describe("Package type"),
      value: z.number().describe("Power dissipation (W)"),
      unit: z.literal("W").describe("Power unit"),
    })
  ).describe("Power Dissipation (PD)"),
  operating_temperature: z.object({
    min: z.number().describe("Minimum operating temperature (°C)"),
    max: z.number().describe("Maximum operating temperature (°C)"),
    unit: z.literal("°C").describe("Temperature unit"),
  }).describe("Operating Temperature (Topr)"),
  storage_temperature: z.object({
    min: z.number().describe("Minimum storage temperature (°C)"),
    max: z.number().describe("Maximum storage temperature (°C)"),
    unit: z.literal("°C").describe("Temperature unit"),
  }).describe("Storage Temperature (Tstg)"),
}).describe("Maximum Ratings for LED Driver IC");

