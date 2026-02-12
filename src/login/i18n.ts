import { i18nBuilder } from "keycloakify/login";

const { useI18n, ofTypeI18n } = i18nBuilder
    .withThemeName<"pmd-keycloak-theme">()
    .withExtraLanguages({})
    .withCustomTranslations({
        en: {
            notMatchPasswordMessage: "Password mismatch",
            invalidPasswordConfirmMessage: "Password mismatch",
            invalidPasswordMinLengthMessage: "Password does not meet password policy",
            invalidPasswordMaxLengthMessage: "Password does not meet password policy",
            invalidPasswordMinDigitsMessage: "Password does not meet password policy",
            invalidPasswordMinLowerCaseCharsMessage: "Password does not meet password policy",
            invalidPasswordMinUpperCaseCharsMessage: "Password does not meet password policy",
            invalidPasswordMinSpecialCharsMessage: "Password does not meet password policy",
            invalidPasswordNotUsernameMessage: "Password does not meet password policy",
            invalidPasswordNotContainsUsernameMessage: "Password does not meet password policy",
            invalidPasswordNotEmailMessage: "Password does not meet password policy",
            invalidPasswordRegexPatternMessage: "Password does not meet password policy",
            invalidPasswordHistoryMessage: "Password does not meet password policy",
            invalidPasswordBlacklistedMessage: "Password does not meet password policy",
            invalidPasswordGenericMessage: "Password does not meet password policy"
        }
    })
    .build();

type I18n = typeof ofTypeI18n;

export { useI18n, type I18n };
