import Chat from "@/components/Chat";
import React from "react";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  return <Chat id={id}/>;
};

export default Page;
