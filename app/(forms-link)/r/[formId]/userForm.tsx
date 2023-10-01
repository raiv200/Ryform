"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function UserForm({ formId, formTitle, formSchema }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [userFormData, setUserFormData] = useState({});

  const handleChange = (event, fieldId) => {
    setUserFormData({
      ...userFormData,
      [fieldId]: event.target.value,
    });
  };

  function convertLabelsToUnderscore(obj) {
    const newObj = {};
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const newKey = key.replace(/ /g, "_");
        newObj[newKey] = obj[key];
      }
    }
    return newObj;
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const convertedUserFormData = convertLabelsToUnderscore(userFormData);

    const { data, error } = await supabase
      .from(`form_table_${formId.toLowerCase()}`)
      .upsert({
        id:uuidv4(),
         ...convertedUserFormData
      });

    if (!error) {
      console.log(
        "Data after post form userForm  ---> ",
        convertedUserFormData
      );
      console.log("Form Submitted !!!");
      setUserFormData({});
      event.target.reset();
    }

    toast({
      variant:"success",
      title: "Thank You!",
      description: "🥳 Your Form Details has been submited!!",
    });

     router.replace('/thank-you');

     console.log("Data form Supabase Await",data);
     
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="">
        <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight transition-colors first:mt-0 md:text-4xl ">
          {formTitle}
        </h2>

        {formSchema && (
          <div className="pt-10 flex flex-col space-y-6">
            {formSchema?.map((el) => (
              <div
                key={el.id}
                className="w-[290px] sm:w-[400px] md:w-[450px] flex flex-col space-y-3  justify-center"
              >
                <Label className="text-md capitalize placeholder:capitalize">
                  {el.label}
                </Label>
                {el.type === "textarea" ? (
                  <Textarea
                    placeholder={el.label}
                    name={el.label}
                    onChange={(event) => handleChange(event, el.label)}
                    className="placeholder:capitalize"
                  />
                ) : (
                  <Input
                    type={el.type}
                    placeholder={el.label}
                    name={el.label}
                    onChange={(event) => handleChange(event, el.label)}
                    className="placeholder:capitalize"
                  />
                )}
              </div>
            ))}
            <Button
              type="submit"
              //   onClick={() => console.log("form submitted")}
              className="group  hover:bg-primary w-[120px] "
            >
              Submit
              <Icons.arrowRight strokeWidth={3} className=" ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* {formSchema.map((element) => (
          <div className="pt-10 flex flex-col space-y-6">
            {element.type === "text" && (
              <div className="w-[290px] md:w-[400px] flex flex-col space-y-3  justify-center">
                <Label className="text-md">{element.label}</Label>

                <Input type={element.type} placeholder={element.label} />
              </div>
            )}

            {element.type === "email" && (
              <div className="w-[290px] md:w-[400px] flex flex-col space-y-3  justify-center">
                <Label className="text-md">{element.label}</Label>

                <Input type={element.type} placeholder={element.label} />
              </div>
            )}
            {element.type === "textarea" && (
              <div className="w-[290px] md:w-[600px] flex flex-col space-y-3  justify-center">
                <Label className="text-md">{element.label}</Label>
                <Textarea placeholder={element.label} />
              </div>
            )}
            {element.type === "date" && (
              <div className="w-[290px] md:w-[400px] flex flex-col space-y-3  justify-center">
                <Label className="text-md">{element.label}</Label>

                <Input type={element.type} placeholder={element.label} />
              </div>
            )}
            {element.type === "time" && (
              <div className="w-[290px] md:w-[400px] flex flex-col space-y-3  justify-center">
                <Label className="text-md">{element.label}</Label>

                <Input type={element.type} placeholder={element.label} />
              </div>
            )}
            {element.type === "number" && (
              <div className="w-[290px] md:w-[400px] flex flex-col space-y-3  justify-center">
                <Label className="text-md">{element.label}</Label>

                <Input type={element.type} placeholder={element.label} />
              </div>
            )}
            {element.type === "tel" && (
              <div className="w-[290px] md:w-[400px] flex flex-col space-y-3  justify-center">
                <Label className="text-md">{element.label}</Label>

                <Input type={element.type} placeholder={element.label} />
              </div>
            )}

            {element.type === "url" && (
              <div className="w-[290px] md:w-[400px] flex flex-col space-y-3  justify-center">
                <Label className="text-md">{element.label}</Label>

                <Input type={element.type} placeholder={element.label} />
              </div>
            )}

            <Button
              onClick={() => console.log("form submitted")}
              className="group  hover:bg-primary "
            >
              Submit
            </Button>
          </div>
        ))} */}
      </form>
    </>
  );
}

{
  /* <div className="w-[290px] md:w-[400px] flex flex-col space-y-3  justify-center">
<Label className="text-md">Name</Label>

<Input type="text" placeholder="Your Text" />
</div>
<div className="w-[290px] md:w-[400px] flex flex-col space-y-3  justify-center">
<Label className="text-md">Name</Label>

<Input type="text" placeholder="Your Text" />
</div>
<div className="w-[290px] md:w-[400px] flex flex-col space-y-3  justify-center">
<Label className="text-md">Name</Label>

<Input type="text" placeholder="Your Text" />
</div>
<div className="w-[290px] md:w-[600px] flex flex-col space-y-3  justify-center">
<Label className="text-md">Text Area</Label>

<Textarea placeholder="You TextArea" />
</div> */
}
