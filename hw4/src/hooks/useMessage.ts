import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { pusherClient } from "@/lib/pusher/client";
import type { Message, User } from "@/lib/types/db";

type PusherPayload = {
  senderId: User["id"];
  message: Message;
};

export default function useMessage() {
  const { docId } = useParams();
  const chatroom = Array.isArray(docId) ? docId[0] : docId;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const userID = session?.user?.id;

  const postMessage = async ({
    chatroom,
    userId,
    content,
  }: {
    chatroom: string;
    userId: string;
    content: string;
  }) => {
    setLoading(true);

    const res = await fetch(`/api/message`, {
      method: "POST",
      body: JSON.stringify({
        chatroom,
        userId,
        content
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      console.log(chatroom,
        userId,
        content)
      throw new Error(body.error);
    }


    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  };

  // Subscribe to pusher events
  useEffect(() => {
    if (!chatroom) return;
    // Private channels are in the format: private-...
    const channelName = `private-${chatroom}`;
    try {
      const channel = pusherClient.subscribe(channelName);
      channel.bind("chat:update", ({ senderId }: PusherPayload) => {
        console.log('msg rcvd');
        if (senderId === userID) {
          return;
        }
        router.refresh();
      });
    } catch (error) {
      console.error(error);
      router.push("/docs");
    }

    // Unsubscribe from pusher events when the component unmounts
    return () => {
      pusherClient.unsubscribe(channelName);
    };
  }, [chatroom, router, userID]);

  const deleteMessage = async ({
    id,
    userId
  }: {
    id: number
    userId:string
  }) => {
    setLoading(true);

    const res = await fetch(`/api/message`, {
      method: "DELETE",
      body: JSON.stringify({
        id,
        userId
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  // Subscribe to pusher events
  useEffect(() => {
    if (!chatroom) return;
    // Private channels are in the format: private-...
    const channelName = `private-${chatroom}`;
    try {
      const channel = pusherClient.subscribe(channelName);
      channel.bind("chat:delete", (userId:string) => {
        console.log('msg rcvd');
        if (userId === userID) {
          return;
        }
        router.refresh();
      });
    } catch (error) {
      console.error(error);
      router.push("/docs");
    }

    // Unsubscribe from pusher events when the component unmounts
    return () => {
      pusherClient.unsubscribe(channelName);
    };
  }, [chatroom, router, userID]);

  const updateMessage = async ({
    id,
  }: {
    id: number;
  }) => {
    setLoading(true);

    const res = await fetch(`/api/message`, {
      method: "PUT",
      body: JSON.stringify({
        id,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  return {
    postMessage,
    deleteMessage,
    updateMessage,
    loading,
  };
}
