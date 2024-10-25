"use client";
import "@/styles/account.scss";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import countryList from "react-select-country-list";
import useAuthStore from "@/stores/authStore";
import { useRouter } from "next/navigation";
import ChangePassword from "./ChangePassword";
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
    color: "#333",
    height: "50px",
    borderRadius: "30px",
    background: "#F3F3F3",
    border: state.isFocused ? "1px solid #fff" : "1px solid #fff",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "1.2",
    textAlign: "left",
    padding: "0 20px",
    boxShadow: "unset",
    "&:hover": {
      borderColor: "#fff",
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
      background: "#1FA169",
      color: "#ffffff",
    },
  }),
};

const PersonalData = () => {
  const { currentUser, fetchCurrentUser, getToken, setCurrentUser } =
    useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [billingError, setBillingError] = useState("");
  const [billingSuccess, setBillingSuccess] = useState("");

  useEffect(() => {
    fetchCurrentUser();
    setIsMounted(true);
  }, []);

  const initialValues = {
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    addressLine1: currentUser?.addressLine1 || "",
    addressLine2: currentUser?.addressLine2 || "",
    city: currentUser?.city || "",
    zip: currentUser?.zip || "",
    country: getCountryOptionByCode(currentUser?.country) || null,
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required."),
    lastName: Yup.string().required("This field is required."),
    addressLine1: Yup.string().required("This field is required."),
    city: Yup.string().required("This field is required."),
    zip: Yup.string().required("This field is required."),
    country: Yup.object().required("This field is required."),
    email: Yup.string()
      .email("Please provide a valid email address.")
      .required("This field is required."),
    phone: Yup.string().required("This field is required."),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = getToken();

      const updateData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        addressLine1: values.addressLine1,
        addressLine2: values.addressLine2,
        city: values.city,
        zip: values.zip,
        country: values.country.value,
        userId: currentUser?.id,
      };

      const response = await fetch("/api/auth/user-update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setCurrentUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        fetchCurrentUser();
        setBillingSuccess(
          "Your personal information has been updated successfully."
        );
        
      } else {
        const errorData = await response.json();
        setBillingError(errorData.message);
      }
    } catch (error) {
      console.error("Failed to update user data", error);
      setBillingError("An error occurred while updating your information.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="personal-data">
        <div className="_container">
          {isMounted && (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue, touched, errors, values }) => (
                <Form>
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
                            touched.lastName && errors.lastName ? "invalid" : ""
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
                            touched.email && errors.email ? "invalid" : ""
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
                        value={values.phone}
                        placeholder="Phone Number"
                        onChange={(phone) => setFieldValue("phone", phone)}
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
                          placeholder="Address Line 1"
                          type="text"
                          name="addressLine1"
                          className={
                            touched.addressLine1 && errors.addressLine1
                              ? "invalid"
                              : ""
                          }
                        />
                      </label>
                      <ErrorMessage
                        className="error"
                        name="addressLine1"
                        component="div"
                      />
                    </div>
                    <div>
                      <label>
                        <Field
                          placeholder="Address Line 2"
                          type="text"
                          name="addressLine2"
                        />
                      </label>
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
                          placeholder="ZIP"
                          type="text"
                          name="zip"
                          className={touched.zip && errors.zip ? "invalid" : ""}
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
                              touched.country && errors.country ? "invalid" : ""
                            }`}
                            value={countryList()
                              .getData()
                              .find(
                                (option) =>
                                  option.value === values.country?.value
                              )}
                            onChange={(option) =>
                              setFieldValue("country", option)
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
                  </div>
                  <button
                    type="submit"
                    className="main-button"
                    disabled={isSubmitting}
                  >
                    <span>Update Data</span>
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
        {billingError && <div className="billing-error">{billingError}</div>}
        {billingSuccess && (
          <div className="billing-success">{billingSuccess}</div>
        )}
      </section>

      <ChangePassword />
    </>
  );
};

export default PersonalData;
