import SignUpForm from "./SignUpForm";
import styles from "./signup.module.scss";
import { redirect } from "next/navigation";
import { GetUserInfo } from "@/app/_utils/GetUserInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignUp() {
  const user = await GetUserInfo();
  if (user) redirect("/");

  return (
    <div className="govuk-width-container">
      <div className="govuk-grid-row govuk-!-static-margin-0">
        <div
          className={`${styles.mainContainer} govuk-grid-column-two-thirds govuk-!-static-margin-top-8 govuk-!-static-padding-0`}
        >
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
