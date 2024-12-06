// app/introduction/page.tsx
import { getIntroductionData } from "./getIntroductionData";
import Introduction from "./IntroductionPage";

export default async function IntroductionPage() {
    const introductionData = await getIntroductionData();

    return <Introduction data={introductionData} />;
}
