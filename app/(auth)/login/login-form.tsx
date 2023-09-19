"use client";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { supabase } from "@/supabase/supabase-client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type RegisterFormPorps = {
  className?: any;
  props?: any;
};

const LoginForm = ({ className, props }: RegisterFormPorps) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      // Sign-in successful, you can proceed with post-login actions
      console.log("Login successful. User:", data);
      router.push("/dashboard");
      return toast({
        variant: "success",
        title: "Login Successful",
        description: "Successfully Logged In",
      });
    }
    // User does not exist or sign-in failed, handle this case (e.g., show an error message)

    return toast({
      title: "Something went wrong.",
      description: "Your sign in request failed. Please try again.",
      variant: "destructive",
    });
  };

  async function handleOnSubmit(e: any) {
    e.preventDefault();

    setIsLoading(true);

    handleSignIn();

    console.log("SignIn Success !!");

    setIsLoading(false);
  }

  async function handleSignInWithGithub() {
    setIsGitHubLoading(true)
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      // Sign-in successful, you can proceed with post-login actions
      
      return toast({
        title: "Something went wrong.",
        description: "Your sign in request failed. Please try again.",
        variant: "destructive",
      });
    }
    // User does not exist or sign-in failed, handle this case (e.g., show an error message)
    console.log("Login successful. User:", data);
    setIsGitHubLoading(false)
    toast({
      variant: "success",
      title: "Login Successful",
      description: "Successfully Logged In",
    });
    // router.push("/dashboard");
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
            Sign In with Email
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
      onClick={handleSignInWithGithub}
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

export default LoginForm;
