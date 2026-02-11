import { createRoot } from "react-dom/client";
import { KcPage, type KcContext } from "./kc.gen";

// Uncomment to test Keycloak login page locally with: npm run dev
import { getKcContextMock } from "./login/KcPageStory";

if (import.meta.env.DEV) {
    window.kcContext = getKcContextMock({
        pageId: "login.ftl",
        overrides: {
            message: {
                type: "error",
                summary: "Invalid email or password"
            },
            login: {
                username: "Test Two"
            }
        }
    });
}

createRoot(document.getElementById("root")!).render(
    window.kcContext ? (
        <KcPage kcContext={window.kcContext} />
    ) : (
        <h1>This project is a Keycloak theme. Run <code>npm run build-keycloak-theme</code> to build the theme JAR.</h1>
    )
);

declare global {
    interface Window {
        kcContext?: KcContext;
    }
}
