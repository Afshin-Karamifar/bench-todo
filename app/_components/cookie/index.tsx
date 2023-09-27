import React from 'react'
import { cookies } from 'next/headers'
import ActionCookieBtn from './ActionCookieBtn';

export default function Cookie() {
  const accepted = cookies().get('accepted');
  const hidden = cookies().get('hidden');

  const AcceptCookieBanner = () => <div className="govuk-cookie-banner " data-nosnippet role="region" aria-label="Cookies on [name of service]">
    <div className="govuk-cookie-banner__message govuk-width-container">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h2 className="govuk-cookie-banner__heading govuk-heading-m">Cookies on Capgemini Todo App</h2>
          <div className="govuk-cookie-banner__content">
            <p className="govuk-body">We use some essential cookies to make this service work.</p>
          </div>
        </div>
      </div>
      <div className="govuk-button-group">
        <ActionCookieBtn actionType='Accept cookies' value={true} />
        <ActionCookieBtn actionType='Reject cookies' value={false} />
      </div>
    </div>
  </div>

  const HiddenCookieBanner = () => <div className="govuk-cookie-banner " data-nosnippet role="region" aria-label="Cookies on [name of service]">
    <div className="govuk-cookie-banner__message govuk-width-container">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <div className="govuk-cookie-banner__content">
            <p className="govuk-body">You’ve accepted cookies. You can change your cookie settings at any time.</p>
          </div>
        </div>
      </div>
      <div className="govuk-button-group">
        <ActionCookieBtn actionType='Hide cookie message' value={true} />
      </div>
    </div>
  </div>

  return accepted?.value !== "true" ? <AcceptCookieBanner /> : hidden?.value !== 'true' ? <HiddenCookieBanner /> : null
}
