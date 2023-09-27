import React from 'react'
import Image from 'next/image';
import styles from './footer.module.scss'

export const Footer = () => {
  return (
    <footer className={`govuk-footer govuk-!-static-padding-top-0 govuk-!-static-padding-bottom-0 ${styles.mainContainer}`} role="contentinfo">
      <div className="govuk-width-container ">
        <div className="govuk-footer__meta">
          <div className="govuk-footer__meta-item govuk-footer__meta-item--grow">
            <span className="govuk-footer__licence-description">
              All content is available under the Bench Team License 
            </span>
          </div>
          <div className={`govuk-footer__meta-item ${styles.capgeminiLogoContainer}`}>
            <Image
              src="logo_geray.svg"
              className="govuk-footer__licence-logo"
              width={60}
              height={80}
              alt="Capgemini"
              priority={true}
            />
            <p>Bench Team Copyright</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
