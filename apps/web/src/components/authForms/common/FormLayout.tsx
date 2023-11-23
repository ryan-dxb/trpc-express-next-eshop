import { NextPage } from "next";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

interface FormLayoutProps {
  children: React.ReactNode;
  social?: boolean;
}

const FormLayout: NextPage<FormLayoutProps> = ({ children, social }) => {
  return (
    <div className="w-full px-4 sm:px-0 sm:mx-auto sm:max-w-md ">
      <div className="p-6 rounded-md bg-background">
        {social && (
          <>
            <div className="flex gap-3 mb-6">
              <AuthSocialButton
                icon={BsGithub}
                onClick={() => console.log("clicked")}
              />
              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => console.log("clicked")}
              />
            </div>
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted-foreground" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-muted-foreground bg-background ">
                  Or continue with
                </span>
              </div>
            </div>
          </>
        )}
        {children}
      </div>
    </div>
  );
};

export default FormLayout;
