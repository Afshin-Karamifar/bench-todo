'use client'
import React from 'react'
import { AcceptCookieAction, HiddenCookieAction } from './cookie'

export default function ActionCookieBtn({ actionType, value }: { actionType: string, value: boolean }) {
  return (
    <button onClick={() => actionType === 'Hide cookie message' ? HiddenCookieAction(value) : AcceptCookieAction(value)} type="button" name="cookies" className="govuk-button" data-module="govuk-button">
      {actionType}
    </button>
  )
}
