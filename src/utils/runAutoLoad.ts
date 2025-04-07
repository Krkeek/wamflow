import {setElementSelected} from "@/libs/redux/features/elementSelectedSlice";
import {setProjectInfo} from "@/libs/redux/features/projectInfoSlice";
import {setLinkSelected} from "@/libs/redux/features/linkSelectedSlice";
import {dia} from "@joint/core";

export const runAutoLoad = async (dispatch: any, graph: dia.Graph): Promise<{ shouldConfirm: boolean, res?: any }> => {
    if (!document.cookie) return {shouldConfirm: false};

    const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('JWT='))
        ?.split('=')[1];

    if (!token) return {shouldConfirm: false};

    try {
        const response = await fetch('/api/v1/graph', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`,
            },
        });

        const res = await response.json();

        if (res.data) {
            if (graph.getCells().length === 0) {
                graph.fromJSON(res.data.graph);
                dispatch(setElementSelected(res.data.elementSelected));
                dispatch(setLinkSelected(res.data.linkSelected));
                dispatch(setProjectInfo(graph.get('projectTitle')));
                return {shouldConfirm: false}
            } else {
                return {shouldConfirm: true, res: res}
            }
        }
    } catch (error) {
        console.error('Error loading graph:', error);
    }

    return {shouldConfirm: false}
};