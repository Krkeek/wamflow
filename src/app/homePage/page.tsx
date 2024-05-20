'use client'
import DiagramHeader from "@/components/homePageComponents/diagramHeader/diagramHeader";
import styles from './homePage.module.css'
import OptionsBar from "@/components/homePageComponents/optionsBar/optionsBar";
import ShapesContainer from "@/components/homePageComponents/shapesContainer/shapesContainer";
import ShapeDetailContainer from "@/components/homePageComponents/shapeDetailContainer/shapeDetailContainer";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";
import {HomePageAnimation} from "@/animation/HomePageAnimation";
const HomePage = () =>{

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
                  <OptionsBar />
              </div>
                <div className={`${styles.ContentDiv}`}>
                    <div className={`${styles.LeftSide}`}>
                        <ShapesContainer />
                    </div>
                    <div className={`${styles.Middle}`}>

                    </div>
                    <div className={`${styles.RightSide}`}>
                        <ShapeDetailContainer />
                    </div>
                </div>
            </div>
        </>
    );
}
export default HomePage