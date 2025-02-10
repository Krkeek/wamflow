import styles from './accountSetting.module.css'
import RoundButton from "@/components/infrastructure/roundButton/roundButton";
import {use, useState} from "react";
import ModalDialog from "@/components/infrastructure/modalDialog/modalDialog";
import {logoutUser} from "@/utils/logoutUser";
import {getUserStatus} from "@/utils/getUserStatus";
import {useAppDispatch, useAppSelector} from "@/libs/redux/hooks";

interface IProps {
    setOpenRegisterDialog: (state: boolean) => void;
}

const AccountSetting = (props: IProps) => {

    const [openDialog, setOpenDialog] = useState(false);

    const userStatus = useAppSelector(state => state.userStatus)

    const toggleDialog = (state?: boolean) => {
        if (state !== undefined) {
            setOpenDialog(state);
        } else {
            setOpenDialog(prevState => !prevState);
        }
    };


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
                                <RoundButton extended={true} backgroundColor={'var(--secondary-color)'} content={'AH'}
                                             width={'3.2rem'}/>
                                {openDialog && (
                                    <div className={styles.AccountMenuDiv}>
                                        <ModalDialog title={'Ahmad Hijazi'} menuElement={[
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
                                                onClickEvent: logoutUser
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