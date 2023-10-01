"use client";

import { FormOperations } from "./form-operations";
import { Icons } from "./icons";
import { Button, buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "./ui/use-toast";

const FormItem = ({ formId, title, createdAt }: any) => {
  const supabase = createClientComponentClient();
  const router = useRouter()

  const handleDeleteFormItem = async () => {
    const { error } = await supabase
      .from("formSchema")
      .delete()
      .eq("formId", formId);

    if(error){
      console.log(error);
    }else{
       toast({
        title: "Form Deleted Successfully !!",
        variant: "destructive",
      });
      console.log("Form Deleted !!");

      router.refresh();
    }
  };
  return (
    <div className="flex items-center justify-between p-4 border-[1px] border-slate-700 rounded-md">
      <div className="grid gap-1">
        <Link
          href={`/forms/${formId}`}
          className="text-sm md:text-md font-semibold hover:underline"
        >
          {title}
        </Link>
        <div>
          <p className="text-xs md:text-sm text-muted-foreground">
            {formatDate(createdAt?.toDateString())}
          </p>
        </div>
      </div>
      {/* <div className='flex space-x-3'>

      </div> */}
      {/* <FormOperations post={{ id: id, title: title}} /> */}
      <div className="flex space-x-1">
        <Link
          href={`/forms/${formId}`}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
        >
          <Icons.externalLink className="h-4 w-4 md:h-5 md:w-5 text-primary " />
        </Link>
        <Button
          onClick={handleDeleteFormItem}
          variant="ghost"
          size="icon"
          className="group  hover:bg-primary"
        >
          <Icons.trash className="h-4 w-4 md:h-5 md:w-5 text-rose-600 group-hover:text-white  dark:group-hover:text-rose-600 " />
        </Button>
      </div>
    </div>
  );
};

export default FormItem;
