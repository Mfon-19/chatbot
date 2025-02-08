import Chat from "@/components/chat";
import { getMessagesByChatId } from "@/lib/queries";
import { convertToUIMessages } from "@/lib/utils";
import React from "react";

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const initialMessages = await getMessagesByChatId({ id });

  return <Chat id={id} initialMessages={convertToUIMessages(initialMessages)} />;
};

export default Page;
