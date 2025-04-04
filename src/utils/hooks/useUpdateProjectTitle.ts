import {useContext, useEffect} from 'react';
import {GraphContext} from "@/libs/joint/GraphContext";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {setProjectInfo} from "@/libs/redux/features/projectInfoSlice";

const useUpdateProjectTitle = () => {
    const dispatch = useAppDispatch()
    const graph = useContext(GraphContext);
    const projectName = useAppSelector(state => state.projectInfo.name)

    useEffect(() => {
        graph.set('projectTitle', projectName);
    }, [projectName, graph]);

    useEffect(() => {
        const projectTitle = graph.get('projectTitle');
        dispatch(setProjectInfo(projectTitle))
    }, []);
};

export default useUpdateProjectTitle;