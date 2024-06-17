import {gsap} from "gsap";
export const HomePageAnimation = () =>{

    const tl  = gsap.timeline()
        .to('.ContainerAnimation',{opacity:1, duration: 1})
    tl.play()


}