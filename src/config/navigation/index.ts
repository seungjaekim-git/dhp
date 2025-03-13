import { NavigationConfig } from "./types";
import { companyConfig } from "./companyConfig";
import { productsConfig } from "./productsConfig";
import { partnersConfig } from "./partnersConfig";
import { supportConfig } from "./supportConfig";

// 모든 네비게이션 설정을 하나로 통합
export const navigationConfig: NavigationConfig = {
  company: companyConfig,
  products: productsConfig,
  partners: partnersConfig,
  support: supportConfig
};

// 각 개별 설정도 내보내서 필요한 경우 독립적으로 사용 가능
export {
  companyConfig,
  productsConfig,
  partnersConfig,
  supportConfig
};

// 타입들도 내보내기
export * from "./types"; 