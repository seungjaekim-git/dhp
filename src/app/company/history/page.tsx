import CompanyHistoryClient from "./CompanyHistoryClient";

export default async function CompanyHistoryPage() {
    const timelineData = [
        {
            title: "Flowbite Application UI v2.0.0",
            date: "January 13th, 2022",
            content: {
                description: "Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.",
            },
            isLatest: true,
            image: "https://via.placeholder.com/150",
        },
        {
            title: "Flowbite Figma v1.3.0",
            date: "December 7th, 2021",
            content: {
                description: "All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.",
            },
        },
    ];

    return <CompanyHistoryClient timelineData={timelineData} />;
}
