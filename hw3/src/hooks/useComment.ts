import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useComment() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postComment = async ({
    activityID,
    handle,
    content,
  }: {
    activityID: number;
    handle: string;
    content: string;
  }) => {
    setLoading(true);

    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        activityID,
        handle,
        content,
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

  return {
    postComment,
    loading,
  };
}