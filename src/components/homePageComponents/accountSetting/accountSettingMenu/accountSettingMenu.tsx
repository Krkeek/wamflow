import styles from './accountSettingMenu.module.css'
import RoundButton from "@/components/homePageComponents/accountSetting/roundButton/roundButton";
import MenuElement from "@/components/homePageComponents/accountSetting/accountSettingMenu/menuElement/menuElement";
import {logoutUser} from "@/utils/logoutUser";
const AccountSettingMenu = () => {
    return (

        <>
            <div className={styles.Container}>
                <div className={styles.UserInfo}>
                    <RoundButton extended={false} backgroundColor={'var(--secondary-color)'} content={'AH'} width={'2.7rem'} fontSize={'0.9rem'} />
                    <div className={`${styles.UserName}`}>
                        Ahmad Hijazi
                    </div>
                </div>
                <div className={styles.MenuContent}>
                    <MenuElement title={'My Elements'} url={'/assets/settingsMenu/createElements.webp'} />
                    <MenuElement title={'Settings'} url={'/assets/settingsMenu/settings.webp'} />
                    <MenuElement title={'Help & Support'} url={'/assets/settingsMenu/help.webp'} />
                    <MenuElement onClickEvent={logoutUser} title={'Logout'} url={'/assets/settingsMenu/logout.webp'} />

                </div>

            </div>

        </>
    )
}

export default AccountSettingMenu