-- LED Driver IC 제품 기본 정보 테이블
CREATE TABLE led_driver_ic (
    model_id VARCHAR(10) PRIMARY KEY,
    manufacturer VARCHAR(50),
    series VARCHAR(100),
    type VARCHAR(50),
    number_of_outputs INTEGER,
    topology VARCHAR(100)
);

-- 패키지 정보 테이블 
CREATE TABLE package_info (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    mounting_style VARCHAR(10),
    package_case VARCHAR(20),
    PRIMARY KEY (model_id, mounting_style, package_case)
);

-- 전기적 특성 테이블
CREATE TABLE electrical_characteristics (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    output_current_min DECIMAL(5,2),
    output_current_typ DECIMAL(5,2), 
    output_current_max DECIMAL(5,2),
    output_current_unit VARCHAR(5),
    input_voltage_min DECIMAL(4,2),
    input_voltage_typ DECIMAL(4,2),
    input_voltage_max DECIMAL(4,2),
    input_voltage_unit VARCHAR(5),
    output_voltage_min DECIMAL(4,2),
    output_voltage_typ DECIMAL(4,2),
    output_voltage_max DECIMAL(4,2), 
    output_voltage_unit VARCHAR(5),
    operating_temp_min INTEGER,
    operating_temp_max INTEGER,
    operating_temp_unit VARCHAR(5),
    PRIMARY KEY (model_id)
);

-- 디밍 방식 테이블
CREATE TABLE dimming_methods (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    dimming_method VARCHAR(50),
    PRIMARY KEY (model_id, dimming_method)
);

-- 내부 스위치 정보 테이블
CREATE TABLE internal_switch (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    present BOOLEAN,
    switch_type VARCHAR(50),
    count INTEGER,
    PRIMARY KEY (model_id)
);

-- 인증 정보 테이블
CREATE TABLE certifications (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    certification VARCHAR(50),
    PRIMARY KEY (model_id, certification)
);

-- 패키징 정보 테이블
CREATE TABLE packaging (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    package_type VARCHAR(50),
    quantity INTEGER,
    PRIMARY KEY (model_id)
);

-- 응용 분야 테이블
CREATE TABLE applications (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    application VARCHAR(100),
    PRIMARY KEY (model_id, application)
);

-- 특징 테이블
CREATE TABLE features (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    feature VARCHAR(100),
    PRIMARY KEY (model_id, feature)
);

-- LED 타입 및 스캔 정보 테이블
CREATE TABLE led_scan_info (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    led_type VARCHAR(50),
    scan_type VARCHAR(50),
    PRIMARY KEY (model_id)
);

-- 출력 전류 정확도 테이블
CREATE TABLE current_accuracy (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    between_channels_value DECIMAL(3,1),
    between_channels_unit VARCHAR(5),
    between_channels_condition VARCHAR(20),
    between_ics_value DECIMAL(3,1),
    between_ics_unit VARCHAR(5),
    between_ics_condition VARCHAR(20),
    PRIMARY KEY (model_id)
);

-- MOSFET 내장 정보 테이블
CREATE TABLE embedded_mosfet (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    present BOOLEAN,
    count INTEGER,
    PRIMARY KEY (model_id)
);

-- 오류 감지 테이블
CREATE TABLE error_detection (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    led_open BOOLEAN,
    led_short BOOLEAN,
    PRIMARY KEY (model_id)
);

-- 전류 게인 테이블
CREATE TABLE current_gain (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    gain_type VARCHAR(50),
    resolution INTEGER,
    unit VARCHAR(10),
    PRIMARY KEY (model_id)
);

-- PWM 관련 기능 테이블
CREATE TABLE pwm_features (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    pwm_enhancement BOOLEAN,
    gclk_multiplier BOOLEAN,
    solving_7_common_problems BOOLEAN,
    intelligent_power_saving BOOLEAN,
    PRIMARY KEY (model_id)
);

-- S-PWM 해상도 테이블
CREATE TABLE spwm_resolution (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    resolution INTEGER,
    unit VARCHAR(10),
    PRIMARY KEY (model_id, resolution)
);

-- 스캔 설계 테이블
CREATE TABLE scan_design (
    model_id VARCHAR(10) REFERENCES led_driver_ic(model_id),
    max_scan INTEGER,
    unit VARCHAR(10),
    PRIMARY KEY (model_id)
);