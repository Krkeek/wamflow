import styles from './savingStatus.module.css'
import Image from "next/image";
import {useContext} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setGraphSaved} from "@/libs/redux/features/graphSavedSlice";

interface Props {
    status: 'saved' | 'unsaved' | 'error'
}

const SavingStatus = (props:Props) => {
    const dispatch = useAppDispatch();
    const graph = useContext(GraphContext);
    const elementSelected = useAppSelector(state => state.elementSelected.value);
    const linkSelected = useAppSelector(state => state.linkSelected.value);


    const handleSaving = () => {
        if (props.status === 'unsaved') {
            if (document.cookie) {
                const token = document.cookie
                    .split('; ')
                    .find(row => row.startsWith('JWT='))
                    ?.split('=')[1];
                if (token) {
                    const graphExported = graph.toJSON();

                    fetch('/api/v1/graph', {
                        method: 'POST',
                        headers: {
                            "Content-Type" : "application/json",
                            "Access-Control-Allow-Origin" : "*",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({elementSelected: elementSelected, graph: graphExported, linkSelected: linkSelected })
                    })
                        .then(response => response.json())
                        .then(async () => {
                            console.log("Auto Saved");
                            dispatch(setGraphSaved('saved'))
                        })
                        .catch(error => {
                            dispatch(setGraphSaved('error'))
                            console.error('Error saving graph:', error)
                        });
                }
            }
        }
    }


    return (
        <>
            <div className={`${styles.Container}`}>
                <Image onClick={handleSaving} className={`${styles.Icon}`} src={`/assets/${props.status}.webp`} alt={'status'} width={30} height={30} />
            </div>
        </>
    )
}

export default SavingStatus