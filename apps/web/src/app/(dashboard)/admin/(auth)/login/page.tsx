import Logo from "@/components/common/Logo";
import { NextPage } from "next";
import { Button, Input, Label } from "ui";

interface AdminLoginProps {}

const AdminLogin: NextPage<AdminLoginProps> = () => {
  return (
    <>
      <Logo />
      <div className="p-4 mt-4 bg-background">
        <div className="flex flex-col max-w-md space-y-1 text-center">
          <h3 className="text-xl font-medium">Sign in to your account</h3>
          <p className="text-sm text-muted-foreground max-w-prose">
            Welcome back! Please login to your account to continue using our
            service.
          </p>
        </div>

        <div className="flex flex-col w-full max-w-md mt-4 gap-y-3">
          <div>
            <Label htmlFor="email" className="pb-2 ">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="focus-visible:ring-offset-0 "
            />
          </div>
          <div>
            <Label htmlFor="password" className="pb-2 ">
              Password
            </Label>

            <div className="flex w-full border">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="border-none outline-none"
              />

              <Button
                type="button"
                variant="ghost"
                className="text-xs text-indigo-500 uppercase hover:bg-transparent hover:text-indigo-500 focus-visible:ring-offset-0"
              >
                Show
              </Button>
            </div>

            <div className="flex justify-end w-full">
              <Button
                type="button"
                variant="link"
                className="text-sm text-right text-indigo-500"
              >
                Forgot password?
              </Button>
            </div>

            <Button type="button" variant="default" className="w-full mt-4">
              Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
