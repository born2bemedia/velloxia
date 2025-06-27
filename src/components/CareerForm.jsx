'use client'
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import PhoneInput from 'react-phone-input-2'
import useCountryCode from '@/utils/useCountryCode'
import 'react-phone-input-2/lib/style.css'
import Link from 'next/link'
import { excludedCountries } from '@/utils/countries'
import { useTranslations } from 'next-intl'

const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

function CareerForm() {
  const [fileSelected, setFileSelected] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFormVisible, setIsFormVisible] = useState(true)

  const t = useTranslations('career.apply.form')
  const countryCode = useCountryCode()

  const validationSchema = Yup.object({
    yourName: Yup.string().required(t('errors.yourName')),
    email: Yup.string().email(t('errors.email')).required(t('errors.phone')),
    phone: Yup.string().required(t('errors.phone')),
    file: Yup.mixed(),
    explanation: Yup.string(),
    link1: Yup.string().url(t('errors.link1')),
    link2: Yup.string().url(t('errors.link2')),
    agreeToPolicy: Yup.bool().oneOf([true], t('errors.agreeToPolicy')),
  })

  const initialValues = {
    yourName: '',
    email: '',
    phone: '',
    file: null,
    explanation: '',
    link1: '',
    link2: '',
    agreeToPolicy: false,
  }

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      console.log('Submitting values:', values)

      const fileBase64 = values.file ? await readFileAsBase64(values.file) : null

      const payload = {
        ...values,
        attachFiles: fileBase64 ? [fileBase64] : [],
      }

      console.log('Payload:', payload)

      const response = await fetch('/api/emails/career', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        resetForm()
        setStatus({ success: true })
        setIsSuccess(true)
        setIsFormVisible(false)
        document.querySelector('input[type="file"]').value = ''
        setFileSelected(false)
      } else {
        setStatus({ success: false })
        setIsSuccess(false)
        console.error('Failed to submit:', await response.text())
      }
    } catch (error) {
      console.error('Error:', error)
      setStatus({ success: false })
      setIsSuccess(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="request-form">
      {isFormVisible ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, status, errors, touched }) => (
            <div className="wrapper">
              <Form className="form__career">
                <h2 className="form__title">{t('title')}</h2>
                <div
                  className={`row _file ${fileSelected ? '_active' : ''} ${
                    touched.file && errors.file ? '_error' : ''
                  }`}
                >
                  <input
                    type="file"
                    name="file"
                    onChange={(event) => {
                      setFieldValue('file', event.currentTarget.files[0])
                      setFileSelected(true)
                    }}
                  />
                </div>

                {fileSelected && (
                  <div className="row _remove">
                    <button
                      type="button"
                      onClick={() => {
                        setFieldValue('file', null)
                        setFileSelected(false)
                      }}
                    >
                      {t('fields.removeFile')}
                    </button>
                  </div>
                )}

                <div className="row">
                  <Field name="yourName">
                    {({ field, form }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder={t('fields.yourName')}
                        className={form.touched.yourName && form.errors.yourName ? 'invalid' : ''}
                      />
                    )}
                  </Field>
                </div>
                <div className="row">
                  <Field name="email">
                    {({ field, form }) => (
                      <input
                        {...field}
                        type="email"
                        placeholder={t('fields.email')}
                        className={form.touched.email && form.errors.email ? 'invalid' : ''}
                      />
                    )}
                  </Field>
                </div>
                <div className="row">
                  <Field name="phone">
                    {({ field, form }) => (
                      <PhoneInput
                        country={countryCode}
                        value={field.value}
                        onChange={(value) => form.setFieldValue('phone', value)}
                        placeholder={t('fields.phone')}
                        excludeCountries={excludedCountries}
                        className={form.touched.phone && form.errors.phone ? 'invalid' : ''}
                      />
                    )}
                  </Field>
                </div>

                <div className="row">
                  <Field name="link1">
                    {({ field, form }) => (
                      <input
                        {...field}
                        type="url"
                        placeholder={t('fields.link1')}
                        className={form.touched.link1 && form.errors.link1 ? 'invalid' : ''}
                      />
                    )}
                  </Field>
                </div>
                <div className="row">
                  <Field name="link2">
                    {({ field, form }) => (
                      <input
                        {...field}
                        type="url"
                        placeholder={t('fields.link2')}
                        className={form.touched.link2 && form.errors.link2 ? 'invalid' : ''}
                      />
                    )}
                  </Field>
                </div>
                <div className="row _textarea">
                  <Field name="explanation">
                    {({ field, form }) => (
                      <textarea
                        {...field}
                        placeholder={t('fields.explanation')}
                        className={
                          form.touched.explanation && form.errors.explanation ? 'invalid' : ''
                        }
                      />
                    )}
                  </Field>
                </div>
                <div className="row _policy">
                  <Field name="agreeToPolicy">
                    {({ field, form }) => (
                      <label
                        className={`checkbox-label ${field.value ? '_active' : ''} ${
                          form.touched.agreeToPolicy && form.errors.agreeToPolicy ? 'invalid' : ''
                        }`}
                      >
                        <input
                          {...field}
                          type="checkbox"
                          checked={field.value}
                          className={
                            form.touched.agreeToPolicy && form.errors.agreeToPolicy ? 'invalid' : ''
                          }
                        />
                        <span>
                          {t('fields.agreeToPolicy.0')}{' '}
                          <Link href="/privacy-policy">{t('fields.agreeToPolicy.1')}</Link>{' '}
                          {t('fields.agreeToPolicy.2')}{' '}
                          <Link href="/terms-and-conditions">{t('fields.agreeToPolicy.3')}</Link>.
                        </span>
                      </label>
                    )}
                  </Field>
                </div>
                <button type="submit" className="request-button" disabled={isSubmitting}>
                  {t('submit')}
                </button>
                {Object.keys(errors).length > 0 && touched && (
                  <span className="general-error">{t('requiredField')}</span>
                )}
              </Form>
              {status && status.success && isSuccess && (
                <div className="success-message">
                  <span>{t('successMessage.0')}</span> {t('successMessage.1')}
                </div>
              )}
            </div>
          )}
        </Formik>
      ) : (
        <div className="success-message">
          <span>{t('successMessage.0')}</span> {t('successMessage.1')}
        </div>
      )}
    </div>
  )
}

export default CareerForm
