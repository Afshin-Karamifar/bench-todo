import { redirect } from "next/navigation";
import styles from "../signup/signup.module.scss";
import SignInForm from "./SignInForm";
import { GetUserInfo } from "@/app/_utils/GetUserInfo";

export default async function SignIn() {
  if (await GetUserInfo()) redirect("/");

  return (
    <>
      <title>Sign In</title>
      <div className="govuk-width-container">
        <div className="govuk-grid-row govuk-!-static-margin-0">
          <div
            className={`${styles.mainContainer} govuk-grid-column-two-thirds govuk-!-static-margin-top-8 govuk-!-static-padding-0`}
          >
            <SignInForm />
          </div>
        </div>
      </div>
    </>
  );
}
