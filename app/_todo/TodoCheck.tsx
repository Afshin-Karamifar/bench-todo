"use client";
import { Types } from "mongoose";
import { useRef } from "react";
import { updateTodoAction } from "./todoAction";
export default function TodoCheck({ todo }: { todo: string }) {
  const todoObj = JSON.parse(todo);
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = async () => {
    await updateTodoAction({ id: todoObj.id, done: ref.current?.checked as boolean });
  };

  return (
    <div className="govuk-checkboxes__item">
      <input
        className="govuk-checkboxes__input"
        id={todoObj.id.toString()}
        name="organisation"
        type="checkbox"
        value="employment-tribunal"
        ref={ref}
        onChange={handleClick}
        checked={todoObj.done}
      ></input>
      <label className="govuk-label govuk-checkboxes__label" htmlFor={todoObj.id.toString()}>
        {" "}
      </label>
    </div>
  );
}
