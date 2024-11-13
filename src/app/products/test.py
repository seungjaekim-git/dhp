from PyPDF2 import PdfReader
import json
import re
import os


def extract_product_specs(pdf_path):
    reader = PdfReader(pdf_path)
    specs = []
    
    for page in reader.pages:
        text = page.extract_text()
        
        # 제품 사양을 찾기 위한 패턴 매칭
        product_matches = re.finditer(r'Product:\s*(.+?)\n', text)
        for match in product_matches:
            product = {}
            product['name'] = match.group(1).strip()
            
            # 전압, 전류 등 사양 추출
            voltage_match = re.search(rf'Voltage:\s*([\d.]+)', text)
            if voltage_match:
                product['voltage'] = float(voltage_match.group(1))
                
            current_match = re.search(rf'Current:\s*([\d.]+)', text)
            if current_match:
                product['current'] = float(current_match.group(1))
                
            specs.append(product)
            
    # JSON 파일로 저장
    with open('product_specs.json', 'w', encoding='utf-8') as f:
        json.dump(specs, f, ensure_ascii=False, indent=2)
        
    return specs

specs = extract_product_specs(os.path.join(os.path.dirname(__file__), "../../../public/files/Macrobloc Selection Guide_2024.pdf"))
print(json.dumps(specs, indent=2, ensure_ascii=False))
