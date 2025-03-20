import { useEffect, useRef } from "react";

export function useWhyDidYouUpdate(name: any, props: any) {
    const prevProps = useRef(props);

    useEffect(() => {
        if (prevProps.current) {
            const changes = Object.keys(props).reduce((acc, key) => {
                if (props[key] !== prevProps.current[key]) {
                    // @ts-ignore
                    acc[key] = { before: prevProps.current[key], after: props[key] };
                }
                return acc;
            }, {});

            if (Object.keys(changes).length > 0) {
                console.log(`[why-did-you-update] ${name}`, changes);
            }
        }
        prevProps.current = props;
    }, [props]);
}