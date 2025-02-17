import styles from './paperSettings.module.css'
import ControlButton from "@/components/homePageComponents/paperSettings/controlButton/controlButton";

const PaperSettings = () => {



    return (
        <>
            <div className={`${styles.Container}`}>
                <div className={`${styles.Header}`}>Control Center</div>
                <div className={`${styles.Expandable}`}>
                    <div className={`${styles.Column}`}>
                        Move
                        <ControlButton transform={"rotate(-90deg)"} margin={"0 0 0 1rem"} imgUrl={'/assets/arrow.png'} />
                        <ControlButton imgUrl={'/assets/arrow.png'}/>
                        <ControlButton transform={"rotate(180deg)"} imgUrl={'/assets/arrow.png'}/>
                        <ControlButton transform={"rotate(90deg)"} imgUrl={'/assets/arrow.png'}/>


                    </div>
                    <div className={`${styles.Column}`}>Scale
                        <ControlButton  margin={"0 0 0 1rem"}  value={'+'}/>
                        <ControlButton alignItems={"flex-start"}  value={'_'}/>
                    </div>
                </div>


            </div>

        </>
    )
}

export default PaperSettings;