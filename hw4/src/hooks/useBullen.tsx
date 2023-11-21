import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { pusherClient } from "@/lib/pusher/client";

export default function useBullen() {
  const { docId } = useParams();
  const chatroom = Array.isArray(docId) ? docId[0] : docId;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const userID = session?.user?.id;

  const postBullen = async ({
    userId,
    chatroom,
    content
  }: {
    userId: string
    chatroom: string;
    content: string;
  }) => {
    setLoading(true);

    const res = await fetch(`/api/broadcast`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        chatroom,
        content
      }),
      
    });

    if (!res.ok) {
      const body = await res.json();
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
      channel.bind("chat:post", (userId:string) => {
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

  const updateBullen = async ({
    userId,
    chatroom,
    content
  }: {
    userId: string;
    chatroom: string;
    content: string
  }) => {
    setLoading(true);

    const res = await fetch(`/api/broadcast`, {
      method: "PUT",
      body: JSON.stringify({
        userId,
        chatroom,
        content
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
      channel.bind("chat:alter", (userId:string) => {
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

  return {
    postBullen,
    updateBullen,
    loading,
  };
}