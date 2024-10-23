"use client";
import "@/styles/cart.scss";
import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DeleteIcon from "@/icons/DeleteIcon";
import { Link } from "@/navigation";
import CheckboxIcon from "@/icons/CheckboxIcon";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ButtonArrow from "@/icons/ButtonArrow";
import axiosClient from "@/utils/GlobalApi";
import { createOrder } from "@/app/[locale]/api/orders";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const getCountryOptionByCode = (code) => {
  const countries = countryList().getData();
  return countries.find((country) => country.value === code);
};

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    color: "#ffffff4d",
    height: "50px",
    borderRadius: "0",
    background: "#0000000D",
    border: state.isFocused ? "1px solid #00000033" : "1px solid #00000033",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.2",
    textAlign: "left",
    padding: "0 20px",
    boxShadow: "unset",
    "&:hover": {
      borderColor: "#00000033",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: "50px",
    margin: "0",
    padding: "0",
    border: "none",
  }),
  input: (provided) => ({
    ...provided,
    height: "50px",
    margin: "0",
    padding: "0",
    border: "none",
    color: "#1E1E1E",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#1E1E1E",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    "> span": {
      display: "none",
    },
  }),
  indicatorContainer: (provided) => ({
    ...provided,
    padding: "0",
  }),
  menu: (provided) => ({
    ...provided,
    background: "#ffffff0d",
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected ? "#F2F2F2" : "#F2F2F2",
    color: "#1E1E1E",
    "&:hover": {
      background: "#A225EE",
      color: "#ffffff",
    },
  }),
};

