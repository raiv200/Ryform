"use client";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// import { supabase } from "@/supabase/supabase-client"

type RegisterFormPorps = {
  className?: any;
  props?: any;
};

const RegisterForm = ({ className, props }: RegisterFormPorps) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      // If the sign-in fails, it means the user doesn't exist, so proceed with sign-up
      await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      // Sign-up successful, you can do any necessary post-signup actions here
      toast({
        variant:"success",
        title: "Sign Up Successful",
        description: "Check your email.We sent you a login link",
      });
      router.push("/login");
    } else {
      // User already exists, handle this case (e.g., show an error message)
      console.error("User already exists.");
      toast({
        variant: "destructive",
        title: "Oops! Sign Up Error",
        description: "Sign-up failed. User already Exist!!.",
      });
    }
  };

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);

  async function handleOnSubmit(e: any) {
    e.preventDefault();

    setIsLoading(true);

    console.log(email, password);
    handleSignUp();

    setIsLoading(false);

    // if (error) {
    //   return toast({
    //     title: "Something went wrong.",
    //     description: "Your sign in request failed. Please try again.",
    //     variant: "destructive",
    //   })
    // }

    // return toast({
    //   title: "Check your email",
    //   description: "We sent you a login link. Be sure to check your spam too.",
    // });

    setEmail("");
    setPassword("");
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={(event) => handleOnSubmit(event)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
            />
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Passowrd
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              autoCorrect="off"
              disabled={isLoading || isGitHubLoading}
            />
          </div>

          <button className={cn(buttonVariants())} disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up with Email
            <Icons.mail strokeWidth={2} className="ml-2 w-[15px] h-[15px]" />
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        disabled={isLoading || isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </button>
    </div>
  );
};

export default RegisterForm;
