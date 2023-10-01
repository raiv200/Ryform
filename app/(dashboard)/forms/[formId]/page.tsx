"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Icons } from "@/components/icons";
import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function FormPage({ params }: { params: { formId: string } }) {
  const [userFormSubmissionData, setUserFormSubmissionData] = useState<
    any[] | null
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const supabase = createClientComponentClient();
  const formId = params.formId.toLowerCase();

  useEffect(() => {
    setIsLoading(true);
    const fetchFromData = async () => {
      const { data: formData } = await supabase
        .from(`form_table_${formId}`)
        .select();
      // console.log(formData);
      setUserFormSubmissionData(formData);
      setIsLoading(false);
    };

    fetchFromData();
  }, []);
  console.log(userFormSubmissionData);

  const fieldNames =
    userFormSubmissionData && userFormSubmissionData.length > 0
      ? Object.keys(userFormSubmissionData[0]).filter(
          (fieldName) => fieldName !== "id"
        )
      : [];
  return (
    <>
    
    
    <div className="flex px-1 w-full flex-1 flex-col ">
    {isLoading && (
        <div className="flex items-center justify-center border-2  h-[490px]">
          {" "}
          <LoadingSpinner />
        </div>
      )}
      
      {userFormSubmissionData &&
        !isLoading &&
        userFormSubmissionData?.length > 0 && (
          <ScrollArea className="h-[490px] w-full ">
            <div className=" flex flex-col w-full space-y-6 mx-auto py-2 pb-6 pr-6">
              {fieldNames.map((fieldName) => (
                <div
                  key={fieldName}
                  className="flex flex-col p-2 space-y-2 rounded-md"
                >
                  <div className="flex flex-col">
                    <h3 className="font-bold text-xl capitalize">
                      {fieldName.replace(/_/g, " ")}
                    </h3>
                    <p className="text-muted-foreground">
                      {`${
                        userFormSubmissionData?.filter(
                          (item) => item[fieldName]
                        ).length
                      } response${
                        userFormSubmissionData?.filter(
                          (item) => item[fieldName]
                        ).length !== 1
                          ? "s"
                          : ""
                      }`}
                    </p>
                  </div>
                  {/* <Separator className="my-4" /> */}
                  {userFormSubmissionData?.map((item, index) => (
                    <div key={index} className="flex flex-col space-y-0">
                      {item[fieldName] && (
                        <div className="flex items-center justify-between text-muted-foreground py-1">
                          <p className="font-normal text-md">
                            {item[fieldName]}
                          </p>
                          <span className="text-sm">
                            {formatDate(
                              new Date(item.created_at).toDateString()
                            )}
                          </span>
                        </div>
                      )}
                      <Separator className="my-4" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      {userFormSubmissionData?.length === 0 ||
        userFormSubmissionData?.length === null ||
        (userFormSubmissionData?.length === undefined && !isLoading && (
          <div className="flex flex-col space-y-4 h-[250px] items-center justify-center">
            <Icons.form
              strokeWidth={2}
              className=" h-10 w-10 md:h-16 md:w-16"
            />
            <p className="text-md text-center font-bold md:text-lg">
              {" "}
              No Form Data Exist, Share you form to Collect User Data
            </p>
          </div>
        ))}
    </div>
    </>
  );
}
