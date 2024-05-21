import styles from './linkDetailContainer.module.css'
import {useAppSelector} from "@/libs/redux/hooks";
import {useContext} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
const LinkDetailContainer = () => {
    const graph = useContext(GraphContext);
    const linkSelected = useAppSelector(state => state.linkSelected.value);
    let linkCellView = graph.getCell(linkSelected);

    const handleSaveData = () => {

    }

    const handleDiscardChanges = () => {

    }

    return (
        <>
            <div className={`${styles.Container}`}>
                <button onClick={handleSaveData}
                        className={`${styles.SaveButton}`}>Save
                </button>
                <button onClick={() => handleDiscardChanges()} style={{backgroundColor: "var(--danger-color)"}}
                        className={`${styles.SaveButton}`}>Discard Changes
                </button>
            </div>
        </>
    )
}
export default LinkDetailContainer