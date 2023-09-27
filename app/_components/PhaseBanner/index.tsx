import React from "react";
import Image from "next/image";
import styles from "./phaseBanner.module.scss";

export default function PhaseBanner() {
  return (
    <div className={`govuk-phase-banner govuk-width-container ${styles.phaseBanner}`}>
      <strong className="govuk-tag govuk-phase-banner__content__tag">Stable</strong>
      <span>This is a new app from Bench team&nbsp;</span>
      <Image src="face.svg" width={24} height={24} alt="Capgemini" priority={true} />
    </div>
  );
}
