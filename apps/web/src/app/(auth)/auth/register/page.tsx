import { NextPage } from "next";
import RegisterForm from "@/components/authForms/RegisterForm";
import FormTitle from "@/components/authForms/common/FormTitle";

interface RegisterPageProps {}

const RegisterPage: NextPage<RegisterPageProps> = () => {
  return (
    <>
      <FormTitle title="Create an account" />
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
