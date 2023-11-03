import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useLike() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postJoin = async ({
    handle,
    activityID,
  }: {
    handle: string;
    activityID: number;
  }) => {
    if (loading) return;
    setLoading(true);

    const res = await fetch("/api/joins", {
      method: "POST",
      body: JSON.stringify({
        handle,
        activityID,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  const deleteJoin = async ({
    handle,
    activityID,
  }: {
    handle: string;
    activityID: number;
  }) => {
    if (loading) return;

    setLoading(true);
    const res = await fetch("/api/joins", {
      method: "DELETE",
      body: JSON.stringify({
        handle,
        activityID,
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
    postJoin,
    deleteJoin,
    loading,
  };
}
