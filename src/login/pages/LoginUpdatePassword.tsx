import { useState } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import "./Login.scss";
import "./LoginUpdatePassword.scss";

export default function LoginUpdatePassword(props: {
    kcContext: Extract<KcContext, { pageId: "login-update-password.ftl" }>;
    i18n: I18n;
}) {
    const { kcContext } = props;
    const { url, messagesPerField, isAppInitiatedAction, message } = kcContext;

    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const fieldError = messagesPerField.existsError("password", "password-confirm");
    const globalError = message?.type === "error";
    const passwordError = fieldError || globalError;

    return (
        <div className="login-page">
            <div className="login-left-panel">
                <img src="/assets/loading-bg.svg" className="login-gears" alt="" />
                <h1 className="login-brand">PMD</h1>
            </div>

            <div className="login-right-panel">
                <div className="login-card">
                    <h2 className="login-title">Change Password</h2>

                    <form
                        id="kc-passwd-update-form"
                        action={url.loginAction}
                        method="post"
                        className="login-form"
                    >
                        <input type="hidden" id="username" autoComplete="username" value={kcContext.auth?.attemptedUsername ?? ""} />
                        <div className={`login-field ${passwordError ? "login-field--error" : ""}`}>
                            <label className="login-label" htmlFor="password-new">
                                New password
                            </label>
                            <div className="login-password-wrapper">
                                <input
                                    id="password-new"
                                    name="password-new"
                                    type={isNewPasswordVisible ? "text" : "password"}
                                    autoFocus
                                    autoComplete="new-password"
                                    className="login-input"
                                />
                                <button
                                    type="button"
                                    className="login-eye-toggle"
                                    onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                                    aria-label={isNewPasswordVisible ? "Hide password" : "Show password"}
                                >
                                    {isNewPasswordVisible ? (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    ) : (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className={`login-field ${passwordError ? "login-field--error" : ""}`}>
                            <label className="login-label" htmlFor="password-confirm">
                                Confirm password
                            </label>
                            <div className="login-password-wrapper">
                                <input
                                    id="password-confirm"
                                    name="password-confirm"
                                    type={isConfirmPasswordVisible ? "text" : "password"}
                                    autoComplete="new-password"
                                    className="login-input"
                                />
                                <button
                                    type="button"
                                    className="login-eye-toggle"
                                    onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                    aria-label={isConfirmPasswordVisible ? "Hide password" : "Show password"}
                                >
                                    {isConfirmPasswordVisible ? (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    ) : (
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                            <line x1="1" y1="1" x2="23" y2="23" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {passwordError && (
                            <span className="login-error-message">
                                {fieldError
                                    ? (messagesPerField.existsError("password")
                                        ? messagesPerField.get("password")
                                        : messagesPerField.get("password-confirm"))
                                    : message?.summary}
                            </span>
                        )}

                        <div className="update-password-actions">
                            {isAppInitiatedAction && (
                                <button
                                    type="submit"
                                    name="cancel-aia"
                                    value="true"
                                    className="update-password-cancel"
                                >
                                    Cancel
                                </button>
                            )}
                            <button type="submit" className="update-password-submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
