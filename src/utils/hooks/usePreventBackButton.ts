import { useEffect } from "react";

const usePreventBackButton = () => {
    useEffect(() => {
        if (typeof window !== "undefined") {
            window.history.pushState(null, "", window.location.href);
            const preventBack = () => window.history.pushState(null, "", window.location.href);

            window.addEventListener("popstate", preventBack);

            return () => {
                window.removeEventListener("popstate", preventBack);
            };
        }
    }, []);
};

export default usePreventBackButton;