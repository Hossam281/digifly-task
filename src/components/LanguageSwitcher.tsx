"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
];

const LanguageSwitcher = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setCurrentLanguage(i18n.language);
    const html = document.querySelector("html");
    if (html) {
      if (i18n.language === "ar") {
        document.body.dir = "rtl";
      } else {
        document.body.dir = "ltr";
      }
    }
  }, [i18n.language]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    router.push(`/?lng=${lng}`);
    setCurrentLanguage(lng);
    setIsDropdownOpen(false); // Close the dropdown after selecting a language
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="inline-flex  justify-center w-full px-4 py-2 text-sm font-medium text-black  rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        {currentLanguage === "en" ? (
          <div className="flex items-center gap-2">
            En
            <img src="/images/english.png" alt="flag" width={20} height={20} />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            العربية
            <img src="/images/arabic.png" alt="flag" width={20} height={20} />
          </div>
        )}
      </button>
      {isDropdownOpen && (
        <div
          className={`absolute ${
            i18n.language === "ar" ? "left-0" : "right-0"
          } z-[999]  mt-2 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        >
          <div className="px-1 py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className="group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 hover:bg-blue-500 hover:text-white"
                onClick={() => changeLanguage(lang.code)}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
