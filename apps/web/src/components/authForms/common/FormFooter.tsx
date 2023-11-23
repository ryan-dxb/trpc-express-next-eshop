import { NextPage } from "next";
import Link from "next/link";

interface FormfooterProps {
  footerText: string;
  footerLink: string;
  footerLinkText?: string;
}

const Formfooter: NextPage<FormfooterProps> = ({
  footerText,
  footerLink,
  footerLinkText,
}) => {
  return (
    <div className="flex justify-center gap-2 px-2 mt-6 text-sm text-muted-foreground">
      <p>{footerText}</p>
      <Link
        href={footerLink}
        className="underline transition-colors duration-200 cursor-pointer hover:text-muted-foreground/80 underline-offset-2"
      >
        {footerLinkText}
      </Link>
    </div>
  );
};

export default Formfooter;
