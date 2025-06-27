'use client'
import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useTranslations } from 'next-intl'

const ChangePasswordReset = ({ token }) => {
  const t = useTranslations('account.changePasswordReset')

  const [changePasswordError, setChangePasswordError] = useState('')
  const [passwordChanged, setPasswordChanged] = useState(false)
  const router = useRouter()
  const [userToken, setUserToken] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserToken(token)
    }
  }, [token])

  const initialValues = {
    newPassword: '',
    confirmPassword: '',
  }

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string().required(t('errors.newPassRequired')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], t('errors.newPassMatch'))
      .required(t('errors.confirmPassRequired')),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!userToken) {
      setChangePasswordError('Invalid or expired token.')
      setSubmitting(false)
      return
    }

    const { newPassword, confirmPassword } = values

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REST_API_URL}auth/reset-password`,
        {
          code: userToken, // token received in the reset link
          password: newPassword,
          passwordConfirmation: confirmPassword,
        },
      )

      if (response.status === 200) {
        setPasswordChanged(true)
        setChangePasswordError('')
        setTimeout(() => {
          setPasswordChanged(false)
          router.push('/log-in')
        }, 3000)
      } else {
        setChangePasswordError('Failed to change password.')
      }
    } catch (error) {
      console.error('Failed to change password', error)
      setChangePasswordError(
        error.response?.data?.message || 'An error occurred. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="change-password log-in">
      <div className="_container">
        <h1>{t('title')}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <div>
                <label>
                  <Field
                    placeholder={t('fields.newPassword')}
                    type="password"
                    name="newPassword"
                    className={touched.newPassword && errors.newPassword ? 'invalid' : ''}
                  />
                </label>
                <ErrorMessage className="error" name="newPassword" component="div" />
              </div>
              <div>
                <label>
                  <Field
                    placeholder={t('fields.confirmPassword')}
                    type="password"
                    name="confirmPassword"
                    className={touched.confirmPassword && errors.confirmPassword ? 'invalid' : ''}
                  />
                </label>
                <ErrorMessage className="error" name="confirmPassword" component="div" />
              </div>
              <button type="submit" className="main-button" disabled={isSubmitting}>
                <span>{t('submit')}</span>
              </button>
              {passwordChanged && <div className="success">{t('successMsg')}</div>}
              {changePasswordError && <div className="error">{changePasswordError}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </section>
  )
}

export default ChangePasswordReset
