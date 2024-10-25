
"use client";
import React from "react";
import { HeroParallax } from "@/components/ui/hero-parrallax";
import Feature from "@/container/features/features"
import Partners from "@/container/partners/partners";

import { ThreeDCard } from "@/components/custom/3d-card";

export default function Home() {
  const products = [
    {
      title: "Moonbeam",
      link: "https://gomoonbeam.com",
      thumbnail:
        "/images/led_driver_ic_category_banner.png",
    },
    {
      title: "Cursor",
      link: "https://cursor.so",
      thumbnail:
        "/images/diode_category_banner.png",
    },
    {
      title: "Rogue",
      link: "https://userogue.com",
      thumbnail: "/images/battery_ic_category_banner.png",
    },
   
    {
      title: "Editorially",
      link: "https://editorially.org",
      thumbnail:
        "/images/dh_logo.png",
    },
    {
      title: "Editrix AI",
      link: "https://editrix.ai",
      thumbnail:
        "/images/connector_category_banner.png",
    },
    {
      title: "Pixel Perfect",
      link: "https://app.pixelperfect.quest",
      thumbnail:
        "/thumbnails/thumbnail_Macroblock.png",
    },
   
    {
      title: "Algochurn",
      link: "https://algochurn.com",
      thumbnail:
        "/thumbnails/thumbnail_Zowie.png",
    },
    {
      title: "Aceternity UI",
      link: "https://ui.aceternity.com",
      thumbnail:
        "/thumbnails/thumbnail_XLSEMI.png",
    },
    {
      title: "Tailwind Master Kit",
      link: "https://tailwindmasterkit.com",
      thumbnail:
        "/thumbnails/thumbnail_Powtech.png",
    },
    {
      title: "SmartBridge",
      link: "https://smartbridgetech.com",
      thumbnail:
        "/thumbnails/thumbnail_Morethanall.png",
    },
    {
      title: "Renderwork Studio",
      link: "https://renderwork.studio",
      thumbnail:
        "/thumbnails/thumbnail_LLT.png",
    },
   
    {
      title: "Creme Digital",
      link: "https://cremedigital.com",
      thumbnail:
        "/thumbnails/thumbnail_Kube.png",
    },
    {
      title: "Golden Bells Academy",
      link: "https://goldenbellsacademy.com",
      thumbnail:
        "/thumbnails/thumbnail_GTM.png",
    },
    {
      title: "Invoker Labs",
      link: "https://invoker.lol",
      thumbnail:
        "/thumbnails/thumbnail_GTM.png",
    },
    {
      title: "E Free Invoice",
      link: "https://efreeinvoice.com",
      thumbnail:
        "/thumbnails/thumbnail_GTM.png",
    },
  ];
  
  return (

    <div id="Herosection" className="container p-4">
      <HeroParallax products={products}/>
      <Feature></Feature>
      <Partners></Partners>
      <ThreeDCard></ThreeDCard>
    </div>
    
  );
}
