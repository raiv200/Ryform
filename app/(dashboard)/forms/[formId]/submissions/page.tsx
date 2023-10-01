"use client";

import LoadingSpinner from "@/components/loading-spinner";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

export default function FormSubmissionPage({
  params,
}: {
  params: { formId: string };
}) {
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

  const tableHeaders =
    userFormSubmissionData && userFormSubmissionData.length > 0
      ? Object.keys(userFormSubmissionData[0]).filter(
          (fieldName) => fieldName !== "id"
        )
      : [];

  return (
    <div className="flex px-1 w-full flex-1 flex-col ">
      {isLoading && (
        <div className="flex h-[490px] items-center justify-center ">
          {" "}
          <LoadingSpinner />
        </div>
      )}

      {userFormSubmissionData &&
        !isLoading &&
        userFormSubmissionData?.length > 0 ? (
          <ScrollArea className="w-full h-[490px] max-w-6xl pb-6 ">
            <ScrollBar orientation="horizontal" />
            <Table className="">
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader>
                <TableRow>
                  <TableHead className="">S.No</TableHead>
                  {tableHeaders.map((header) => (
                    <TableHead key={header} className="">
                      {header.replace(/_/g, " ")}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {userFormSubmissionData?.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="">{index + 1}</TableCell>
                    {tableHeaders.map((header) => (
                      <TableCell key={header} className="">
                        {item[header]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        ): !isLoading && userFormSubmissionData?.length === undefined && <div className="flex items-center justify-center  h-[490px]">
        No Form Data Exist
   </div>}
    </div>
  );
}
