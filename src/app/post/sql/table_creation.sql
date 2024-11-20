-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing

-- Supabase AI is experimental and may produce incorrect answers
-- Always verify the output before executing
set
  search_path to 'dhp',
  public;

DROP EXTENSION IF EXISTS pg_trgm;

-- Create the pg_trgm extension
CREATE EXTENSION pg_trgm;

-- -- 필요한 타입 정의
-- CREATE TYPE mounting_style AS ENUM ('Through-Hole', 'Surface-Mount', 'Snap-In', 'Plug-In');
-- CREATE TYPE topology AS ENUM ('Buck', 'Boost', 'Buck-Boost', 'Flyback', 'SEPIC', 'Cuk');
-- CREATE TYPE dimming_method AS ENUM ('PWM', 'Analog', 'Hybrid', 'Digital');
-- 제조사 테이블
create table
  manufacturers (
    id int primary key generated always as identity,
    name text unique not null,
    country text,
    website text,
    created_at timestamp default now(),
    updated_at timestamp default now()
  );

-- 구분 테이블
create table
  divisions (
    id int primary key generated always as identity,
    name text unique not null,
    description text,
    created_at timestamp default now(),
    updated_at timestamp default now()
  );

-- 카테고리 테이블
create table
  categories (
    id int primary key generated always as identity,
    name text unique not null,
    parent_id int references categories (id) on delete set null,
    description text,
    created_at timestamp default now(),
    updated_at timestamp default now()
  );

-- 문서 테이블
create table
  documents (
    id int primary key generated always as identity,
    title text not null,
    url text not null,
    type text,
    created_at timestamp default now(),
    updated_at timestamp default now()
  );

-- 이미지 테이블
create table
  images (
    id int primary key generated always as identity,
    title text,
    url text not null,
    description text,
    created_at timestamp default now(),
    updated_at timestamp default now()
  );

-- 인증 테이블
create table
  certifications (
    id int primary key generated always as identity,
    name text unique not null,
    description text,
    created_at timestamp default now(),
    updated_at timestamp default now()
  );

-- 애플리케이션 테이블
create table
  applications (
    id int primary key generated always as identity,
    name text unique not null,
    description text,
    created_at timestamp default now(),
    updated_at timestamp default now()
  );

-- 특징 테이블
create table
  features (
    id int primary key generated always as identity,
    description text not null,
    created_at timestamp default now(),
    updated_at timestamp default now()
  );

-- 패키지 유형 테이블
create table
  package_types (
    id int primary key generated always as identity,
    name text unique not null,
    description text,
    created_at timestamp default now(),
    updated_at timestamp default now()
  );

-- 상품 테이블
create table
  products (
    id int primary key generated always as identity,
    name text not null,
    part_number text,
    manufacturer_id int references manufacturers (id) on delete set null,
    division_id int references divisions (id) on delete set null,
    description text,
    created_at timestamp default now(),
    updated_at timestamp default now()
  );

-- 상품 문서 관계 테이블
create table
  product_documents (
    product_id int references products (id) on delete cascade,
    document_id int references documents (id) on delete cascade,
    primary key (product_id, document_id)
  );

-- LED Driver IC 테이블
create table
  led_driver_ic (
    id int primary key generated always as identity,
    product_id int references products (id) on delete cascade,
    category_id int references categories (id) on delete set null,
    subtitle text,
    number_of_outputs smallint,
    topologies topology[],
    dimming_methods dimming_method[],
    input_voltage_range NUMRANGE,
    typical_input_voltage numeric(7, 2),
    operating_frequency_range NUMRANGE,
    typical_operating_frequency numeric(7, 2),
    output_current_range NUMRANGE,
    typical_output_current numeric(7, 2),
    output_voltage_range NUMRANGE,
    typical_output_voltage numeric(7, 2),
    operating_temperature NUMRANGE not null,
    category_specific_attributes JSONB
  );

CREATE TABLE led_driver_ic_certifications (
    id SERIAL PRIMARY KEY,
    led_driver_ic_id INT REFERENCES led_driver_ic(id) ON DELETE CASCADE,
    certification_id INT REFERENCES certifications(id) ON DELETE CASCADE
);

