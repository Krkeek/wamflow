'use client'
import {SecurityRealm} from "@/libs/joint/elements/SecurityRealm/SecurityRealm";
import {Application} from "@/libs/joint/elements/Application/Application";
import {Service} from "@/libs/joint/elements/Service/Service";
import {IdentityProvider} from "@/libs/joint/elements/IdentityProvider/IdentityProvider";
import {ProcessUnit} from "@/libs/joint/elements/ProcessUnit/ProcessUnit";
import {DatabaseProvider} from "@/libs/joint/elements/DatabaseProvider/DatabaseProvider";

export const createJointElement = (elementId: string, graph: any) =>{
    let element;
    switch (elementId){
        case "securityRealm":
            element = new SecurityRealm()
            break;
        case "application":
            element = new Application()
            break;
        case "service":
            element = new Service()
            break;
        case "identityProvider":
            element = new IdentityProvider()
            break;
        case "processUnit":
            element = new ProcessUnit();
            break;
        case "databaseProvider":
            element = new DatabaseProvider()
            break;
    }

    if (element){
        element.position(100,30);
        element.addTo(graph)
    }


}


