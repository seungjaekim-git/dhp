import { PartnerList } from "./PartnerList";
import PartnersLayout from "./PartnersLayout";
import { PARTNER_DATA } from "./PartnerData";

export default function PartnerListPage() {
  return (
    <PartnersLayout
      title="파트너사"
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "파트너사" }
      ]}
      description={`총 ${PARTNER_DATA.length}개의 글로벌 파트너사와 함께합니다`}
    >
      <PartnerList />
    </PartnersLayout>
  );
}
