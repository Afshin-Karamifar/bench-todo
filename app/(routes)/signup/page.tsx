import SignUpForm from "./SignUpForm";
import styles from "./signup.module.scss";
import { redirect } from "next/navigation";
import { GetUserInfo } from "@/app/_utils/GetUserInfo";

export default async function SignUp() {
  if (await GetUserInfo()) redirect("/");

  return (
    <>
      <title>Sign Up</title>
      <div className="govuk-width-container">
        <div className="govuk-grid-row govuk-!-static-margin-0">
          <div
            className={`${styles.mainContainer} govuk-grid-column-two-thirds govuk-!-static-margin-top-8 govuk-!-static-padding-0`}
          >
            <SignUpForm />
          </div>
        </div>
      </div>
    </>
  );
}
