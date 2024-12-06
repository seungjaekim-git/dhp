// app/business/page.tsx
import { getBusinessData } from "./getBusinessData";
import Business from "./Business";

export default async function BusinessPage() {
    const businessData = await getBusinessData();

    return <Business data={businessData} />;
}
