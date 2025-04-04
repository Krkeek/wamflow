import {useContext, useEffect} from "react";
import {GraphContext} from "@/libs/joint/GraphContext";
import {useAppDispatch} from "@/libs/redux/hooks";
import {setElementSelected} from "@/libs/redux/features/elementSelectedSlice";
import {setProjectInfo} from "@/libs/redux/features/projectInfoSlice";
import {setLinkSelected} from "@/libs/redux/features/linkSelectedSlice";

const useAutoLoad = () => {
    const dispatch = useAppDispatch();
    const graph = useContext(GraphContext);
    useEffect(() => {
        if (document.cookie) {
            const token = document.cookie
                .split('; ')
                .find(row => row.startsWith('JWT='))
                ?.split('=')[1];
            if (token) {
                fetch('/api/v1/graph', {
                    method: 'GET',
                    headers: {
                        "Content-Type" : "application/json",
                        "Access-Control-Allow-Origin" : "*",
                        "Authorization": `Bearer ${token}`,
                    },
                })
                    .then(response => response.json())
                    .then(async res => {
                        if (res.data) {
                            graph.fromJSON(res.data.graph);
                            dispatch(setElementSelected(res.data.elementSelected));
                            dispatch(setLinkSelected(res.data.linkSelected));
                            dispatch(setProjectInfo(graph.get('projectTitle')))

                        }
                    })
                    .catch(error => console.error('Error loading graph:', error));
            }
        }
    },[])
}
export default useAutoLoad