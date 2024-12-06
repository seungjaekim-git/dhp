import { getCompanyData } from "./fetchCompanyData";
import CompanyHero from "./CompanyHero";
import CompanyIntro from "./CompanyIntro";
import CompanyCards from "./CompanyCards";

export default async function CompanyPage() {
    const companyData = await getCompanyData();

    return (
        <main className="w-full">
            <CompanyHero data={companyData.hero} carouselItems={companyData.carouselItems} />
            <CompanyIntro data={companyData.intro} />
            <CompanyCards cards={companyData.cards} />
        </main>
    );
}