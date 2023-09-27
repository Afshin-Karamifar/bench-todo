import { Metadata } from "next";
import styles from "./home.module.scss";
import { redirect } from "next/navigation";
import { GetUserInfo } from "./_utils/GetUserInfo";
import AddTodo from "./_todo/AddTodo";
import TodosList from "./_todo/TodosList";
import { Types } from "mongoose";

export const metadata: Metadata = {
  title: "Todo App",
};

export default async function Home() {
  const user = await GetUserInfo();
  if (!user) redirect("/signin");

  return (
    <div className="govuk-width-container">
      <div className="govuk-grid-row govuk-!-static-margin-0">
        <AddTodo userId={user._id as Types.ObjectId}/>
        <TodosList />
      </div>
    </div>
  );
}
