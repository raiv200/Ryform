"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { v4 as uuidv4 } from 'uuid';

export default function GenerateFormId() {
  const router = useRouter();

  const handleCreateNewForm = () => {
    const formId = uuidv4() ;
    router.push(`/create/${formId}`);
  };
  return (
    <div>
      {/* <Link  href="/create/"> */}
        <Button onClick={handleCreateNewForm}>
          <Icons.add strokeWidth={2} className="mr-2 h-4 w-4" />
            New Form
        </Button>
        {/* </Link> */}
    </div>
  );
}