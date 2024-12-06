import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,

} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Github,
  Chrome,
  Database,
  Server,
  Heart,
  Share2,
} from "lucide-react";

export const metadata = {
  title: "Company Profile - Kakao",
  description: "Profile of Kakao Corporation",
};

export default function CompanyProfile() {
  // 정적 데이터 정의
  const companyData = {
    name: "Kakao",
    description: "Internet Services",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Kakao_CI_yellow.svg/1200px-Kakao_CI_yellow.svg.png",
    location: "Seoul, South Korea",
    founded: 2010,
    employees: "8,700+",
    avgSalary: "$85,000",
    revenue: "$5.3B",
    year: "2022",
    techStack: ["Git", "React", "MySQL", "AWS"],
    industry: ["Internet Services", "Mobile", "Social Media", "E-commerce"],
    companySize: "Enterprise (10,000+ employees)",
    headquarters: "Pangyo, Seongnam, South Korea",
    history: `Kakao began as "Kakao Talk", a messaging app, in 2010. The company has since expanded into various internet services, including gaming, entertainment, mobility, and fintech. In 2014, Kakao merged with Daum Communications, forming Daum Kakao (now simply Kakao).`,
    overview: `Kakao operates South Korea's most popular messaging app, KakaoTalk, used by over 90% of the country's population. The company has diversified into various digital services including payments (KakaoPay), mobility (KakaoT), entertainment (Kakao Entertainment), and gaming (Kakao Games).`,
  };

  const {
    name,
    description,
    logo,
    location,
    founded,
    employees,
    avgSalary,
    revenue,
    year,
    techStack,
    industry,
    companySize,
    headquarters,
    history,
    overview,
  } = companyData;

  return (
    <div className="flex flex-col lg:flex-row w-full gap-6 p-6">
      <div className="flex-1">
        <header className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt={`${name} Logo`} className="w-16 h-16 rounded-lg" />
            <div>
              <h1 className="text-3xl font-bold">{name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {description}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {location}
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-4 h-4" />
                  Founded {founded}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Employees</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees}</div>
              <p className="text-xs text-muted-foreground">As of 2023</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Salary</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgSalary}</div>
              <p className="text-xs text-muted-foreground">USD/Year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{revenue}</div>
              <p className="text-xs text-muted-foreground">{year}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Tech Stack</CardTitle>
            <CardDescription>Technologies used at Kakao</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {techStack.map((tech, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <Github className="w-8 h-8" />
                  <span className="text-sm">{tech}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Industry Classification</h3>
                  <div className="flex flex-wrap gap-2">
                    {industry.map((ind, idx) => (
                      <Badge key={idx}>{ind}</Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Company History</h3>
                  <p className="text-sm text-muted-foreground">{history}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-2">Business Overview</h3>
                  <p className="text-sm text-muted-foreground">{overview}</p>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="lg:w-[240px]">
        <div className="sticky top-6 space-y-4">
          <Button className="w-full gap-2">
            <Heart className="w-4 h-4" />
            Follow
          </Button>
          <Button variant="outline" className="w-full gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Company Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">{companySize}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Headquarters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">{headquarters}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
