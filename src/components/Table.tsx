import React from "react";
import { useTranslation } from "next-i18next";


const Table: React.FC<{ users: any[] }> = ({ users }) => {
  const { i18n } = useTranslation("common");
  

  return (
    <div className="flex flex-col gap-4 h-[400px]">
      {users && users.length > 0 && (
        <>
          <h2 className="text-[#6D5CBC] font-bold ">
            {i18n.language === "ar" ? "النتائج" : "Results"}:
          </h2>
          <div className="overflow-x-auto shadow-md rounded-md">
            <table className="min-w-full border border-gray-300 bg-white">
              <thead className="bg-gray-100">
                <tr className="text-[#999999] uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">
                    {i18n.language === "ar" ? "الاسم الاول" : "First name"}
                  </th>
                  <th className="py-3 px-6 text-left">
                    {i18n.language === "ar" ? "الاسم الأخير" : "Last name"}
                  </th>
                  <th className="py-3 px-6 text-left">
                    {i18n.language === "ar" ? "رقم الهاتف" : "Mobile number"}
                  </th>
                  <th className="py-3 px-6 text-left">
                    {i18n.language === "ar" ? "البريد الألكتروني" : "Email"}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {users.map((row: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left">{row.FirstName}</td>
                    <td className="py-3 px-6 text-left">{row.LastName}</td>
                    <td className="py-3 px-6 text-left">{row.Phone}</td>
                    <td className="py-3 px-6 text-left">{row.Email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};



export default Table;
