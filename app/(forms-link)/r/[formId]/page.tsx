"use client";

import NotFound from "./notfound";
import UserForm from "./userForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Database, Json } from "@/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

interface FormField {
  id: number;
  type: string;
  label: string;
  primaryKey?: boolean;
}

interface FormSchema {
  formId: string;
  schema: FormField[];
}

export default function FormsForUser({ params }) {
  const supabase = createClientComponentClient();

  const [formSchema, setFormSchema] = useState<Json>(null);
  const [formTitle, setFormTitle] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    const getFormSchema = async () => {
      const { data, error } = await supabase
        .from("formSchema")
        .select()
        .eq("formId", params.formId);

      if (!error && data[0]?.schema) {
        console.log("form Data for User Form --> ", data[0]?.schema);
        const newData = JSON.parse(data[0]?.schema);
        const title = data[0]?.formTitle;
        setFormSchema(newData);
        setFormTitle(title);
      } else {
        setErr(true);
        console.log(error);
        return toast({
          title: "Something went wrong.",
          description: "This form does not Exits",
          variant: "destructive",
        });
      }
    };

    getFormSchema();
  }, []);

  return (
    <div className="w-full h-full px-2">
      {!err ? (
        <UserForm formId={params.formId} formTitle={formTitle} formSchema={formSchema} />
      ) : (
        <NotFound />
      )}
    </div>
  );
}
