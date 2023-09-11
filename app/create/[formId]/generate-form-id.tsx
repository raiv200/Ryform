"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function GenerateFormId() {
  const router = useRouter();

  const handleCreateNewForm = () => {
    const formId = Date.now().toString();
    router.push(`/dashboard/${formId}`);
  };
  return (
    <div>
      <button 
      className="px-4 py-2 rounded-md bg-gray-800 text-white font-bold text-md" 
      onClick={handleCreateNewForm}
      >
        
        Create New Form
     </button>
    </div>
  );
}