const CartPage = () => {
  const { cart, deleteFromCart, clearCart, totalAmount } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const { currentUser, setCurrentUser, getToken } = useAuth();
  const router = useRouter();

  console.log(getCountryOptionByCode(currentUser?.country));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const initialValues = {
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    street: currentUser?.street || "",
    address: currentUser?.address || "",
    city: currentUser?.city || "",
    state: currentUser?.state || "",
    zip: currentUser?.zip || "",
    country: getCountryOptionByCode(currentUser?.country) || null,
    terms: false,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required."),
    lastName: Yup.string().required("This field is required."),
    email: Yup.string()
      .email("Please provide a valid email address.")
      .required("This field is required."),
    phone: Yup.string()
      .required("This field is required."),
    street: Yup.string().required("This field is required."),
    address: Yup.string().required("This field is required."),
    city: Yup.string().required("This field is required."),
    state: Yup.string().required("This field is required."),
    zip: Yup.string().required("This field is required."),
    country: Yup.string().required("This field is required."),
    terms: Yup.bool().oneOf(
      [true],
      "You must accept the terms and conditions."
    ),
  });

  const generateRandomPassword = (length = 12) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let userId = currentUser?.id;
      if (!userId) {
        // Register a new user if they do not exist
        const registerData = {
          email: values.email,
          password: generateRandomPassword(), // Use a default or generated password here
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.email,
          phone: values.phone,
        };

        const registerResponse = await fetch("/api/auth/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registerData),
        });

        if (registerResponse.ok) {
          const registerResult = await registerResponse.json();
          userId = registerResult.user.id;
          setCurrentUser(registerResult.user); // Update current user context
          localStorage.setItem("user", JSON.stringify(registerResult.user));
          newOrder(values, userId);
          try {
            const response = await fetch("/api/emails/sign-up", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(registerData),
            });
            if (response.ok) {
              setTimeout(() => {}, 400);
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          throw new Error("User registration failed.");
        }
      } else {
        // Update existing user information
        const updateData = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          street: values.street,
          address: values.address,
          city: values.city,
          state: values.state,
          zip: values.zip,
          country: values.country,
          userId,
        };

        const token = getToken();

        const updateResponse = await fetch("/api/auth/user-update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        });

        if (!updateResponse.ok) {
          throw new Error("Failed to update user data.");
        }

        const updatedUser = await updateResponse.json();
        setCurrentUser(updatedUser.user);
        localStorage.setItem("user", JSON.stringify(updatedUser.user));
        newOrder(values, currentUser.id);
      }

      const productTitles = cart.map((product) => product.attributes.title);
      // Prepare order data for email
      const emailOrderData = {
        fullName: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phone: values.phone,
        service: "Order", // Assuming you want to pass a service type
        message: "Your order details",
        cart, // Pass the cart items to the email endpoint
        totalAmount, // Include total amount in the email
      };

      try {
        const response = await fetch("/api/emails/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailOrderData),
        });
        if (response.ok) {
          setTimeout(() => {
            console.log(JSON.stringify(emailOrderData, null, 2));
          }, 400);
        } else {
          setStatus({ success: false });
        }
      } catch (error) {
        console.error(error);
        setStatus({ success: false });
        setSubmitting(false);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const newOrder = (values, id) => {
    const productIds = cart.map((product) => product.id); // Proper use of map to transform cart items into an array of IDs

    const orderData = {
      data: {
        email: values.email, // Include email
        users_permissions_user: id,
        products: productIds, // Use the transformed array
        amount: totalAmount,
        status: "completed",
      },
    };

    createOrder(orderData).then((response) => {
      if (response.status === 200) {
        router.push("/thankyou");
        setTimeout(() => {
          clearCart();
        }, 2000);
      } else {
        console.error("Order creation failed:", response);
      }
    });
  };

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
                      {({
                        isSubmitting,
                        setFieldValue,
                        status,
                        touched,
                        errors,
                        values,
                      }) => (
                        <Form>
                          <h2>Billing Information</h2>
                          <div className="billing-data">
                            <div>
                              <label>
                                <Field
                                  placeholder="First name"
                                  type="text"
                                  name="firstName"
                                  className={
                                    touched.firstName && errors.firstName
                                      ? "invalid"
                                      : ""
                                  }
                                />
                              </label>
                              <ErrorMessage
                                className="error"
                                name="firstName"
                                component="div"
                              />
                            </div>
                            <div>
                              <label>
                                <Field
                                  placeholder="Last name"
                                  type="text"
                                  name="lastName"
                                  className={
                                    touched.lastName && errors.lastName
                                      ? "invalid"
                                      : ""
                                  }
                                />
                              </label>
                              <ErrorMessage
                                className="error"
                                name="lastName"
                                component="div"
                              />
                            </div>
                            <div>
                              <label>
                                <Field
                                  placeholder="Email"
                                  type="email"
                                  name="email"
                                  className={
                                    touched.email && errors.email
                                      ? "invalid"
                                      : ""
                                  }
                                />
                              </label>
                              <ErrorMessage
                                className="error"
                                name="email"
                                component="div"
                              />
                            </div>
                            <div>
                              <PhoneInput
                                country={"us"}
                                value={
                                  currentUser?.phone ? currentUser?.phone : ""
                                }
                                placeholder="Phone Number "
                                onChange={(phone) =>
                                  setFieldValue("phone", phone)
                                }
                                className={
                                  touched.phone && errors.phone ? "invalid" : ""
                                }
                              />
                              <ErrorMessage
                                name="phone"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div>
                              <label>
                                <Field
                                  placeholder="Street"
                                  type="text"
                                  name="street"
                                  className={
                                    touched.street && errors.street
                                      ? "invalid"
                                      : ""
                                  }
                                />
                              </label>
                              <ErrorMessage
                                className="error"
                                name="street"
                                component="div"
                              />
                            </div>
                            <div>
                              <label>
                                <Field
                                  placeholder="Address"
                                  type="text"
                                  name="address"
                                  className={
                                    touched.address && errors.address
                                      ? "invalid"
                                      : ""
                                  }
                                />
                              </label>
                              <ErrorMessage
                                className="error"
                                name="address"
                                component="div"
                              />
                            </div>
                            <div>
                              <label>
                                <Field
                                  placeholder="City"
                                  type="text"
                                  name="city"
                                  className={
                                    touched.city && errors.city ? "invalid" : ""
                                  }
                                />
                              </label>
                              <ErrorMessage
                                className="error"
                                name="city"
                                component="div"
                              />
                            </div>
                            <div>
                              <label>
                                <Field
                                  placeholder="State/Province"
                                  type="text"
                                  name="state"
                                  className={
                                    touched.state && errors.state
                                      ? "invalid"
                                      : ""
                                  }
                                />
                              </label>
                              <ErrorMessage
                                className="error"
                                name="state"
                                component="div"
                              />
                            </div>
                            <div>
                              <label>
                                <Field
                                  placeholder="ZIP"
                                  type="text"
                                  name="zip"
                                  className={
                                    touched.zip && errors.zip ? "invalid" : ""
                                  }
                                />
                              </label>
                              <ErrorMessage
                                className="error"
                                name="zip"
                                component="div"
                              />
                            </div>
                            <div>
                              <Field name="country">
                                {({ field }) => (
                                  <Select
                                    {...field}
                                    options={countryList().getData()}
                                    styles={customStyles}
                                    className={`form-field ${
                                      touched.country && errors.country
                                        ? "invalid"
                                        : ""
                                    }`}
                                    value={values.country?.value}
                                    onChange={(option) =>
                                      setFieldValue("country", option.value)
                                    }
                                  />
                                )}
                              </Field>
                              <ErrorMessage
                                name="country"
                                component="div"
                                className="error"
                              />
                            </div>
                            <div className="full">
                              <p>
                                * An email containing payment instructions,
                                including our bank details, will be sent shortly
                                after placing an order. This email will also
                                include a summary of your order details.
                              </p>
                            </div>
                          </div>

                          <h2>Payment Method</h2>
                          <div className="payment">
                            <div>Bank Transfer*</div>
                            <p>
                              * You will soon receive an email with payment
                              instructions, including our bank details and a
                              summary of your order details.
                            </p>
                          </div>

                          <h2 className="total">Total: €{totalAmount}</h2>

                          <div className="place-order">
                            <div className="checkbox">
                              <Field
                                type="checkbox"
                                name="terms"
                                className={
                                  touched.terms && errors.terms ? "invalid" : ""
                                }
                                id="terms"
                              />
                              <label for="terms">
                                <CheckboxIcon />
                                <span>
                                  I have read and agree to the website's{" "}
                                  <Link href="/terms-and-conditions">
                                    Terms and Conditions
                                  </Link>
                                </span>
                              </label>
                              <ErrorMessage
                                name="terms"
                                component="div"
                                className="error"
                              />
                            </div>

                            <div className="checkbox">
                              <Field
                                type="checkbox"
                                name="refund"
                                className={
                                  touched.refund && errors.refund
                                    ? "invalid"
                                    : ""
                                }
                                id="refund"
                              />
                              <label for="refund">
                                <CheckboxIcon />
                                <span>
                                  I have read and agree to the{" "}
                                  <Link href="/refund-policy">
                                    Refund Policy
                                  </Link>
                                </span>
                              </label>
                              <ErrorMessage
                                name="refund"
                                component="div"
                                className="error"
                              />
                            </div>

                            <button
                              className="main-button"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              <span>Submit</span>
                              <ButtonArrow />
                            </button>

                            <div className="privacy">
                              We will utilise your personal information to
                              process your order, improve your browsing
                              experience on our website, and perform other
                              purposes detailed in our{" "}
                              <Link href="/privacy-policy">Privacy Policy</Link>
                              .
                            </div>
                          </div>
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
                  <h1>Your cart is empty</h1>
                  <h2>
                    Discover our wide array of business and marketing consulting
                    services!
                  </h2>
                  <Link href="/" className="main-button">
                    <span>Go home</span>
                    <ButtonArrow />
                  </Link>
                </div>
              </section>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CartPage;
