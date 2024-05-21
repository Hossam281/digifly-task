import React from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Form from "@/components/Form";
import Table from "@/components/Table";
import TextEditor from "@/components/TextEditor";
import { json } from "stream/consumers";

const MyMap = dynamic(() => import("@/components/Map"), { ssr: false });
const Home = ({ locale, users }: { locale: string; users: any }) => {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col font-poppins gap-40">
      <div className="container mx-auto px-6  grid grid-cols-1 md:grid-cols-2 mt-28 gap-20">
        <Form />
        <Table users={users} />
      </div>
      <div className="w-full relative">
        <div className="w-full absolute top-0 h-[70px] bg-gradient-to-b from-white to-transparent z-50"></div>
        <MyMap />
        <div className="w-full absolute bottom-0 h-[70px] bg-gradient-to-t from-white to-transparent z-50"></div>
      </div>
      <TextEditor />
    </div>
  );
};

export async function getServerSideProps({ locale }: { locale: string }) {
  try {
    const data = await axios.get("http://localhost:1337/user-informations");
    const users=JSON.parse(JSON.stringify(data.data));
    const reversedUsers = users.reverse();

    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        users : reversedUsers,
      },
    };
  } catch (error) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
        users: [],
      },
    };
  }
}

export default Home;
