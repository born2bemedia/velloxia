'use client'
import '@/styles/checkout.scss'
import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CheckboxIcon from '@/icons/CheckboxIcon'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import useCartStore from '@/stores/cartStore' // Zustand cart store
import useAuthStore from '@/stores/authStore' // Zustand auth store
import useOrderStore from '@/stores/orderStore'
import { excludedCountries } from '@/utils/countries'
import { useTranslations } from 'next-intl'

const getCountryOptionByCode = (code) => {
  const countries = countryList()
    .getData()
    .filter((country) => !excludedCountries.includes(country.value.toLowerCase()))
  return countries.find((country) => country.value === code)
}

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: '100%',
    color: '#333',
    height: '50px',
    borderRadius: '30px',
    background: '#fff',
    border: state.isFocused ? '1px solid #fff' : '1px solid #fff',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.2',
    textAlign: 'left',
    padding: '0 20px',
    boxShadow: 'unset',
    '&:hover': {
      borderColor: '#fff',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '50px',
    margin: '0',
    padding: '0',
    border: 'none',
  }),
  input: (provided) => ({
    ...provided,
    height: '50px',
    margin: '0',
    padding: '0',
    border: 'none',
    color: '#1E1E1E',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#1E1E1E',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    '> span': {
      display: 'none',
    },
  }),
  indicatorContainer: (provided) => ({
    ...provided,
    padding: '0',
  }),
  menu: (provided) => ({
    ...provided,
    background: '#ffffff0d',
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? '#F2F2F2' : '#F2F2F2',
    color: '#1E1E1E',
    '&:hover': {
      background: '#1FA169',
      color: '#ffffff',
    },
  }),
}

