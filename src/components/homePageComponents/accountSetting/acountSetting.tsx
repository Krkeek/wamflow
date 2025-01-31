import styles from './accountSetting.module.css'
import RoundButton from "@/components/homePageComponents/accountSetting/roundButton/roundButton";
import {useState} from "react";
import AccountSettingMenu from "@/components/homePageComponents/accountSetting/accountSettingMenu/accountSettingMenu";

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
                        <AccountSettingMenu />
                    </div>
                )}
            </div>
        </>
    )
}

export default AccountSetting;