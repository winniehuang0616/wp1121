import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useBullen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postBullen = async ({
    chatroom,
    content
  }: {
    chatroom: string;
    content: string;
  }) => {
    setLoading(true);

    const res = await fetch(`/api/broadcast`, {
      method: "POST",
      body: JSON.stringify({
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

  const updateBullen = async ({
    chatroom,
    content
  }: {
    chatroom: string;
    content: string
  }) => {
    setLoading(true);

    const res = await fetch(`/api/broadcast`, {
      method: "PUT",
      body: JSON.stringify({
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

  return {
    postBullen,
    updateBullen,
    loading,
  };
}