"use client";
import React, { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "next-i18next";

const Navbar: React.FC = () => {
  const { i18n, t } = useTranslation("common");
  const [navLinks] = useState([
    {
      ar:"الرئيسية",
      en: "Home"
    },
    {
      ar:"الأقسام",
      en: "Categories"
    },
    {
      ar:"تواصل معنا",
      en: "Contact Us"
    },
    {
      ar:"معلومات عنا",
      en: "About Us"
    },
  ]);
  const [activeLink, setActiveLink] = useState("Home");

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <nav className="flex items-center fixed top-0 w-full bg-[#FCFCFE] z-[800]">
      <img
        className="w-[60px] h-[40px] md:w-[76px] md:h-[56px]"
        src="/image.png"
        alt="logo"
        
      />
      <div className=" flex text-xs md:text-[16px] w-full md:w-[50%] items-center justify-evenly">
        {navLinks.map((link) => (
          <div
            key={link.en}
            className={`font-medium transition-all duration-300 cursor-pointer ${
              activeLink === link.en || activeLink === link.ar  ? "text-[#49BD88] font-semibold" : ""
            }`}
            onClick={() => i18n.language === "ar" ? handleLinkClick(link.ar) : handleLinkClick(link.en)}
          >
            {i18n.language === "ar" ? link.ar : link.en}
          </div>
        ))}
      </div>
      <div
        className={`${
          i18n.language === "ar" ? "mr-auto ml-4" : "ml-auto mr-4"
        }`}
      >
        <LanguageSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
