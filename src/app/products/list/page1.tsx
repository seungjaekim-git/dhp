import { ProductListPage } from "./productListPage";
import { DataCard } from "./data-card";
import { columns } from "./columns";
import { data } from "./constants";

export default function Page() {
  return (
    <>
      <ProductListPage />
      <DataCard data={data} columns={columns} />
    </>
  );
}
