import {gsap} from "gsap";
export const LandingPageAnimation = () =>{

    const tl  = gsap.timeline()
        .to('.bgAnimation',{opacity: 1, duration: 1})
    tl.play()


}