"use client"

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// const items1 = [
//   {
//     title: "Technologies",
//     content: {
//       "Front-End": [
//         { title: "Tailwind CSS", icon: "tailwind" },
//         { title: "Bootstrap", icon: "bootstrap" },
//         { title: "Angular", icon: "angular" },
//         { title: "React", icon: "react" },
//         { title: "Vuejs", icon: "vue" },
//         { title: "React Native", icon: "react-native" },
//         { title: "Svelte", icon: "svelte" },
//       ],
//       "Back-End": [
//         { title: "Laravel", icon: "laravel" },
//         { title: "Django", icon: "django" },
//         { title: "Flask", icon: "flask" },
//         { title: "Next", icon: "next" },
//         { title: "Nuxt", icon: "nuxt" },
//         { title: "Nodejs", icon: "nodejs" },
//         { title: "Aspnet", icon: "aspnet" },
//       ],
//     },
//   },
//   {
//     title: "Tailwind CSS",
//     href: "/tailwind",
//   },
//   {
//     title: "Bundles",
//     href: "/bundles",
//     isNew: true,
//   },
//   {
//     title: "Bootstrap",
//     href: "/bootstrap",
//   },
//   {
//     title: "Resources & AI",
//     content: {
//       "Resources": [
//         { title: "Premium Templates", href: "/premium-templates" },
//         { title: "Free Templates", href: "/free-templates" },
//         { title: "Admin & Dashboards", href: "/admin-dashboards" },
//         { title: "UI Kits", href: "/ui-kits" },
//         { title: "All Templates", href: "/all-templates" },
//         { title: "Landing Pages", href: "/landing-pages" },
//       ],
//     },
//   },
// ];

// export function NavigationMenuDemo1() {
//   return (
//     <NavigationMenu className="max-w-full">
//       <NavigationMenuList>
//         {items1.map((item) => (
//           <NavigationMenuItem key={item.title}>
//             {item.content ? (
//               <>
//                 <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
//                 <NavigationMenuContent>
//                   <div className="w-screen bg-white p-6">
//                     <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-8 gap-y-10">
//                       {Object.entries(item.content).map(([category, subItems]) => (
//                         <div key={category}>
//                           <h2 className="text-xl font-bold mb-4">{category}</h2>
//                           <div className="grid grid-cols-2 gap-4">
//                             {subItems.map((subItem) => (
//                               <div key={subItem.title} className="group relative">
//                                 <div className="flex items-center">
//                                   {subItem.icon && (
//                                     <span className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-indigo-600">
//                                       {/* Icon component here */}
//                                     </span>
//                                   )}
//                                   <Link
//                                     href={subItem.href || "#"}
//                                     className="text-base font-medium text-gray-900 group-hover:text-indigo-600"
//                                   >
//                                     {subItem.title}
//                                   </Link>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </NavigationMenuContent>
//               </>
//             ) : (
//               <Link href={item.href || "#"} legacyBehavior passHref>
//                 <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                   {item.title}
//                   {item.isNew && (
//                     <span className="ml-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
//                       NEW
//                     </span>
//                   )}
//                 </NavigationMenuLink>
//               </Link>
//             )}
//           </NavigationMenuItem>
//         ))}
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// }

const resourceItems = [
  {
    title: "Support Docs",
    description: "Explore advice and explanations for all of Preline's features.",
    icon: "BookOpen",
    customerStory: {
      image: "/path-to-image1.jpg",
      text: "Preline Docs have been a game-changer for our team's productivity.",
      learnMoreLink: "/stories/docs-impact"
    }
  },
  {
    title: "Integrations",
    description: "Discover the huge range of tools that Preline integrates with.",
    icon: "Puzzle",
    customerStory: {
      image: "/path-to-image2.jpg",
      text: "Preline's integrations have streamlined our workflow significantly.",
      learnMoreLink: "/stories/integration-success"
    }
  },
  {
    title: "API Reference",
    description: "Build custom integrations with our first-class API.",
    icon: "Code",
    customerStory: {
      image: "/path-to-image3.jpg",
      text: "Our custom solution built on Preline's API has transformed our business.",
      learnMoreLink: "/stories/api-innovation"
    }
  },
  {
    title: "Help Center",
    description: "Learn how to install, set up, and use Preline.",
    icon: "HelpCircle",
    customerStory: {
      image: "/path-to-image4.jpg",
      text: "Preline's Help Center guided us through a seamless implementation.",
      learnMoreLink: "/stories/help-center-experience"
    }
  },
  {
    title: "Developer Hub",
    description: "Learn how to integrate or build on top of Preline.",
    icon: "Code2",
    customerStory: {
      image: "/path-to-image5.jpg",
      text: "The Developer Hub empowered us to create powerful custom features.",
      learnMoreLink: "/stories/developer-success"
    }
  },
  {
    title: "Community Forum",
    description: "Learn, share, and connect with other Preline users.",
    icon: "Users",
    customerStory: {
      image: "/path-to-image6.jpg",
      text: "The Preline community has been an invaluable resource for our team.",
      learnMoreLink: "/stories/community-impact"
    }
  },
];

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react"; // Assuming you're using lucide-react for icons

