"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function BackButton() {
  const router = useRouter();
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    setHasHistory(window.history.length > 1);
  }, []);

  const handleBack = () => {
    if (hasHistory) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return hasHistory ? (
    <button className="link" onClick={handleBack}>
      ← back
    </button>
  ) : (
    <button disabled className="sr-only"></button>
  );
}
