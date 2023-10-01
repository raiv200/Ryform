"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function FormShareLinkPage({
  params,
}: {
  params: { formId: string };
}) {
  const [isCopied, setIsCopied] = useState(false);

  const baseUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://ryform.vercel.app';

    console.log(baseUrl)

  const link = `${baseUrl}/r/${params.formId}`

  const handleCopyToClipBoard = () => {
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  return (
    <div className="flex flex-col space-y-6 max-w-xl px-2 md:px-0 py-4">
      <div className="flex flex-col space-y-2">
        <h3 className="font-bold text-primary text-lg md:text-2xl">
          Share Link
        </h3>
        <p className="font-normal text-sm md:text-md text-muted-foreground">
          Your form is now published and ready to be shared with the world! Copy
          this link to share your form on social media, messaging apps or via
          email.
        </p>
      </div>
      <div className="flex flex-col space-y-4 max-w-sm ">
        <Input
          type="url"
          contentEditable={false}
          value={link}
          onChange={() => {
            console.log(link);
          }}
          className="border-primary shadow-md hover:shadow-xl"
        />
        <Button onClick={handleCopyToClipBoard} size="sm" className="w-[100px]">
          {isCopied ? (
            "Copied !!"
          ) : (
            <>
              <Icons.copy strokeWidth={3} className="mr-2 h-4 w-4" />
              Copy
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
