'use client'
import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import useAuthStore from '@/stores/authStore' // Zustand store for auth
import axios from 'axios'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

const ChangePassword = () => {
  const t = useTranslations('account.changePassword')

  const { getToken } = useAuthStore() // Zustand function to get token
  const [changePasswordError, setChangePasswordError] = useState('')
  const [passwordChanged, setPasswordChanged] = useState(false)

  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required(t('errors.currentPassword')),
    newPassword: Yup.string().min(8, t('errors.newPassMin')).required(t('errors.newPassRequired')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], t('errors.newPassMatch'))
      .required(t('errors.confirmPassRequired')),
  })

  const handleSubmit = async (values, { setSubmitting }) => {
    const { currentPassword, newPassword, confirmPassword } = values

    try {
      const token = getToken() // Use Zustand to get JWT token

      // Sending the change password request using axios
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REST_API_URL}auth/change-password`,
        {
          currentPassword,
          password: newPassword,
          passwordConfirmation: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use the JWT token in the header
          },
        },
      )

      if (response.status === 200) {
        setPasswordChanged(true)
        setChangePasswordError('')
        setTimeout(() => {
          setPasswordChanged(false)
        }, 3000)
      } else {
        setChangePasswordError(t('failed'))
      }
    } catch (error) {
      console.error('Failed to change password', error)
      setChangePasswordError(
        error.response?.data?.message || 'An error occurred while changing the password.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="change-password">
      <div className="_container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <div className="billing-data">
                <div>
                  <label>
                    <Field
                      placeholder={t('fields.currentPassword')}
                      type="password"
                      name="currentPassword"
                      className={touched.currentPassword && errors.currentPassword ? 'invalid' : ''}
                    />
                  </label>
                  <ErrorMessage className="error" name="currentPassword" component="div" />
                </div>
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
              </div>
              <button type="submit" className="main-button" disabled={isSubmitting}>
                <span>{t('updateData')}</span>
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

export default ChangePassword
