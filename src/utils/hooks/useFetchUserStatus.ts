import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserStatus } from '@/libs/redux/features/userStatusSlice';
import {IGetUserStatus} from "../../../declarations";
import {getUserStatus} from "@/utils/getUserStatus";

const useFetchUserStatus = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const userStatus:IGetUserStatus = getUserStatus();
        dispatch(setUserStatus(userStatus));
    }, []);
};

export default useFetchUserStatus;