"use client";

import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

export const metadata = {
  title: "Settings",
};

const SettingsPage = () => {
  const [username, setUsername] = useState("user");
  const supabase = createClientComponentClient(); 
  

  useEffect(() => {
     const getSession = async () => {
       const {data: {session}} = await supabase.auth.getSession();
      
       if(session?.user?.user_metadata?.username){
        setUsername(session?.user?.user_metadata?.username)
       }
     }
     getSession()

  },[])

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
    
  }

  const handleUpdateUserName =() => {
    console.log("Username Changed !!" , username)
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="flex flex-col px-2">
        <Card className="w-[310px] sm:w-[450px] md:w-[550px] ">
          <CardHeader>
            <CardTitle>Your Username</CardTitle>
            <CardDescription>
              Please enter your full name or a display name you are comfortable
              with
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={username} onChange={handleChangeName} placeholder="your name" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handleUpdateUserName} variant="outline">Update</Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  );
};

export default SettingsPage;
