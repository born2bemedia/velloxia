"use client";
import React, { useState } from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import useCountryCode from "@/utils/useCountryCode";
import Select from "react-select";
import Link from "next/link";

const CustomSelect = ({ name, options, ...props }) => {
  const { setFieldValue, setFieldTouched, errors, touched, values } = useFormikContext();

  const handleChange = (selectedOption) => {
    setFieldValue(name, selectedOption ? selectedOption.value : "");
    setFieldTouched(name, true);
  };

  return (
    <div className="row">
      <Select
        {...props}
        options={options}
        onChange={handleChange}
        value={options.find(option => option.value === values[name])}
        className={touched[name] && errors[name] ? "invalid" : ""}
        classNamePrefix="custom-select"
      />
      {touched[name] && errors[name] ? (
        <div className="error">{errors[name]}</div>
      ) : null}
    </div>
  );
};

function FormContacts() {
  const countryCode = useCountryCode();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const validationSchema = Yup.object({
    yourName: Yup.string().required("The field is required."),
    email: Yup.string()
      .email("Please enter a valid email address.")
      .required("The field is required."),
    phone: Yup.string().required("The field is required."),
    sphere: Yup.string(),
    agreeToPolicy: Yup.boolean().oneOf([true], "You must agree to the Privacy Policy."),
  });

  const initialValues = {
    yourName: "",
    email: "",
    phone: "",
    sphere: "",
    agreeToPolicy: false,
  };

  const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
    try {
      const response = await fetch("/api/emails/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        setTimeout(() => {
          setSubmitting(false);
          resetForm();
          setStatus({ success: true });
          setIsSuccess(true);
          setIsFormVisible(false);
        }, 400);
      } else {
        setStatus({ success: false });
      }
    } catch (error) {
      console.error(error);
      setStatus({ success: false });
      setSubmitting(false);
    }
  };

  const options = [
    { value: "", label: "Sphere of Interest:" },
    { value: "business", label: "Business" },
    { value: "marketing", label: "Marketing" },
    { value: "both", label: "Both" },
  ];

  return (
    <div className="request-form">
      {isFormVisible ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status, errors, touched }) => (
            <div className="wrapper">
              <Form className="form">
                {Object.keys(errors).length > 0 && touched && (
                  <span className="general-error">
                    This field is required.
                  </span>
                )}

                <div className="row">
                  <Field name="yourName">
                    {({ field, form }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Full name:"
                        className={form.touched.yourName && form.errors.yourName ? "invalid" : ""}
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
                        placeholder="Email:"
                        className={form.touched.email && form.errors.email ? "invalid" : ""}
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
                        onChange={(value) => form.setFieldValue("phone", value)}
                        placeholder="Phone:"
                        className={form.touched.phone && form.errors.phone ? "invalid" : ""}
                      />
                    )}
                  </Field>
                </div>

                <div className="row _select">
                  <Field name="sphere">
                    {({ field, form }) => (
                      <CustomSelect
                        {...field}
                        options={options}
                        className={form.touched.sphere && form.errors.sphere ? "invalid" : ""}
                      />
                    )}
                  </Field>
                </div>

                <div className="row _policy">
                  <Field name="agreeToPolicy">
                    {({ field, form }) => (
                      <label className={`checkbox-label ${field.value ? "_active" : ""} ${form.touched.agreeToPolicy && form.errors.agreeToPolicy ? "invalid" : ""}`}>
                        <input
                          {...field}
                          type="checkbox"
                          checked={field.value}
                          className={form.touched.agreeToPolicy && form.errors.agreeToPolicy ? "invalid" : ""}
                        />
                        <span>
                          I agree to the processing of my data in accordance with the <Link href="/privacy-policy">Privacy Policy</Link> and <Link href="/terms-and-conditions">Terms and Conditions</Link>.
                        </span>
                      </label>
                    )}
                  </Field>
                </div>

                <button type="submit" className="button" disabled={isSubmitting}>
                  Submit
                </button>
              </Form>
              {isSuccess && (
                <div className="success-message">
                  <span>Thank you!</span> Your submission has been received. We will get back to you shortly, so please check your email for our response.
                </div>
              )}
            </div>
          )}
        </Formik>
      ) : (
        <div className="success-message">
          <span>Thank you!</span> Your submission has been received. We will get back to you shortly, so please check your email for our response.
        </div>
      )}
    </div>
  );
}

export default FormContacts;
