import DiagramHeader from "@/components/homePageComponents/diagramHeader/diagramHeader";
import styles from './homePage.module.css'
import OptionsBar from "@/components/homePageComponents/optionsBar/optionsBar";
import ShapesContainer from "@/components/homePageComponents/shapesContainer/shapesContainer";
const HomePage = () =>{
    return(
        <>
            <div className={`${styles.Container}`}>
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

                    </div>
                </div>
            </div>
        </>
    );
}
export default HomePage