const items = [
  {
    title: "LED Driver IC",
    content: {
      "LED Driver IC": [
        { title: "Tailwind CSS", icon: "tailwind" },
        { title: "Bootstrap", icon: "bootstrap" },
        { title: "Angular", icon: "angular" },
        { title: "React", icon: "react" },
        { title: "Vuejs", icon: "vue" },
        { title: "React Native", icon: "react-native" },
        { title: "Svelte", icon: "svelte" },
      ],
    },
  },
  {
    title: "전원관리 IC",
    content: {
      "DC DC ": [
        { title: "Tailwind CSS", icon: "tailwind" },
        { title: "Bootstrap", icon: "bootstrap" },
        { title: "Angular", icon: "angular" },
        { title: "React", icon: "react" },
        { title: "Vuejs", icon: "vue" },
        { title: "React Native", icon: "react-native" },
        { title: "Svelte", icon: "svelte" },
      ],
    },
  },
  {
    title: "다이오드",
    content: {
      "제너 다이오드": [
        { title: "Tailwind CSS", icon: "tailwind" },
      ],
      "정류 다이오드": [
        { title: "Tailwind CSS", icon: "tailwind" },
        { title: "Bootstrap", icon: "bootstrap" },
        { title: "Angular", icon: "angular" },
        { title: "React", icon: "react" },
        { title: "Vuejs", icon: "vue" },
      ],
      "쇼트키 다이오드": [
        { title: "Tailwind CSS", icon: "tailwind" },
        { title: "Bootstrap", icon: "bootstrap" },
        { title: "Angular", icon: "angular" },
        { title: "React", icon: "react" },

      ],

    },

  },
  {
    title: "센서",
    content: {
      "센서": [
        { title: "Tailwind CSS", icon: "tailwind" },
        { title: "Bootstrap", icon: "bootstrap" },
        { title: "Angular", icon: "angular" },
        { title: "React", icon: "react" },
        { title: "Vuejs", icon: "vue" },
        { title: "React Native", icon: "react-native" },
        { title: "Svelte", icon: "svelte" },
      ],
    },
  },
  // ... other menu items
];

