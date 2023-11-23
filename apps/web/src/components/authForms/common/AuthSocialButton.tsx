import { Button } from "ui";
import { NextPage } from "next";
import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
}

const AuthSocialButton: NextPage<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
}) => {
  return (
    <Button className="w-full" variant="outline" onClick={onClick}>
      <Icon />
    </Button>
  );
};

export default AuthSocialButton;
