'use client'
import {
    Application,
    DatabaseProvider,
    IdentityProvider, ProcessUnit,
    SecurityRealm,
    Service
} from "@/libs/joint/GraphContext";

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

        // element?.addPorts(
        //     [
        //         { id: 'port1', group: 'in' },
        //         { id: 'port2', group: 'out' },
        //
        //     ]
        // )
    if (element){
        element.position(100,30);
        element.addTo(graph)
    }

}


