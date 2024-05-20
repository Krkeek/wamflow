import styles from './shapesContainer.module.css'
import {ShapesData} from "../../../../dataEntry";
import Shape from "@/components/homePageComponents/shape/shape";

const ShapesContainer = () =>{
    return(
        <>
            <div className={`${styles.Container}`}>
                {
                ShapesData.map((shape)=>(
                    <>
                    <Shape shape={shape} />
                    </>
                ))
                }
            </div>
        </>
    )
}
export default ShapesContainer