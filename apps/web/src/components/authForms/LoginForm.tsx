"use client";
import { NextPage } from "next";
import FormLayout from "./common/FormLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "ui";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import FormInputField from "./common/FormInputField";
import Formfooter from "./common/FormFooter";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "ui";
import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { trpc } from "@/trpc";

interface LoginFormProps {}

const LoginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const LoginForm: NextPage<LoginFormProps> = () => {
  const router = useRouter();
  const redirectUrl = useSearchParams();

  const { toast } = useToast();

  const { mutate } = trpc.auth.loginUser.useMutation({
    onError: (error) => {
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
        duration: 2000,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Logged in successfully",
        className: "bg-green-500",
        duration: 2000,
      });

      //   router.push(redirectUrl?.redirectUrl || "/");
    },
  });

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "test@test.com",
      password: "123456",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    const { email, password } = values;

    try {
      await mutate({ email, password });
    } catch (error: any) {
      console.log("error", error);

      form.setError("root", {
        type: "manual",
        message: error?.message,
      });

      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    }
  }

  return (
    <FormLayout social>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormInputField
              control={form.control}
              name="email"
              placeholder="Email"
            />
            <FormInputField
              control={form.control}
              name="password"
              placeholder="Password"
            />

            <div className="flex items-center justify-between mb-6 text-sm">
              <div className="flex items-center">
                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  className="border-muted-foreground"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 text-muted-foreground"
                >
                  Remember me
                </label>
              </div>

              <Link
                href="/auth/forgot-password"
                className="text-sm transition-all duration-200 text-muted-foreground hover:text-blue-500"
              >
                Forgot Password?
              </Link>
            </div>

            {/*  */}

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
      </Form>

      <Formfooter
        footerText="Don't have an account?"
        footerLinkText="Register"
        footerLink="/auth/register"
      />
    </FormLayout>
  );
};

export default LoginForm;
