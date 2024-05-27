'use client'
import DiagramHeader from "@/components/homePageComponents/diagramHeader/diagramHeader";
import styles from './homePage.module.css'
import OptionsBar from "@/components/homePageComponents/optionsBar/optionsBar";
import ShapesContainer from "@/components/homePageComponents/shapesContainer/shapesContainer";
import ShapeDetailContainer from "@/components/homePageComponents/shapeDetailContainer/shapeDetailContainer";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import {HomePageAnimation} from "@/animation/HomePageAnimation";
import PaperView from "@/components/homePageComponents/paperView/paperView";
import {useEffect, useState} from "react";
import {ElementProps} from "../../../declarations";
const HomePage = () =>{



    const [elementSelected, setElementSelected] = useState<string | null>(null)
    const setElementSelectedFn = (newElement: string) => setElementSelected(newElement);
    const [connectionMode, setConnectionMode] = useState(false);
    const setConnectionModeFn = (mode: boolean) => setConnectionMode(mode)


    useEffect(()=>{
        console.log(elementSelected)
    },[elementSelected])

    useGSAP(()=>{

        const ctx = gsap.context(()=>{
            HomePageAnimation()
        })

        return () => ctx.revert()
    })


    return(
        <>
            <div className={`${styles.Container} ContainerAnimation`}>
              <div className={`${styles.TopBar}`}>
                  <DiagramHeader />
                  <OptionsBar  connectionMode={connectionMode} setConnectionMode={setConnectionModeFn}/>
              </div>
                <div className={`${styles.ContentDiv}`}>
                    <div className={`${styles.LeftSide}`}>
                        <ShapesContainer />
                    </div>
                    <div className={`${styles.Middle}`}>
                        <PaperView elementSelected={elementSelected} setElementSelected={setElementSelectedFn}/>
                    </div>
                    <div className={`${styles.RightSide}`}>
                        <ShapeDetailContainer elementSelected={elementSelected} setElementSelected={setElementSelectedFn} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default HomePage