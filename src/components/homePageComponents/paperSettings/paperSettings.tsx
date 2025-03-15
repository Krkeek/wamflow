import styles from "./paperSettings.module.css";
import ControlButton from "@/components/homePageComponents/paperSettings/controlButton/controlButton";
import { dia } from "@joint/core";
import { useEffect, useState } from "react";

type IProps = {
    paper: dia.Paper | null;
};

const PaperSettings = ({ paper }: IProps) => {
    const [scale, setScale] = useState({ sx: 1, sy: 1 });
    const [position, setPosition] = useState({ tx: 0, ty: 0 });

    useEffect(() => {
        if (paper) {
            setScale(paper.scale());
            setPosition(paper.translate());
        }
    }, [paper]);

    const handleZoom = (zoomIn: boolean) => {
        if (!paper) return;
        const factor = zoomIn ? 0.1 : -0.1;
        const newScale = { sx: scale.sx + factor, sy: scale.sy + factor };
        paper.scale(newScale.sx, newScale.sy);
        setScale(newScale);
    };

    const handleTranslate = (dx: number, dy: number) => {
        if (!paper) return;
        const newPosition = { tx: position.tx + dx, ty: position.ty + dy };
        paper.translate(newPosition.tx, newPosition.ty);
        setPosition(newPosition);
    };

/*    const handleFitToContent = () => {
        if (!paper) return;
        paper.transformToFitContent();
    }*/

    return (
        <div className={styles.Container}>
            <div className={styles.Header}>Control Center</div>
            <div className={styles.Expandable}>

                <div className={styles.Column}>
                    Move
                    <ControlButton onClick={() => handleTranslate(20, 0)} transform="rotate(-90deg)" margin="0 0 0 1rem" imgUrl="/assets/arrow.png" />
                    <ControlButton onClick={() => handleTranslate( 0, 20)} imgUrl="/assets/arrow.png" />
                    <ControlButton onClick={() => handleTranslate(0, -20)} transform="rotate(180deg)" imgUrl="/assets/arrow.png" />
                    <ControlButton onClick={() => handleTranslate(-20 ,0)} transform="rotate(90deg)" imgUrl="/assets/arrow.png" />
                </div>

                <div className={styles.Column}>
                    Scale
                    <ControlButton onClick={() => handleZoom(true)} margin="0 0 0 1rem" value="+" />
                    <ControlButton onClick={() => handleZoom(false)} alignItems="flex-start" value="_" />
                </div>
                <div className={styles.Column}>
{/*
                    <button onClick={handleFitToContent}>Fit to Content</button>
*/}

                </div>

            </div>
        </div>
    );
};

export default PaperSettings;