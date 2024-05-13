import styles from "./page.module.css";
import TopBar from "@/components/topBar/topBar";

export default function Home() {
  return (
    <>
        <div className={`${styles.GridContainer}`}>
            <div className={`${styles.TopbarContainer}`}>
                <TopBar />
            </div>
            <div className={`${styles.ContentContainer}`}>
                <div className={`${styles.LeftDiv}`}>
                    <div className={`${styles.Title}`}>
                        Revolutionize the way you design and implement <span className={`${styles.TitleSpan}`}>web-based applications</span>
                    </div>
                    <div className={`${styles.Description}`}>
                        Graphical notation that provides a UML-like notation that is specifically tailored to the needs of inter-organizational web-based applications. Empower your team, visualize, design, and collaborate effortlessly, bridging the gap between concept and implementation.
                    </div>
                </div>
                <div className={`${styles.RightDiv}`}>

                </div>
            </div>

        </div>

    </>
  );
}
