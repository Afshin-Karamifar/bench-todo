"use client";

import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import styles from "./signup.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { TUserSignUp, userSignUpDataSchema } from "@/app/_lib/zodSchema";
import { signUpAction } from "./signUpAction";
import { JWECompactEncrypt } from "@/app/_token";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();
  const getRandomPokemonNumber = () => Math.floor(Math.random() * 1010);
  const [pokemonNumber, setPokemonNumber] = useState(getRandomPokemonNumber());
  const [errorMessage, setErrorMessage] = useState<string[] | null>(null);
  const [successFullMessage, setSuccessFullMessage] = useState<string | null>(null);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUserSignUp>({
    resolver: zodResolver(userSignUpDataSchema),
  });

  const processForm: SubmitHandler<TUserSignUp> = async (data) => {
    delete data.confirmPassword;

    const encryptedData = await JWECompactEncrypt(JSON.stringify({ ...data, avatar: pokemonNumber }));

    const { error, message } = await signUpAction(encryptedData);

    if (error) {
      setErrorMessage(message as string[]);
      setSuccessFullMessage(null);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      setErrorMessage(null);
      setSuccessFullMessage(message as string);
      reset();
      setTimeout(() => {
        router.push("/signin");
      }, 5000);
    }
  };
  return (
    <form method="post" onSubmit={handleSubmit(processForm)} data-validation-enabled="true">
      {successFullMessage && (
        <div className="govuk-panel govuk-panel--confirmation">
          <h1 className="govuk-panel__title govuk-!-font-size-24">{successFullMessage}</h1>
        </div>
      )}
      {errors.userName || errors.password || errors.confirmPassword || errorMessage ? (
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
      <h1 className="govuk-heading-l">Create an account</h1>
      <h1 className="govuk-label-wrapper govuk-!-static-margin-bottom-2">
        <label className="govuk-label govuk-label--m" htmlFor="userName">
          Profile Avatar
        </label>
      </h1>
      <div className={`gutter-top gutter-bottom govuk-!-static-padding-0 govuk-!-static-margin-bottom-2`}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonNumber}.png`}
          className={`${styles.pokemon}`}
          width={150}
          height={150}
          alt="pokemon"
          placeholder="empty"
        />
        <br />
        <Image
          src="refresh.svg"
          className={styles.refresh}
          width={32}
          height={32}
          alt="Capgemini"
          priority={true}
          onClick={() => setPokemonNumber(getRandomPokemonNumber())}
        />
      </div>
      <p className="govuk-body govuk-!-static-padding-0 govuk-!-font-size-19">
        You ll need your username and password when you sign in online, so make them memorable.
      </p>
      <div
        className={`govuk-form-group govuk-grid-column-two-thirds ${
          errors.userName ? "govuk-form-group--error" : " govuk-!-static-padding-0"
        }`}
      >
        <h1 className="govuk-label-wrapper">
          <label className="govuk-label govuk-label--m" htmlFor="userName">
            Create username
          </label>
        </h1>
        <div id="userNameHint" className="govuk-hint govuk-!-font-size-16 govuk-!-static-padding-0">
          Must contain at least 6 characters and no more than 30. Letters and numbers only.
        </div>
        {errors.userName && (
          <p id="event-name-error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {errors.userName.message}
          </p>
        )}
        <input
          autoComplete="off"
          id="userName"
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
          <label className="govuk-label govuk-label--m" htmlFor="password">
            Create password
          </label>
        </h1>
        <div id="passwordHint" className="govuk-hint govuk-!-font-size-16 govuk-!-static-padding-0">
          Must contain at least 8 characters with at least 1 capital letter, 1 lower case letter and 1 number.
          <br />
          Do not use your username, a common word like 'password' or a sequence like '123'.
        </div>
        {errors.password && (
          <p id="event-name-error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {errors.password.message}
          </p>
        )}
        <input
          autoComplete="off"
          id="password"
          className={`govuk-input ${errors.password ? "govuk-input--error" : ""}`}
          type="text"
          aria-describedby="password"
          {...register("password")}
        />
      </div>
      <div
        className={`govuk-form-group govuk-grid-column-two-thirds ${
          errors.confirmPassword ? "govuk-form-group--error" : " govuk-!-static-padding-0"
        }`}
      >
        <h1 className="govuk-label-wrapper">
          <label className="govuk-label govuk-label--m" htmlFor="confirmPassword">
            Re-type your password
          </label>
        </h1>
        {errors.confirmPassword && (
          <p id="event-name-error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {errors.confirmPassword.message}
          </p>
        )}
        <input
          autoComplete="off"
          id="confirmPassword"
          className={`govuk-input ${errors.confirmPassword ? "govuk-input--error" : ""}`}
          type="text"
          aria-describedby="confirm password"
          {...register("confirmPassword")}
        />
      </div>
      <div className="gutter-top gutter-bottom govuk-grid-column-full govuk-!-static-padding-0">
        <button
          type="submit"
          disabled={successFullMessage ? true : false}
          className="govuk-button"
          data-module="govuk-button"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
