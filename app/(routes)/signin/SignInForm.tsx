"use client";

/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SIGN_IN_API } from "@/app/_constants";
import { JWECompactEncrypt } from "@/app/_token";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { TUserSignIn, userSignInDataSchema } from "@/app/_lib/zodSchema";

export default function SignInForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string[] | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserSignIn>({
    resolver: zodResolver(userSignInDataSchema),
  });

  const processForm: SubmitHandler<TUserSignIn> = async (data) => {
    const encryptedData = await JWECompactEncrypt(JSON.stringify(data));

    const res = await fetch(SIGN_IN_API, {
      method: "POST",
      body: JSON.stringify({ encryptedData }),
    });

    if (res.status === 200) {
      router.refresh();
    }

    const { error, message } = await res.json();

    if (error) {
      setErrorMessage(message as string[]);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  return (
    <form method="post" autoComplete="off" onSubmit={handleSubmit(processForm)} data-validation-enabled="true">
      {errors.userName || errors.password || errorMessage ? (
        <div className="govuk-error-summary" data-module="govuk-error-summary">
          <div role="alert">
            <h2 className="govuk-error-summary__title">{errorMessage ? "Server Error:" : "Fix the following:"}</h2>
            <div className="govuk-error-summary__body">
              <ul className="govuk-list govuk-error-summary__list">
                {Object.keys(errors).map((error) => (
                  <li key={uuidv4()}>
                    <a href={`#${error}`}>{errors[error as keyof typeof errors]?.message}</a>
                  </li>
                ))}
                {errorMessage?.map((message) => (
                  <li key={uuidv4()}>
                    <a href={"#"}>{message}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className="govuk-notification-banner"
        role="region"
        aria-labelledby="govuk-notification-banner-title"
        data-module="govuk-notification-banner"
      >
        <div className="govuk-notification-banner__header">
          <h2 className="govuk-notification-banner__title" id="govuk-notification-banner-title">
            Keeping your information secure
          </h2>
        </div>
        <div className="govuk-notification-banner__content">
          <p className="govuk-!-font-size-19">Do not share your Todo Username and password with anyone else.</p>
        </div>
      </div>
      <h1 className="govuk-heading-l">Sign in to your Todo account</h1>
      <div
        className={`govuk-form-group govuk-grid-column-two-thirds ${
          errors.userName ? "govuk-form-group--error" : " govuk-!-static-padding-0"
        }`}
      >
        <h1 className="govuk-label-wrapper">
          <label className="govuk-label govuk-!-font-size-19" htmlFor="userName">
            Username
          </label>
        </h1>
        {errors.userName && (
          <p id="event-name-error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {errors.userName.message}
          </p>
        )}
        <input
          id="userName"
          autoComplete="off"
          className={`govuk-input ${errors.userName ? "govuk-input--error" : ""}`}
          type="text"
          aria-describedby="userName"
          {...register("userName")}
        />
      </div>
      <div
        className={`govuk-form-group govuk-grid-column-two-thirds ${
          errors.password ? "govuk-form-group--error" : " govuk-!-static-padding-0"
        }`}
      >
        <h1 className="govuk-label-wrapper">
          <label className="govuk-label govuk-!-font-size-19" htmlFor="password">
            Password
          </label>
        </h1>
        {errors.password && (
          <p id="event-name-error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {errors.password.message}
          </p>
        )}
        <input
          id="password"
          autoComplete="off"
          type="password"
          className={`govuk-input ${errors.password ? "govuk-input--error" : ""}`}
          aria-describedby="password"
          {...register("password")}
        />
      </div>
      <div className="gutter-top gutter-bottom govuk-grid-column-full govuk-!-static-padding-0">
        <button type="submit" className="govuk-button" data-module="govuk-button">
          Sign in
        </button>
      </div>
      <div className="gutter-top gutter-bottom govuk-grid-column-full govuk-!-static-padding-0 govuk-!-static-margin-top-5">
        <h2 className="govuk-heading-s">Don't have an account?</h2>
        <Link href="/signup" className="govuk-!-font-size-16 govuk-link">
          Sign Up
        </Link>
      </div>
    </form>
  );
}
