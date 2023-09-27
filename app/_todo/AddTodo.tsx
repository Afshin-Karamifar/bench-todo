"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createTodoAction } from "./todoAction";
import styles from "./addToDo.module.scss";
import { JWECompactEncrypt } from "../_token";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { TTodo, todoDataSchema } from "../_lib/zodSchema";
import { Types } from "mongoose";

export default function AddTodo({ userId }: { userId: Types.ObjectId }) {
  const [errorMessage, setErrorMessage] = useState<string[] | null>(null);
  const [successFullMessage, setSuccessFullMessage] = useState<string | null>(null);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TTodo>({
    resolver: zodResolver(todoDataSchema),
  });

  const processForm: SubmitHandler<TTodo> = async (data) => {
    const encryptedData = await JWECompactEncrypt(JSON.stringify({...data, userId}));

    const { error, message } = await createTodoAction(encryptedData);

    if (error) {
      setErrorMessage(message as string[]);
      setSuccessFullMessage(null);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

    reset();
  };
  return (
    <>
      <div className={`govuk-form-group govuk-grid-column-full govuk-!-static-margin-top-5 ${styles.container}`}>
        {errorMessage && (
          <div className="govuk-error-summary govuk-grid-column-one-half" data-module="govuk-error-summary">
            <div role="alert">
              <h2 className="govuk-error-summary__title">Server Error:</h2>
              <div className="govuk-error-summary__body">
                <ul className="govuk-list govuk-error-summary__list">
                  {errorMessage?.map((message) => (
                    <li key={uuidv4()}>
                      <a href={"#"}>{message}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <form
        method="post"
        className={`govuk-form-group govuk-grid-column-full ${styles.container}`}
        onSubmit={handleSubmit(processForm)}
      >
        <div
          className={`govuk-form-group govuk-grid-column-one-half govuk-!-static-margin-0 govuk-!-static-padding-0 ${styles.container}`}
        >
          <input
            className={`govuk-input govuk-!-static-margin-0 govuk-!-static-padding-0 ${styles.addInput}  ${
              errors.todo ? "govuk-input--error" : ""
            }`}
            id="newTodo"
            type="text"
            maxLength={25}
            placeholder="Add Your New Todo"
            {...register("todo")}
          />
          <button type="submit" className={`govuk-button ${styles.addBtn}`} data-module="govuk-button">
            Add
          </button>
        </div>
      </form>
    </>
  );
}
