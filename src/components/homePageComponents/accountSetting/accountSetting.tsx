import styles from './accountSetting.module.css'
import RoundButton from "@/components/infrastructure/roundButton/roundButton";
import { useEffect, useState} from "react";
import ModalDialog from "@/components/infrastructure/modalDialog/modalDialog";
import {logoutUser} from "@/utils/logoutUser";
import {getUserStatus} from "@/utils/getUserStatus";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";
import {getInitials} from "@/utils/getInitials";
import {setUserStatus} from "@/libs/redux/features/userStatusSlice";
import {setNotificationBox} from "@/libs/redux/features/notificationBoxSlice";
import {setIsLoading} from "@/libs/redux/features/loadingSlice";

interface IProps {
    setOpenRegisterDialog: (state: boolean) => void;
}

const AccountSetting = (props: IProps) => {

    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useAppDispatch()

    const userStatus = useAppSelector(state => state.userStatus)
    const [initials, setInitials] = useState<string>();


    useEffect(() => {
        if (userStatus.userInfo){
          const initials = getInitials(userStatus.userInfo.accountDetails.name);
            setInitials(initials)
        }
    },[userStatus])

    const toggleDialog = (state?: boolean) => {
        if (state !== undefined) {
            setOpenDialog(state);
        } else {
            setOpenDialog(prevState => !prevState);
        }
    };


    const handleLogout = async () => {
        dispatch(setIsLoading(true))
        const result: boolean =  await logoutUser();
        if (result) {
            dispatch(setUserStatus(getUserStatus()));
            dispatch(setNotificationBox({message:`You have been logged out`}));
        }
        else {
            dispatch(setNotificationBox({message:`Something went wrong while logging out`, isWarning: true}));
        }
        dispatch(setIsLoading(false))

    }

    return(
        <>
            {
                !userStatus.isLoggedIn ? (
                    <>
                        <div onClick={() => props.setOpenRegisterDialog(true)} className={styles.Container}>
                            <RoundButton extended={false} backgroundColor={'var(--secondary-color)'} isIcon={{
                                enabled: true,
                                url: "/assets/accountIcon.webp",
                                width: "2.1rem"
                            }}
                                         width={'3.2rem'}/>
                        </div>
                        </>
                        ): (
                        <>
                            <div onClick={() => toggleDialog()} className={styles.Container}>
                                <RoundButton extended={true} backgroundColor={'var(--secondary-color)'} content={initials}
                                             width={'3.2rem'}/>
                                {openDialog && (
                                    <div className={styles.AccountMenuDiv}>
                                        <ModalDialog title={userStatus.userInfo ? userStatus.userInfo.accountDetails.name : "null"} menuElement={[
                                            {
                                                title: "Create Element",
                                                url: '/assets/settingsMenu/createElements.webp'

                                            },
                                            {
                                                title: "Settings",
                                                url: '/assets/settingsMenu/settings.webp'
                                            },
                                            {
                                                title: "Help & Support",
                                                url: '/assets/settingsMenu/help.webp'
                                            },
                                            {
                                                title: "Logout",
                                                url: '/assets/settingsMenu/logout.webp',
                                                onClickEvent: handleLogout
                                            },


                                        ]}
                                                     titleIcon={{
                                                         enabled: true,
                                                         extended: false,
                                                         backgroundColor: 'var(--secondary-color)',
                                                         content: 'AH',
                                                         width: '2.7rem',
                                                         fontSize: '0.9rem',
                                                     }}
                                                     closeDialog={() => toggleDialog(false)}/>
                                    </div>
                                )}
                            </div>
                        </>
                        )
                        }

                    </>
                )
            }

            export default AccountSetting;