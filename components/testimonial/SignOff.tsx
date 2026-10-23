'use client'

// The light sign-off: the terms, the details, how to name them, names, email, one checkbox and
// the hidden trap field. No submit button: the guide places "Agree and send" in the step's foot.

import { useId } from 'react'
import { Check, WarningCircle } from '@phosphor-icons/react'
import { TESTIMONIAL, TESTIMONIAL_SIGN_OFF } from '@/content/site'
import type { Naming } from '@/lib/testimonial'
import { useFlow } from './flow'
import { FIELD_IDS } from './focus'

const FIELDS = TESTIMONIAL.signOff.fields

export function SignOffFields({ showErrors }: { showErrors: boolean }) {
  const { who, names, setNames, email, setEmail, naming, setNaming, agreed, setAgreed, website, setWebsite, signOffErrors } = useFlow()
  const errors = showErrors ? signOffErrors() : {}
  const radio = useId()
  const errId = (k: string) => `${FIELD_IDS.names}-${k}-err`

  return (
    <div className="tst-signoff">
      <ul className="tst-terms">
        {TESTIMONIAL_SIGN_OFF.terms[who].map((t) => (
          <li key={t}>
            <Check size={16} weight="bold" aria-hidden />
            <span>{t}</span>
          </li>
        ))}
      </ul>
      <details className="disc tst-details">
        <summary>
          <span className="disc__label">{TESTIMONIAL_SIGN_OFF.details.label}</span>
          <span className="tog" aria-hidden />
        </summary>
        <div className="disc__body">
          <ul className="tst-details__list">
            {TESTIMONIAL_SIGN_OFF.details.items.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <p className="tst-details__version">Version {TESTIMONIAL_SIGN_OFF.version}</p>
        </div>
      </details>

      <fieldset className="tst-naming">
        <legend>{TESTIMONIAL_SIGN_OFF.naming.question}</legend>
        <div className="tst-radios">
          {TESTIMONIAL_SIGN_OFF.naming.options.map((o) => (
            <label key={o.value} className={`tst-radio${naming === o.value ? ' is-on' : ''}`}>
              <input type="radio" name={radio} value={o.value} checked={naming === o.value} onChange={() => setNaming(o.value as Naming)} />
              <span className="tst-radio__dot" aria-hidden />
              <span className="tst-radio__text">
                <span className="tst-radio__label">{o.label}</span>
                <span className="tst-radio__ex">{o.example}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="tst-fields">
        <div className={`field tst-field${errors.names ? ' field--invalid' : ''}`}>
          <label htmlFor={FIELD_IDS.names}>{FIELDS.names[who]}</label>
          <input
            id={FIELD_IDS.names}
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            placeholder={FIELDS.names.placeholder[who]}
            value={names}
            onChange={(e) => setNames(e.target.value)}
            aria-invalid={errors.names ? true : undefined}
            aria-describedby={errors.names ? errId('names') : undefined}
          />
          {errors.names && (
            <p className="field__err" id={errId('names')}>
              <WarningCircle size={14} weight="fill" aria-hidden />
              {errors.names}
            </p>
          )}
        </div>
        <div className={`field tst-field${errors.email ? ' field--invalid' : ''}`}>
          <label htmlFor={FIELD_IDS.email}>{FIELDS.email.label}</label>
          <input
            id={FIELD_IDS.email}
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="off"
            spellCheck={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={`${errId('hint')}${errors.email ? ` ${errId('email')}` : ''}`}
          />
          <p className="tst-field__hint" id={errId('hint')}>
            {FIELDS.email.hint}
          </p>
          {errors.email && (
            <p className="field__err" id={errId('email')}>
              <WarningCircle size={14} weight="fill" aria-hidden />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className={`tst-agree${errors.agreed ? ' is-invalid' : ''}`}>
        <label className={`tst-check${agreed ? ' is-on' : ''}`}>
          <input
            id={FIELD_IDS.agreed}
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            aria-invalid={errors.agreed ? true : undefined}
            aria-describedby={errors.agreed ? errId('agreed') : undefined}
          />
          <span className="tst-check__box" aria-hidden>
            <Check size={16} weight="bold" />
          </span>
          <span className="tst-check__text">{TESTIMONIAL_SIGN_OFF.agree[who]}</span>
        </label>
        {errors.agreed && (
          <p className="field__err" id={errId('agreed')}>
            <WarningCircle size={14} weight="fill" aria-hidden />
            {errors.agreed}
          </p>
        )}
      </div>

      <div className="trap" aria-hidden="true">
        <label htmlFor="tst-website">{TESTIMONIAL.signOff.trap}</label>
        <input id="tst-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>
    </div>
  )
}
