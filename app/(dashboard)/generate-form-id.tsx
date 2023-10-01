"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import React from "react";

export default function GenerateFormId() {
  const router = useRouter();

  const handleCreateNewForm = () => {
    const formId = nanoid(10);
    router.push(`/create/${formId}`);
  };
  return (
    <Button onClick={handleCreateNewForm}>
      <Icons.add strokeWidth={2} className="mr-2 h-4 w-4" />
      New Form
    </Button>
  );
}
