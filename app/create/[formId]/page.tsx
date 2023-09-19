import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import CreateDynamicForm from "./create-dynamic-form";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from 'next/headers'

export const metadata = {
  title: "Create - New Form",
};

// const FORM_SCHEMA = [
//   {
//     id: 1691149683600,
//     type: "uuid",
//     label: "id",
//     primaryKey: true,
//   },

//   {
//     id: 1694149683600,
//     type: "text",
//     label: "Fname",
//   },
//   {
//     id: 1694149691075,
//     type: "text",
//     label: "LNAme",
//   },
//   {
//     id: 1694149699304,
//     type: "email",
//     label: "Email",
//   },
//   {
//     id: 1694149705184,
//     type: "textarea",
//     label: "Yur Bio",
//   },
//   {
//     id: 1694149705190,
//     type: "date",
//     label: "Birth Date",
//   },
//   {
//     id: 1694149705141,
//     type: "number",
//     label: "You Age",
//   },
//   {
//     id: 1694149705344,
//     type: "tel",
//     label: "Yur Phone Number",
//   },
//   {
//     id: 1694149705111,
//     type: "url",
//     label: "Your website",
//   },
//   {
//     id: 1694149705112,
//     type: "time",
//     label: "Select Meeting Time",
//   },
// ];
// FORM_SCHEMA.shift();

// const NEW_FORM_SCHEMA = FORM_SCHEMA;

export default async function CreateNewForm({
  params,
}: {
  params: { formId: string };
}){
  // const [formSchema, setFormSchema] = useState(NEW_FORM_SCHEMA);
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  
  
  return (
    <>
        <CreateDynamicForm formId={params.formId} session={session} />
    </>
  );
};



{/* <div className="flex flex-col space-y-8 pt-6">

          <div className="flex  flex-col w-full max-w-sm  space-y-4">
            <Label className="" htmlFor={form.label.replace(/ /g, '').toLowerCase()}>
              {form.label}
            </Label>
            <Input type={form.type} name={form.label.replace(/ /g, '').toLowerCase()} placeholder={form.label}/>
          </div>
    

  <Button className="w-[120px]">
    Submit
    <Icons.arrowRight strokeWidth={3} className="w-4 h-4 ml-2" />
  </Button>
</div>; */}
