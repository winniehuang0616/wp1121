import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useActivity() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postActivity = async ({
    activityName,
    startTime,
    endTime,
  }: {
    activityName: string;
    startTime: string;
    endTime: string;
  }) => {
    setLoading(true);

    const res = await fetch("/api/activitys", {
      method: "POST",
      body: JSON.stringify({
        activityName,
        startTime,
        endTime,
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
    postActivity,
    loading,
  };
}