export default function ResponsiveNavigationMenu() {

  const [activeCategory, setActiveCategory] = React.useState(null);

  const [activeStory, setActiveStory] = React.useState(resourceItems[0].customerStory);

  return (
    <NavigationMenu className="max-w-full">
      <NavigationMenuList className="flex-row">
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            회사소개
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-screen bg-white p-4 md:p-6">

              <div className="flex gap-4 p-4 w-full h-full justify-center">
              <NavigationMenuLink asChild>
                  <a
                    className="flex w-[200px] select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    {/* <Icons.logo className="h-6 w-6" /> */}
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components that you can copy and
                      paste into your apps. Accessible. Customizable. Open
                      Source.
                    </p>
                  </a>
                </NavigationMenuLink>
                <div className={'flex flex-col gap-3 m-4'}>
                  <Link
                  href="#"
                  className="p-2 rounded-md hover:bg-gray-100">
                    <h3 className={'dark:text-white text-neutral-950'}>인사말</h3>
                    <p className={'text-neutral-500 text-sm'}>
                      Interactive, beautiful and user friendly websites
                    </p>
                  </Link>
                  <Link
                  href="#"
                  className="p-2 rounded-md hover:bg-gray-100">
                    <h3 className={'dark:text-white text-neutral-950'}>회사 연혁</h3>
                    <p className={'text-neutral-500 text-sm'}>Animated and colorful components</p>
                  </Link>
                  <Link
                  href="#"
                  className="p-2 rounded-md hover:bg-gray-100">
                    <h3 className={'dark:text-white text-neutral-950'}>사업 소개</h3>
                    <p className={'text-neutral-500 text-sm'}>
                      Useful Software as a Service products which people love
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            Product
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="w-screen bg-white p-4 md:p-6">
              {/* Desktop view */}
              <div className="flex">
                {/* Categories column */}
                <div className="w-1/4 bg-gray-100">
                  {items.map((item) => (
                    <div
                      key={item.title}
                      className="p-4 cursor-pointer hover:bg-gray-200"
                      onMouseEnter={() => setActiveCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>

                {/* Subitems column */}
                <div className="w-3/4 bg-white p-4">
                  {activeCategory && (
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(items.find(item => item.title === activeCategory).content).map(([category, subItems]) => (
                        <div key={category} className="space-y-4">
                          <h2 className="text-lg font-bold">{category}</h2>
                          <div className="space-y-2">
                            {subItems.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={`#${subItem.title.toLowerCase().replace(' ', '-')}`}
                                className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100"
                              >
                                <span className="h-6 w-6 flex-shrink-0 text-gray-400">
                                  {/* Icon component here */}
                                </span>
                                <span className="text-sm">{subItem.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>
          </NavigationMenuContent>

        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            제조사
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-screen bg-white p-4 md:p-6">
              {/* Desktop view */}
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 grid grid-cols-2 gap-6">
                  {resourceItems.map((item) => (
                    <Link
                      key={item.title}
                      href="#"
                      className="group block"
                      onMouseEnter={() => setActiveStory(item.customerStory)}
                    >
                      <div className="flex items-center">
                        {/* Replace with your actual icon component */}
                        <span className="mr-3 h-6 w-6 text-gray-400 group-hover:text-blue-500">
                          {/* <IconComponent name={item.icon} /> */}
                        </span>
                        <div>
                          <div className="font-semibold text-gray-900 group-hover:text-blue-500">
                            {item.title}
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="col-span-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">CUSTOMER STORIES</h3>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <img src={activeStory.image} alt="Customer" className="w-full h-32 object-cover rounded-lg mb-4" />
                    <p className="text-sm text-gray-600 mb-2">{activeStory.text}</p>
                    <Link href={activeStory.learnMoreLink} className="text-sm text-blue-500 hover:underline">
                      Learn more →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <Link href="#" legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Documentation
          </NavigationMenuLink>
        </Link>

        <NavigationMenuItem>
          <NavigationMenuTrigger>
            고객 지원
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-screen bg-white p-4 md:p-6">
              <div className="flex justify-center">
                <div className={'p-4 border-r dark:border-neutral-800'}>
                  <div className={'text-sm dark:text-neutral-500 text-neutral-400 px-3'}>문의</div>
                  <span
                    className={
                      'block hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-colors w-fit'
                    }
                  >
                    <h3 className={'dark:text-white text-neutral-950 flex items-center gap-1'}>
                      FAQ{' '}
                      <svg
                        viewBox="0 0 12 12"
                        width="10px"
                        xmlns="http://www.w3.org/2000/svg"
                        className="stransition-all duration-100 dark:fill-neutral-500 fill-neutral-900"
                      >
                        <path d="M11 9.283V1H2.727v1.44h5.83L1 9.99 2.01 11l7.556-7.55v5.833H11Z" />
                      </svg>
                    </h3>
                    <p className={'text-neutral-500 text-sm'}>Check out how we deliver our products</p>
                  </span>
                  <span
                    className={
                      'block hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-colors w-fit'
                    }
                  >
                    <h3 className={'dark:text-white text-neutral-950 flex items-center gap-1'}>
                      제품 지원 문의{' '}
                      <svg
                        viewBox="0 0 12 12"
                        width="10px"
                        xmlns="http://www.w3.org/2000/svg"
                        className="stransition-all duration-100 dark:fill-neutral-500 fill-neutral-900"
                      >
                        <path d="M11 9.283V1H2.727v1.44h5.83L1 9.99 2.01 11l7.556-7.55v5.833H11Z" />
                      </svg>
                    </h3>
                    <p className={'text-neutral-500 text-sm'}>Check out how we deliver our products</p>
                  </span>
                </div>

                <div className={'p-4 border-r dark:border-neutral-800'}>
                  <div className={'text-sm dark:text-neutral-500 text-neutral-400 px-3'}>연락처</div>
                  <span
                    className={
                      'block hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-colors w-fit'
                    }
                  >
                    <h3 className={'dark:text-white text-neutral-950 flex items-center gap-1'}>
                    전화 및 이메일 정보{' '}
                      <svg
                        viewBox="0 0 12 12"
                        width="10px"
                        xmlns="http://www.w3.org/2000/svg"
                        className="stransition-all duration-100 dark:fill-neutral-500 fill-neutral-900"
                      >
                        <path d="M11 9.283V1H2.727v1.44h5.83L1 9.99 2.01 11l7.556-7.55v5.833H11Z" />
                      </svg>
                    </h3>
                    <p className={'text-neutral-500 text-sm'}>Check out how we deliver our products</p>
                  </span>
                  <span
                    className={
                      'block hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-colors w-fit'
                    }
                  >
                    <h3 className={'dark:text-white text-neutral-950 flex items-center gap-1'}>
                      오시는길 {' '}
                      <svg
                        viewBox="0 0 12 12"
                        width="10px"
                        xmlns="http://www.w3.org/2000/svg"
                        className="stransition-all duration-100 dark:fill-neutral-500 fill-neutral-900"
                      >
                        <path d="M11 9.283V1H2.727v1.44h5.83L1 9.99 2.01 11l7.556-7.55v5.833H11Z" />
                      </svg>
                    </h3>
                    <p className={'text-neutral-500 text-sm'}>Check out how we deliver our products</p>
                  </span>
                </div>

                <div className={'p-4 border-r dark:border-neutral-800'}>
                  <div className={'text-sm dark:text-neutral-500 text-neutral-400 px-3'}>자료실</div>
                  <span
                    className={
                      'block hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-colors w-fit'
                    }
                  >
                    <h3 className={'dark:text-white text-neutral-950 flex items-center gap-1'}>
                      데이터 시트{' '}
                      <svg
                        viewBox="0 0 12 12"
                        width="10px"
                        xmlns="http://www.w3.org/2000/svg"
                        className="stransition-all duration-100 dark:fill-neutral-500 fill-neutral-900"
                      >
                        <path d="M11 9.283V1H2.727v1.44h5.83L1 9.99 2.01 11l7.556-7.55v5.833H11Z" />
                      </svg>
                    </h3>
                    <p className={'text-neutral-500 text-sm'}>Check out how we deliver our products</p>
                  </span>
                  <span
                    className={
                      'block hover:dark:bg-neutral-900 hover:bg-neutral-100 p-3 rounded-md transition-colors w-fit'
                    }
                  >
                    <h3 className={'dark:text-white text-neutral-950 flex items-center gap-1'}>
                      제품 선택 가이드 {' '}
                      <svg
                        viewBox="0 0 12 12"
                        width="10px"
                        xmlns="http://www.w3.org/2000/svg"
                        className="stransition-all duration-100 dark:fill-neutral-500 fill-neutral-900"
                      >
                        <path d="M11 9.283V1H2.727v1.44h5.83L1 9.99 2.01 11l7.556-7.55v5.833H11Z" />
                      </svg>
                    </h3>
                    <p className={'text-neutral-500 text-sm'}>Check out how we deliver our products</p>
                  </span>
                </div>

              </div>

            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// export function ResponsiveNavigationMenu3() {
//   const [activeCategory, setActiveCategory] = React.useState(null);

//   return (
//     <div className="flex">
//       {/* Categories column */}
//       <div className="w-1/4 bg-gray-100">
//         {items.map((item) => (
//           <div
//             key={item.title}
//             className="p-4 cursor-pointer hover:bg-gray-200"
//             onMouseEnter={() => setActiveCategory(item.title)}
//           >
//             {item.title}
//           </div>
//         ))}
//       </div>

//       {/* Subitems column */}
//       <div className="w-3/4 bg-white p-4">
//         {activeCategory && (
//           <div className="grid grid-cols-3 gap-4">
//             {Object.entries(items.find(item => item.title === activeCategory).content).map(([category, subItems]) => (
//               <div key={category} className="space-y-4">
//                 <h2 className="text-lg font-bold">{category}</h2>
//                 <div className="space-y-2">
//                   {subItems.map((subItem) => (
//                     <Link
//                       key={subItem.title}
//                       href={`#${subItem.title.toLowerCase().replace(' ', '-')}`}
//                       className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100"
//                     >
//                       <span className="h-6 w-6 flex-shrink-0 text-gray-400">
//                         {/* Icon component here */}
//                       </span>
//                       <span className="text-sm">{subItem.title}</span>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// {/* Mobile/Tablet view - Accordion */}
// <Accordion type="single" collapsible className="md:hidden">
// {Object.entries(item.content).map(([category, subItems]) => (
//   <AccordionItem value={category} key={category}>
//     <AccordionTrigger>{category}</AccordionTrigger>
//     <AccordionContent>
//       <div className="grid grid-cols-2 gap-2">
//         {subItems.map((subItem) => (
//           <Link
//             key={subItem.title}
//             href={`#${subItem.title.toLowerCase().replace(' ', '-')}`}
//             className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100"
//           >
//             <span className="h-5 w-5 flex-shrink-0 text-gray-400">
//               {/* <Icon name={subItem.icon} /> */}
//             </span>
//             <span className="text-sm">{subItem.title}</span>
//           </Link>
//         ))}
//       </div>
//     </AccordionContent>
//   </AccordionItem>
// ))}
// </Accordion>