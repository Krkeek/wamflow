import React, {memo, useEffect, useState} from "react";
import styles from './elementsContainer.module.css'
import {ShapesData} from "../../../../dataEntry";
import Element from "@/components/homePageComponents/elementsContainer/element/element";
import {useAppDispatch} from "@/libs/redux/hooks";
import {setConnectionMode} from "@/libs/redux/features/connectionModeSlice";
import {WamElement} from "@/server/models/Element";
import {setIsLoading} from "@/libs/redux/features/loadingSlice";
import {GETResponseData} from "@/app/api/v1/elements/types";
import {ShapeInterface} from "../../../../declarations";
import {getUserStatus} from "@/utils/getUserStatus";


const ElementsContainer = () => {
    const dispatch = useAppDispatch();
    const handleDragStart = (e: React.DragEvent, elementId: string) => {
        e.dataTransfer.setData("elementId", elementId);
        dispatch(setConnectionMode(false));
    };

    const [shapes , setShapes] = useState<ShapeInterface[]>([]);

    useEffect(() => {
        setShapes(ShapesData);
    }, []);

    useEffect(() => {
        const userStatus = getUserStatus();
        if (userStatus.isLoggedIn){
            fetchElements().then((result:GETResponseData) => {
                if (result.success){
                    result.elements.forEach((element: WamElement) => {
                        setShapes(prevShapes => [
                            ...prevShapes,
                            {
                                id: element.elementID,
                                name: element.type,
                                SVGUrl: null,
                                code: element.svg
                            }
                        ]);
                    })
                }
                else {
                    console.log(result.message);
                }
            })
        }
    }, []);

    const fetchElements = async () => {
        dispatch(setIsLoading(true));
        if (document.cookie) {
            const accessToken = document.cookie
                .split('; ')
                .find(row => row.startsWith('JWT='))
                ?.split('=')[1];

            if (!accessToken)
                throw new Error('No access token');
            try {
                const response = await fetch('/api/v1/elements', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    console.log(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            }
            catch (error) {
                console.log("Error saving element:", error);
            }
            finally {
                dispatch(setIsLoading(false));
            }
        }
    }

    return (
        <div className={`${styles.Container}`}>
            {
                shapes.map((shape, index) => (
                    <Element key={index} shape={shape} handleDragStart={handleDragStart} />
                ))
            }
        </div>
    );
};

export default memo(ElementsContainer);