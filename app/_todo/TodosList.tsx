import { Types } from "mongoose";
import { getTodos } from "../_db/controller";
import TodoCheck from "./TodoCheck";
import styles from "./addToDo.module.scss";
import { v4 as uuidv4 } from "uuid";
import { GetUserInfo } from "../_utils/GetUserInfo";

export default async function TodosList() {
  const user = await GetUserInfo();
  const todos = await getTodos(user?._id as Types.ObjectId);

  return (
    <table className="govuk-table">
      <caption className="govuk-table__caption govuk-table__caption--m govuk-!-static-margin-left-2">
        Todos List
      </caption>
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          <th scope="col" className="govuk-table__header">
            <strong className="govuk-label govuk-!-font-weight-bold govuk-!-static-margin-left-2">Todo</strong>
          </th>
          <th scope="col" className="govuk-table__header">
            <strong className="govuk-label govuk-!-font-weight-bold govuk-!-static-margin-left-2">Status</strong>
          </th>
          <th scope="col" className="govuk-table__header">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {todos.map((todo) => (
          <tr className="govuk-table__row" key={uuidv4()}>
            <th scope="row" className="govuk-table__header">
              <strong className="govuk-label govuk-!-font-weight-bold govuk-!-static-margin-2">{todo.todo}</strong>
            </th>
            <td className="govuk-table__cell">
              <strong
                className={`govuk-tag ${todo.done ? "govuk-tag--green" : "govuk-tag--blue"}  govuk-!-static-margin-2`}
              >
                {todo.done ? "Completed" : "in Progress"}
              </strong>
            </td>
            <td className="govuk-table__cell">
              <TodoCheck todo={JSON.stringify({ id: todo._id as Types.ObjectId, done: todo.done as boolean })} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