const CartPage = () => {
  const t = useTranslations('checkout')

  const { cart, clearCart, totalAmount } = useCartStore()
  const { currentUser, setCurrentUser, getToken, fetchCurrentUser, loading } = useAuthStore()
  const { createOrder } = useOrderStore()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchCurrentUser()
    setIsMounted(true)
  }, [])

  if (loading || !isMounted) {
    return (
      <div>
        <section className="checkout-wrap" style={{ minHeight: '100vh' }}>
          <div className="_container">
            <div></div>
          </div>
        </section>
      </div>
    )
  }

  const initialValues = {
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    addressLine1: currentUser?.addressLine1 || '',
    addressLine2: currentUser?.addressLine2 || '',
    city: currentUser?.city || '',
    zip: currentUser?.zip || '',
    country: getCountryOptionByCode(currentUser?.country) || null,
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    specialNotes: '',
    terms: false,
    refundPolicy: false,
  }

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(t('errors.requiredField')),
    lastName: Yup.string().required(t('errors.requiredField')),
    addressLine1: Yup.string().required(t('errors.requiredField')),
    city: Yup.string().required(t('errors.requiredField')),
    zip: Yup.string().required(t('errors.requiredField')),
    country: Yup.string().required(t('errors.requiredField')),
    email: Yup.string().email(t('errors.email')).required(t('errors.requiredField')),
    phone: Yup.string().required(t('errors.requiredField')),
    terms: Yup.bool().oneOf([true], t('errors.terms')),
    refundPolicy: Yup.bool().oneOf([true], t('errors.refundPolicy')),
  })

  const generateRandomPassword = (length = 12) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
    let password = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      password += characters[randomIndex]
    }
    return password
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true)
    try {
      let userId = currentUser?.id
      if (!userId) {
        const registerData = {
          email: values.email,
          password: generateRandomPassword(),
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.email,
          phone: values.phone,
        }

        const registerResponse = await fetch('/api/auth/sign-up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerData),
        })

        if (registerResponse.ok) {
          const registerResult = await registerResponse.json()
          userId = registerResult.user.id
          localStorage.setItem('jwt', registerResult.jwt)
          fetchCurrentUser()
          await fetch('/api/emails/sign-up', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
          })
        } else {
          throw new Error('User registration failed.')
        }
      } else {
        const updateData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2,
          city: values.city,
          zip: values.zip,
          country: values.country,
          userId,
        }

        const token = getToken()
        const updateResponse = await fetch('/api/auth/user-update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        })

        if (!updateResponse.ok) {
          throw new Error('Failed to update user data.')
        }

        const updatedUser = await updateResponse.json()
        setCurrentUser(updatedUser.user)
        localStorage.setItem('user', JSON.stringify(updatedUser.user))
      }

      const productIds = cart.map((product) => product.documentId)
      //const products = cart.map((product) => ({ id: product.id }));

      const orderData = {
        data: {
          email: values.email,
          users_permissions_user: userId,
          products: productIds,
          amount: totalAmount,
          order_status: 'completed',
        },
      }

      await createOrder(orderData)

      const emailOrderData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        city: values.city,
        zip: values.zip,
        country: values.country,
        cart, // Pass the cart items to the email endpoint
        totalAmount, // Include total amount in the email
      }

      await fetch('/api/emails/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailOrderData),
      })
      setIsLoading(false)
      router.push('/thankyou')
      clearCart()
    } catch (error) {
      console.error('Order creation failed:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {isMounted && (
        <>
          {cart.length > 0 ? (
            <div>
              <section className="checkout-wrap">
                <div className="_container">
                  <div>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ isSubmitting, setFieldValue, touched, errors, values, status }) => (
                        <Form>
                          <h3>{t('billingDetails')}</h3>
                          <div className="billing-data">
                            <div>
                              <label>
                                <Field
                                  placeholder={t('fields.firstName')}
                                  type="text"
                                  name="firstName"
                                  className={touched.firstName && errors.firstName ? 'invalid' : ''}
                                />
                              </label>
                              <ErrorMessage className="error" name="firstName" component="div" />
                            </div>
                            <div>
                              <label>
                                <Field
                                  placeholder={t('fields.lastName')}
                                  type="text"
                                  name="lastName"
                                  className={touched.lastName && errors.lastName ? 'invalid' : ''}
                                />
                              </label>
                              <ErrorMessage className="error" name="lastName" component="div" />
                            </div>
                            <div className="full">
                              <label>
                                <Field
                                  placeholder={t('fields.addressLine1')}
                                  type="text"
                                  name="addressLine1"
                                  className={
                                    touched.addressLine1 && errors.addressLine1 ? 'invalid' : ''
                                  }
                                />
                              </label>
                              <ErrorMessage className="error" name="addressLine1" component="div" />
                            </div>
                            <div className="full">
                              <label>
                                <Field
                                  placeholder={t('fields.addressLine2')}
                                  type="text"
                                  name="addressLine2"
                                />
                              </label>
                            </div>
                            <div>
                              <label>
                                <Field
                                  placeholder={t('fields.city')}
                                  type="text"
                                  name="city"
                                  className={touched.city && errors.city ? 'invalid' : ''}
                                />
                              </label>
                              <ErrorMessage className="error" name="city" component="div" />
                            </div>

                            <div>
                              <Field name="country">
                                {({ field }) => (
                                  <Select
                                    {...field}
                                    options={countryList()
                                      .getData()
                                      .filter(
                                        (country) =>
                                          !excludedCountries.includes(country.value.toLowerCase()),
                                      )}
                                    styles={customStyles}
                                    className={`form-field ${
                                      touched.country && errors.country ? 'invalid' : ''
                                    }`}
                                    value={values.country?.value}
                                    onChange={(option) => setFieldValue('country', option.value)}
                                  />
                                )}
                              </Field>
                              <ErrorMessage name="country" component="div" className="error" />
                            </div>

                            <div className="full">
                              <label>
                                <Field
                                  placeholder={t('fields.zip')}
                                  type="text"
                                  name="zip"
                                  className={touched.zip && errors.zip ? 'invalid' : ''}
                                />
                              </label>
                              <ErrorMessage className="error" name="zip" component="div" />
                            </div>
                          </div>

                          <h3>{t('contactDetails')}</h3>
                          <div className="billing-data">
                            <div>
                              <label>
                                <Field
                                  placeholder={t('fields.email')}
                                  type="email"
                                  name="email"
                                  className={touched.email && errors.email ? 'invalid' : ''}
                                />
                              </label>
                              <ErrorMessage className="error" name="email" component="div" />
                            </div>
                            <div>
                              <PhoneInput
                                country={'us'}
                                value={values.phone}
                                placeholder={t('fields.phone')}
                                onChange={(phone) => setFieldValue('phone', phone)}
                                excludeCountries={excludedCountries}
                                className={touched.phone && errors.phone ? 'invalid' : ''}
                              />
                              <ErrorMessage name="phone" component="div" className="error" />
                            </div>
                          </div>

                          <h3>{t('paymentMethod')}</h3>
                          <div className="payment">
                            <div>{t('payment.0')}</div>
                            <p>{t('payment.1')}</p>
                          </div>

                          <h3>{t('notes.0')}</h3>
                          <div className="billing-data">
                            <div className="full">
                              <Field as="textarea" placeholder={t('notes.1')} name="specialNotes" />
                            </div>
                          </div>

                          <h3>{t('summary.title')}</h3>
                          <div className="cart">
                            <div className="cart-head">
                              <div>{t('summary.service')}</div>
                              <div>{t('summary.price')}</div>
                              <div>{t('summary.subtotal')}</div>
                            </div>
                            <div className="cart-content">
                              {cart.map((item) => (
                                <div key={item.id} className="cart-item">
                                  <div>
                                    <span>
                                      {item.name} <b>x {item.quantity}</b>
                                    </span>
                                  </div>
                                  <div>{item.attributes.price}</div>

                                  <div>{item.quantity * item.attributes.price}</div>
                                </div>
                              ))}
                            </div>

                            <div className="total">
                              {t('summary.total')}: {totalAmount}
                            </div>
                          </div>

                          <div className="place-order">
                            <div className="checkbox">
                              <Field
                                type="checkbox"
                                name="terms"
                                className={touched.terms && errors.terms ? 'invalid' : ''}
                                id="terms"
                              />
                              <label htmlFor="terms">
                                <CheckboxIcon />
                                <span>
                                  {t('summary.terms.0')}
                                  <Link href="/terms-and-conditions">{t('summary.terms.1')}</Link>
                                </span>
                              </label>
                              <ErrorMessage name="terms" component="div" className="error" />
                            </div>

                            <div className="checkbox">
                              <Field
                                type="checkbox"
                                name="refundPolicy"
                                className={
                                  touched.refundPolicy && errors.refundPolicy ? 'invalid' : ''
                                }
                                id="refundPolicy"
                              />
                              <label htmlFor="refundPolicy">
                                <CheckboxIcon />
                                <span>
                                  {t('summary.refund.0')}
                                  <Link href="/refund-policy">{t('summary.refund.1')}</Link>
                                </span>
                              </label>
                              <ErrorMessage name="refundPolicy" component="div" className="error" />
                            </div>

                            <button className="main-button" type="submit" disabled={isSubmitting}>
                              <span>{t('submit')}</span>
                            </button>
                          </div>

                          {isLoading && (
                            <div className="loading">
                              <img src="/images/loading.svg" />
                            </div>
                          )}

                          {/*status?.success && (
                            <p className="success-message">
                              Your order has been successfully submitted! Please
                              check your email for a summary of your order and
                              payment instructions.
                            </p>
                          )*/}
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div>
              <section className="cart-wrap empty">
                <div className="_container">
                  <h1>
                    {t('noData.title.0')}
                    <span>{t('noData.title.1')}</span>
                  </h1>
                  <img src="/images/arrowDown.svg" />
                  <div className="buttons">
                    <Link href="/business-consulting">
                      <span>{t('noData.business')}</span>
                    </Link>
                    <Link href="/marketing-consulting">
                      <span>{t('noData.marketing')}</span>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default CartPage
