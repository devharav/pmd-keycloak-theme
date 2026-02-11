import { useState } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import "./Login.scss";

export default function Login(props: {
    kcContext: Extract<KcContext, { pageId: "login.ftl" }>;
    i18n: I18n;
}) {
    const { kcContext } = props;
    const { url, login, message, realm } = kcContext;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const hasError = message?.type === "error";

    return (
        <div className="login-page">
            <div className="login-left-panel">
                <img src="/assets/loading-bg.svg" className="login-gears" alt="" />
                <h1 className="login-brand">PMD</h1>
            </div>

            <div className="login-right-panel">
                <div className="login-card">
                    <h2 className="login-title">Sign in to your account</h2>

                    <form
                        action={url.loginAction}
                        method="post"
                        className="login-form"
                    >
                        <div className={`login-field ${hasError ? "login-field--error" : ""}`}>
                            <label className="login-label" htmlFor="username">
                                Email
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoFocus
                                autoComplete="email"
                                defaultValue={login.username ?? ""}
                                className="login-input"
                            />
                        </div>

                        <div className={`login-field ${hasError ? "login-field--error" : ""}`}>
                            <label className="login-label" htmlFor="password">
                                Password
                            </label>
                            <div className="login-password-wrapper">
                                <input
                                    id="password"
                                    name="password"
                                    type={isPasswordVisible ? "text" : "password"}
                                    autoComplete="current-password"
                                    className="login-input"
                                />
                                <button
                                    type="button"
                                    className="login-eye-toggle"
                                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                                >
                                    {isPasswordVisible ? (
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

                        {message && message.type !== "warning" && (
                            <p className="login-error-message">
                                <span dangerouslySetInnerHTML={{ __html: message.summary }} />
                            </p>
                        )}

                        {realm.resetPasswordAllowed && (
                            <a href={url.loginResetCredentialsUrl} className="login-forgot">
                                Forgot password?
                            </a>
                        )}

                        <button type="submit" className="login-submit">
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