CREATE TABLE led_driver_ic_features (
    id SERIAL PRIMARY KEY,
    led_driver_ic_id INT REFERENCES led_driver_ic(id) ON DELETE CASCADE,
    feature_id INT REFERENCES features(id) ON DELETE CASCADE
);

CREATE TABLE led_driver_ic_applications (
    id SERIAL PRIMARY KEY,
    led_driver_ic_id INT REFERENCES led_driver_ic(id) ON DELETE CASCADE,
    application_id INT REFERENCES applications(id) ON DELETE CASCADE
);

-- LED Driver IC 옵션 테이블
create table
  led_driver_ic_options (
    id int primary key generated always as identity,
    product_id int references led_driver_ic (id) on delete cascade,
    option_name text not null,
    package_detail text[],
    mounting_style mounting_style not null,
    storage_type storage_type not null ,
    notes text,
    moq_start int,
    moq_step int,
    lead_time_range NUMRANGE,
    prices JSONB
  );

-- 중간 테이블: 옵션 테이블 + 패키지 타입
CREATE TABLE led_driver_ic_option_package_types (
    id SERIAL PRIMARY KEY,
    option_id INT REFERENCES led_driver_ic_options(id) ON DELETE CASCADE, -- 옵션 참조
    package_type_id INT REFERENCES package_types(id) ON DELETE CASCADE -- 패키지 유형 참조
);

-- 인덱스 생성
-- 상품 테이블 인덱스
create index idx_products_name on products using GIN (name gin_trgm_ops);

create index idx_products_part_number on products (part_number);

create index idx_products_manufacturer on products (manufacturer_id);

create index idx_products_division on products (division_id);

-- LED Driver IC 인덱스
create index idx_led_driver_ic_input_voltage on led_driver_ic using GIST (input_voltage_range);

create index idx_led_driver_ic_operating_frequency on led_driver_ic using GIST (operating_frequency_range);

create index idx_led_driver_ic_output_current on led_driver_ic using GIST (output_current_range);

create index idx_led_driver_ic_output_voltage on led_driver_ic using GIST (output_voltage_range);

create index idx_led_driver_ic_operating_temperature on led_driver_ic using GIST (operating_temperature);

create index idx_led_driver_ic_topologies on led_driver_ic using GIN (topologies);

create index idx_led_driver_ic_dimming_methods on led_driver_ic using GIN (dimming_methods);

-- Certifications
CREATE INDEX idx_led_driver_ic_certifications_ic_id ON led_driver_ic_certifications (led_driver_ic_id);
CREATE INDEX idx_led_driver_ic_certifications_certification_id ON led_driver_ic_certifications (certification_id);

-- Features
CREATE INDEX idx_led_driver_ic_features_ic_id ON led_driver_ic_features (led_driver_ic_id);
CREATE INDEX idx_led_driver_ic_features_feature_id ON led_driver_ic_features (feature_id);

-- Applications
CREATE INDEX idx_led_driver_ic_applications_ic_id ON led_driver_ic_applications (led_driver_ic_id);
CREATE INDEX idx_led_driver_ic_applications_application_id ON led_driver_ic_applications (application_id);


-- LED Driver IC 옵션 인덱스
create index idx_led_driver_ic_options_name on led_driver_ic_options using GIN (option_name gin_trgm_ops);

create index idx_led_driver_ic_options_mounting_style on led_driver_ic_options (mounting_style);

create index idx_led_driver_ic_options_moq on led_driver_ic_options (moq_start);

create index idx_led_driver_ic_options_lead_time on led_driver_ic_options using GIST (lead_time_range);

CREATE INDEX idx_led_driver_ic_option_package_types_option_id ON led_driver_ic_option_package_types (option_id);

CREATE INDEX idx_led_driver_ic_option_package_types_package_type_id ON led_driver_ic_option_package_types (package_type_id);




-- JSONB 필드 인덱스
create index idx_led_driver_ic_category_attributes on led_driver_ic using GIN (category_specific_attributes jsonb_path_ops);

create index idx_led_driver_ic_options_prices on led_driver_ic_options using GIN (prices jsonb_path_ops);