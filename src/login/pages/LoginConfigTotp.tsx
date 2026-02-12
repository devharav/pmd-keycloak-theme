import { useState } from "react";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import "./Login.scss";
import "./LoginConfigTotp.scss";

export default function LoginConfigTotp(props: {
    kcContext: Extract<KcContext, { pageId: "login-config-totp.ftl" }>;
    i18n: I18n;
}) {
    const { kcContext, i18n } = props;
    const { url, totp, mode, messagesPerField, message, isAppInitiatedAction } = kcContext;
    const { advancedMsg } = i18n;

    const [showManual, setShowManual] = useState(mode === "manual");

    const otpError = messagesPerField.existsError("totp") || message?.type === "error";

    return (
        <div className="login-page">
            <div className="login-left-panel">
                <img src="/assets/loading-bg.svg" className="login-gears" alt="" />
                <h1 className="login-brand">PMD</h1>
            </div>

            <div className="login-right-panel">
                <div className="login-card">
                    <h2 className="login-title">Mobile Authenticator Setup</h2>
                    <p className="config-totp-subtitle">Set up Mobile Authentication to activate your account</p>

                    <form
                        id="kc-totp-settings-form"
                        action={url.loginAction}
                        method="post"
                        className="login-form"
                    >
                        <div className="config-totp-step">
                            <p className="config-totp-step-title">1. Install one of the following applications on your mobile</p>
                            <ul className="config-totp-app-list">
                                {totp.supportedApplications.map(app => (
                                    <li key={app}>{advancedMsg(app)}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="config-totp-step">
                            <p className="config-totp-step-title">2. Open the application and scan the barcode</p>

                            {!showManual ? (
                                <>
                                    <img
                                        src={`data:image/png;base64,${totp.totpSecretQrCode}`}
                                        alt="QR code"
                                        className="config-totp-qr"
                                    />
                                    <a
                                        href="#"
                                        className="config-totp-link"
                                        onClick={e => { e.preventDefault(); setShowManual(true); }}
                                    >
                                        Unable to scan?
                                    </a>
                                </>
                            ) : (
                                <>
                                    <p className="config-totp-secret">{totp.totpSecretEncoded}</p>
                                    <a
                                        href="#"
                                        className="config-totp-link"
                                        onClick={e => { e.preventDefault(); setShowManual(false); }}
                                    >
                                        Scan barcode?
                                    </a>
                                </>
                            )}
                        </div>

                        <div className="config-totp-step">
                            <p className="config-totp-step-title">3. Enter the one-time code provided by the application and click Submit to finish the setup</p>
                            <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret} />
                            {mode && <input type="hidden" name="mode" value={mode} />}

                            <div className={`login-field ${otpError ? "login-field--error" : ""}`}>
                                <label className="login-label" htmlFor="totp">
                                    One-time code
                                </label>
                                <input
                                    id="totp"
                                    name="totp"
                                    type="text"
                                    autoFocus
                                    autoComplete="off"
                                    className="login-input"
                                />
                            </div>
                        </div>

                        {otpError && (
                            <span className="login-error-message">
                                {messagesPerField.existsError("totp")
                                    ? messagesPerField.get("totp")
                                    : message?.summary}
                            </span>
                        )}

                        <div className="config-totp-actions">
                            {isAppInitiatedAction && (
                                <button
                                    type="submit"
                                    name="cancel-aia"
                                    value="true"
                                    className="config-totp-cancel"
                                >
                                    Cancel
                                </button>
                            )}
                            <button type="submit" className="login-submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
