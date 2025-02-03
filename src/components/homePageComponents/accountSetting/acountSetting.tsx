import styles from './accountSetting.module.css'
import RoundButton from "@/components/infrastructure/roundButton/roundButton";
import {useState} from "react";
import ModalDialog from "@/components/infrastructure/modalDialog/modalDialog";

const AccountSetting = () => {

    const [accountMenuOpened, setAccountMenuOpened] = useState(false);

    const openAccountMenu = () =>  {
        setAccountMenuOpened(!accountMenuOpened);
    }

    return(
        <>
            <div onClick={openAccountMenu} className={styles.Container}>
                <RoundButton extended={true} backgroundColor={'var(--secondary-color)'} content={'AH'} width={'3.2rem'} />
                {accountMenuOpened && (
                    <div className={styles.AccountMenuDiv}>
                        <ModalDialog title={'Ahmad Hijazi'} menuElement={[
                            {
                                title: "Create Element",
                                url:'/assets/settingsMenu/createElements.webp'

                            },
                            {
                                title: "Settings",
                                url:'/assets/settingsMenu/settings.webp'
                            },
                            {
                                title: "Help & Support",
                                url:'/assets/settingsMenu/help.webp'
                            },
                            {
                                title: "Logout",
                                url:'/assets/settingsMenu/logout.webp'
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
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default AccountSetting;