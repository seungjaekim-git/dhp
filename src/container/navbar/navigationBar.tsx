// import * as React from "react";
// import Link from "next/link";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";

// const items = [
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

// export default function NavigationMenuDemo() {
//   return (
//     <NavigationMenu className="max-w-full">
//       <NavigationMenuList>
//         {items.map((item) => (
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

// "use client"
// import * as React from "react";
// import Link from "next/link";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";

// const resourceItems = [
//   {
//     title: "Support Docs",
//     description: "Explore advice and explanations for all of Preline's features.",
//     icon: "BookOpen",
//     customerStory: {
//       image: "/path-to-image1.jpg",
//       text: "Preline Docs have been a game-changer for our team's productivity.",
//       learnMoreLink: "/stories/docs-impact"
//     }
//   },
//   {
//     title: "Integrations",
//     description: "Discover the huge range of tools that Preline integrates with.",
//     icon: "Puzzle",
//     customerStory: {
//       image: "/path-to-image2.jpg",
//       text: "Preline's integrations have streamlined our workflow significantly.",
//       learnMoreLink: "/stories/integration-success"
//     }
//   },
//   {
//     title: "API Reference",
//     description: "Build custom integrations with our first-class API.",
//     icon: "Code",
//     customerStory: {
//       image: "/path-to-image3.jpg",
//       text: "Our custom solution built on Preline's API has transformed our business.",
//       learnMoreLink: "/stories/api-innovation"
//     }
//   },
//   {
//     title: "Help Center",
//     description: "Learn how to install, set up, and use Preline.",
//     icon: "HelpCircle",
//     customerStory: {
//       image: "/path-to-image4.jpg",
//       text: "Preline's Help Center guided us through a seamless implementation.",
//       learnMoreLink: "/stories/help-center-experience"
//     }
//   },
//   {
//     title: "Developer Hub",
//     description: "Learn how to integrate or build on top of Preline.",
//     icon: "Code2",
//     customerStory: {
//       image: "/path-to-image5.jpg",
//       text: "The Developer Hub empowered us to create powerful custom features.",
//       learnMoreLink: "/stories/developer-success"
//     }
//   },
//   {
//     title: "Community Forum",
//     description: "Learn, share, and connect with other Preline users.",
//     icon: "Users",
//     customerStory: {
//       image: "/path-to-image6.jpg",
//       text: "The Preline community has been an invaluable resource for our team.",
//       learnMoreLink: "/stories/community-impact"
//     }
//   },
// ];

// export default function NavigationMenuDemo() {
//   const [activeStory, setActiveStory] = React.useState(resourceItems[0].customerStory);

//   return (
//     <header className="flex justify-between items-center p-4 bg-white shadow-sm">
//       <div className="text-xl font-bold">Brand</div>
//       <NavigationMenu>
//         <NavigationMenuList>
//           <NavigationMenuItem>
//             <Link href="/landing" legacyBehavior passHref>
//               <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                 Landing
//               </NavigationMenuLink>
//             </Link>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
//             <NavigationMenuContent>
//               <div className="w-[850px] p-6 bg-white rounded-lg shadow-lg">
//                 <div className="grid grid-cols-3 gap-6">
//                   <div className="col-span-2 grid grid-cols-2 gap-6">
//                     {resourceItems.map((item) => (
//                       <Link
//                         key={item.title}
//                         href="#"
//                         className="group block"
//                         onMouseEnter={() => setActiveStory(item.customerStory)}
//                       >
//                         <div className="flex items-center">
//                           {/* Replace with your actual icon component */}
//                           <span className="mr-3 h-6 w-6 text-gray-400 group-hover:text-blue-500">
//                             {/* <IconComponent name={item.icon} /> */}
//                           </span>
//                           <div>
//                             <div className="font-semibold text-gray-900 group-hover:text-blue-500">
//                               {item.title}
//                             </div>
//                             <p className="mt-1 text-sm text-gray-500">
//                               {item.description}
//                             </p>
//                           </div>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                   <div className="col-span-1">
//                     <h3 className="text-sm font-semibold text-gray-900 mb-4">CUSTOMER STORIES</h3>
//                     <div className="bg-gray-100 rounded-lg p-4">
//                       <img src={activeStory.image} alt="Customer" className="w-full h-32 object-cover rounded-lg mb-4" />
//                       <p className="text-sm text-gray-600 mb-2">{activeStory.text}</p>
//                       <Link href={activeStory.learnMoreLink} className="text-sm text-blue-500 hover:underline">
//                         Learn more →
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </NavigationMenuContent>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <Link href="/account" legacyBehavior passHref>
//               <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                 Account
//               </NavigationMenuLink>
//             </Link>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <Link href="/work" legacyBehavior passHref>
//               <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                 Work
//               </NavigationMenuLink>
//             </Link>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <Link href="/blog" legacyBehavior passHref>
//               <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                 Blog
//               </NavigationMenuLink>
//             </Link>
//           </NavigationMenuItem>
//         </NavigationMenuList>
//       </NavigationMenu>
//       <div className="flex items-center space-x-4">
//         <Link href="/signin" className="text-gray-600 hover:text-gray-900">
//           Sign in
//         </Link>
//         <Link href="/get-started" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//           Get started
//         </Link>
//       </div>
//     </header>
//   );
// }

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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react"; // Assuming you're using lucide-react for icons

