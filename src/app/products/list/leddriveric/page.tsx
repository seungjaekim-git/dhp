import LEDDriverICListPage from "./leddrivericListPage";
import ListLayout from "./ListLayout";
import { Cpu } from "lucide-react";

export default function Page() {
  return (
    <ListLayout
      title="LED 드라이버 IC"
      icon={<Cpu className="w-4 h-4" />}
      breadcrumb={[
        { label: "홈", href: "/" },
        { label: "제품", href: "/products" },
        { label: "LED 드라이버 IC" },
      ]}
      description="LED 드라이버 IC 목록"
    >
      <LEDDriverICListPage />
    </ListLayout>
  );
}
