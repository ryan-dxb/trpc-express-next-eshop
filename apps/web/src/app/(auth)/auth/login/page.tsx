import LoginForm from "@/components/authForms/LoginForm";
import FormTitle from "@/components/authForms/common/FormTitle";
import { NextPage } from "next";

interface LoginPageProps {}

const LoginPage: NextPage<LoginPageProps> = () => {
  return (
    <>
      <FormTitle title="Sign in to your account" />
      <LoginForm />
    </>
  );
};

export default LoginPage;
