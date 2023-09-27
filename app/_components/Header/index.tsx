/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import styles from "./header.module.scss";
import Link from "next/link";
import ManuItem from "./MenuItem/ManuItem";
import { IUser } from "@/app/_db/models/User";
import Profile from "./Profile/Profile";
import { GetUserInfo } from "@/app/_utils/GetUserInfo";

export const Header = async () => {
  const userInfo: IUser | null = await GetUserInfo();

  return (
    <header className={`govuk-header`} role="banner" data-module="govuk-header">
      <div
        className={`govuk-header__container govuk-grid-row govuk-width-container ${styles.headerContainer} govuk-!-static-padding-top-0`}
      >
        <div
          className={`govuk-grid-column-one-third ${styles.titleContainer} govuk-!-static-padding-top-0 govuk-!-static-padding-bottom-0`}
        >
          <Image src="logo.svg" width={50} height={50} alt="Capgemini" priority={true} />
          <Link href="/" className="govuk-heading-m govuk-!-margin-0 govuk-header__link">
            Bench Team
          </Link>
        </div>
        <h2 className="govuk-header__service-name govuk-grid-column-one-third govuk-!-text-align-centre govuk-!-static-margin-bottom-0">
          Todo App
        </h2>
        {!userInfo ? (
          <ul className={`govuk-grid-column-one-third ${styles.menuItemContainer}`}>
            <ManuItem href={"/signin"} text={"Sign In"} />
            <ManuItem href={"/signup"} text={"Sign Up"} />
          </ul>
        ) : (
          <Profile userInfo={userInfo} />
        )}
      </div>
    </header>
  );
};
