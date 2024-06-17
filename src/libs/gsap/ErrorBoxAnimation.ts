import {gsap} from "gsap";


export const ErrorBoxAnimation = () =>{
        const tl = gsap.timeline()
            .to('.BoxAnimation',{duration: 0.6, top: '5%'})
            .to('.BoxAnimation',{duration: 0.6, top: '-20%'}, '=+2');
        tl.play()

}