"use client";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import useCountryCode from "@/utils/useCountryCode"; 
import "react-phone-input-2/lib/style.css";
import Link from "next/link"; 

function CareerForm() {
    const [fileSelected, setFileSelected] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [phoneCountryCode, setPhoneCountryCode] = useState("us");
    const countryCode = useCountryCode();

    const validationSchema = Yup.object({
        yourName: Yup.string().required("The field is required."),
        email: Yup.string().email("Please enter a valid email address.").required("The field is required."),
        phone: Yup.string().required("The field is required."),
        file: Yup.mixed(),
        explanation: Yup.string(),
        link1: Yup.string().url("Please enter a valid URL."),
        link2: Yup.string().url("Please enter a valid URL."),
        agreeToPolicy: Yup.bool().oneOf([true], "You must agree to the policies.")
    });

    const initialValues = {
        yourName: "",
        email: "",
        phone: "",
        file: null,
        explanation: "",
        link1: "",
        link2: "",
        agreeToPolicy: false,
    };

    const handleSubmit = async (values, { setSubmitting, resetForm, setStatus }) => {
        try {
            console.log("Submitting values:", values);

            const fileBase64 = values.file ? await readFileAsBase64(values.file) : null;

            const payload = {
                ...values,
                attachFiles: fileBase64 ? [fileBase64] : [],
            };

            console.log("Payload:", payload);

            const response = await fetch("/api/emails/career", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                resetForm();
                setStatus({ success: true });
                setIsSuccess(true);
                document.querySelector('input[type="file"]').value = "";
                setFileSelected(false);
            } else {
                setStatus({ success: false });
                setIsSuccess(false);
                console.error("Failed to submit:", await response.text());
            }
        } catch (error) {
            console.error("Error:", error);
            setStatus({ success: false });
            setIsSuccess(false);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="request-form">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue, status, errors, touched }) => (
                    <div className="wrapper">
                        <Form className="form _career">
                            <div className="row">
                                <Field name="yourName">
                                    {({ field, form }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            placeholder="Your name"
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
                                            placeholder="Email"
                                            className={form.touched.email && form.errors.email ? "invalid" : ""}
                                        />
                                    )}
                                </Field>
                            </div>
                            <div className="row">
                                <Field name="phone">
                                    {({ field, form }) => (
                                        <div>
                                            <PhoneInput
                                                country={countryCode}
                                                value={field.value}
                                                onChange={(value) => form.setFieldValue("phone", value)}
                                                placeholder="Your phone"
                                                className={
                                                    form.touched.phone && form.errors.phone
                                                        ? "invalid"
                                                        : ""
                                                }
                                            />
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div className={`row _file ${fileSelected ? "_active" : ""} ${touched.file && errors.file ? "_error" : ""}`}>
                                <input
                                    type="file"
                                    name="file"
                                    onChange={(event) => {
                                        setFieldValue("file", event.currentTarget.files[0]);
                                        setFileSelected(true);
                                    }}
                                />
                            </div>

                            {fileSelected && (
                                <div className="row _remove">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setFieldValue("file", null);
                                            setFileSelected(false);
                                        }}
                                    >
                                        Remove File
                                    </button>
                                </div>
                            )}
                            <div className="row">
                                <Field name="link1">
                                    {({ field, form }) => (
                                        <input
                                            {...field}
                                            type="url"
                                            placeholder="Link 1"
                                            className={form.touched.link1 && form.errors.link1 ? "invalid" : ""}
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
                                            placeholder="Link 2"
                                            className={form.touched.link2 && form.errors.link2 ? "invalid" : ""}
                                        />
                                    )}
                                </Field>
                            </div>
                            <div className="row _textarea">
                                <div className="textarea-container">
                                    <label>Brief Introduction</label>
                                    <Field name="explanation">
                                        {({ field, form }) => (
                                            <textarea
                                                {...field}
                                                placeholder="Explain why you want to join our team."
                                                className={form.touched.explanation && form.errors.explanation ? "invalid" : ""}
                                            />
                                        )}
                                    </Field>
                                </div>
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
                            <button
                                type="submit"
                                className="request-button"
                                disabled={isSubmitting}
                            >
                                Submit Request
                            </button>
                            {Object.keys(errors).length > 0 && touched && (
                                <span className="general-error">
                                    This field is required.
                                </span>
                            )}
                        </Form>
                        {status && status.success && isSuccess && (
                            <div className="success-message">
                                <span>Thank you!</span> Your request has been successfully received. Our team will review your information and contact you shortly.
                            </div>
                        )}
                    </div>
                )}
            </Formik>
        </div>
    );
}

export default CareerForm;