const items = [
  {
    title: "Technologies",
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
      "다이오드": [
        { title: "Laravel", icon: "laravel" },
        { title: "Django", icon: "django" },
        { title: "Flask", icon: "flask" },
        { title: "Next", icon: "next" },
        { title: "Nuxt", icon: "nuxt" },
        { title: "Nodejs", icon: "nodejs" },
        { title: "Aspnet", icon: "aspnet" },
      ],
      "전원관리 IC": [
        { title: "Laravel", icon: "laravel" },
        { title: "Django", icon: "django" },
        { title: "Flask", icon: "flask" },
        { title: "Next", icon: "next" },
        { title: "Nuxt", icon: "nuxt" },
        { title: "Nodejs", icon: "nodejs" },
        { title: "Aspnet", icon: "aspnet" },
      ],
      "케이블": [
        { title: "Tailwind CSS", icon: "tailwind" },
        { title: "Bootstrap", icon: "bootstrap" },
        { title: "Angular", icon: "angular" },
        { title: "React", icon: "react" },
        { title: "Vuejs", icon: "vue" },
        { title: "React Native", icon: "react-native" },
        { title: "Svelte", icon: "svelte" },
      ],
      "센서": [
        { title: "Tailwind CSS", icon: "tailwind" },
        { title: "Bootstrap", icon: "bootstrap" },
        { title: "Angular", icon: "angular" },
        { title: "React", icon: "react" },
        { title: "Vuejs", icon: "vue" },
        { title: "React Native", icon: "react-native" },
        { title: "Svelte", icon: "svelte" },
      ],
      "자동차 인증 제품": [
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
  return (
    <NavigationMenu className="max-w-full">
      <NavigationMenuList className="flex-col md:flex-row">
        {items.map((item) => (
          <NavigationMenuItem key={item.title} className="w-auto md:w-full">
            {item.content ? (
              <>
                <NavigationMenuTrigger className="w-full justify-between">
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-screen bg-white p-4 md:p-6">
                    {/* Desktop view */}
                    <div className="hidden md:grid md:grid-cols-6 gap-4">
                      {Object.entries(item.content).map(([category, subItems]) => (
                        <div key={category} className="space-y-4">
                          <h2 className="text-lg font-bold">{category}</h2>
                          <div className="grid gap-2 md:grid-cols-1">
                            {subItems.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={`#${subItem.title.toLowerCase().replace(' ', '-')}`}
                                className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100"
                              >
                                <span className="h-6 w-6 flex-shrink-0 text-gray-400">
                                  {/* <Icon name={subItem.icon} /> */}
                                </span>
                                <span className="text-sm font-medium">{subItem.title}</span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Mobile/Tablet view - Accordion */}
                    <Accordion type="single" collapsible className="md:hidden">
                      {Object.entries(item.content).map(([category, subItems]) => (
                        <AccordionItem value={category} key={category}>
                          <AccordionTrigger>{category}</AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-2 gap-2">
                              {subItems.map((subItem) => (
                                <Link
                                  key={subItem.title}
                                  href={`#${subItem.title.toLowerCase().replace(' ', '-')}`}
                                  className="flex items-center space-x-2 rounded-md p-2 hover:bg-gray-100"
                                >
                                  <span className="h-5 w-5 flex-shrink-0 text-gray-400">
                                    {/* <Icon name={subItem.icon} /> */}
                                  </span>
                                  <span className="text-sm">{subItem.title}</span>
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={item.href || "#"} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.title}
                  {item.isNew && (
                    <span className="ml-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                      NEW
                    </span>
                  )}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

