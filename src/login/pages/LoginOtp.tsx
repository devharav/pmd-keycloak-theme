import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import "./Login.scss";
import "./LoginOtp.scss";

export default function LoginOtp(props: {
    kcContext: Extract<KcContext, { pageId: "login-otp.ftl" }>;
    i18n: I18n;
}) {
    const { kcContext } = props;
    const { url, messagesPerField, message } = kcContext;

    const otpError = messagesPerField.existsError("totp") || message?.type === "error";

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
                        id="kc-otp-login-form"
                        action={url.loginAction}
                        method="post"
                        className="login-form"
                    >
                        <div className="login-field">
                            <label className="login-label" htmlFor="email-display">
                                Email
                            </label>
                            <div className="login-password-wrapper">
                                <input
                                    id="email-display"
                                    type="text"
                                    className="login-input"
                                    value={kcContext.auth?.attemptedUsername ?? ""}
                                    readOnly
                                />
                                <a
                                    href={url.loginRestartFlowUrl}
                                    className="login-eye-toggle"
                                    aria-label="Restart login"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="23 4 23 10 17 10" />
                                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className={`login-field ${otpError ? "login-field--error" : ""}`}>
                            <label className="login-label" htmlFor="otp">
                                One-time code
                            </label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                autoFocus
                                autoComplete="one-time-code"
                                className="login-input"
                            />
                        </div>

                        {otpError && (
                            <span className="login-error-message">
                                {messagesPerField.existsError("totp")
                                    ? messagesPerField.get("totp")
                                    : message?.summary}
                            </span>
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
