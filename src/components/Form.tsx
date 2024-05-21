"use client";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import axios from "axios";
interface FormData {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
}

const Form: React.FC = () => {
  const { i18n } = useTranslation("common");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validate = (): boolean => {
    const errors: Partial<FormData> = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.mobileNumber)
      errors.mobileNumber = "Mobile number is required";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    else if (isNaN(Number(formData.mobileNumber)))
      errors.mobileNumber = "Mobile number is invalid";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const data = {
        FirstName: formData.firstName,
        LastName: formData.lastName,
        Phone: formData.mobileNumber,
        Email: formData.email,
      };
      await axios.post("http://localhost:1337/user-informations", data);
      setFormData({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
      });
      window.location.reload();
    
    } else {
      console.log("Form data is invalid");
    }
  };

  return (
    <form className="space-y-4 w-full " onSubmit={handleSubmit}>
      <div className="flex gap-4">
        <div className="flex-1">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="firstName"
          >
            {i18n.language === "ar" ? "الاسم الاول" : "First name"}
          </label>
          <input
            type="text"
            id="firstName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={i18n.language === "ar" ? "الاسم الاول" : "First name"}
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
          )}
        </div>
        <div className="flex-1">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="lastName"
          >
            {i18n.language === "ar" ? "الاسم الأخير" : "Last name"}
          </label>
          <input
            type="text"
            id="lastName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={i18n.language === "ar" ? "الاسم الأخير" : "Last name"}
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
          )}
        </div>
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="mobileNumber"
        >
          {i18n.language === "ar" ? "رقم الهاتف" : "Mobile number"}
        </label>
        <input
          type="text"
          id="mobileNumber"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={i18n.language === "ar" ? "رقم الهاتف" : "Mobile number"}
          value={formData.mobileNumber}
          onChange={handleChange}
        />
        {errors.mobileNumber && (
          <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
        )}
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor="email"
        >
          {i18n.language === "ar" ? "البريد الألكتروني" : "Email"}
        </label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder={i18n.language === "ar" ? "البريد الألكتروني" : "Email"}
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        {i18n.language === "ar" ? "ارسال" : "Submit"}
      </button>
    </form>
  );
};

export default Form;
