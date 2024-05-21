'use client'
import {dia, shapes} from '@joint/core'
import {application, securityRealm, processUnit, service, identityProvider, databaseProvider} from "@/libs/joint/shapes";

const graph = new dia.Graph({},{cellNamespace: {shapes, securityRealm, application, processUnit, service, identityProvider, databaseProvider}});


export const startJoint = (divElement: HTMLDivElement) =>{
    const paper = new dia.Paper({
        el: divElement,
        model: graph,
        width: 1000,
        height: 630,
        gridSize: 1,
        cellViewNamespace: shapes, securityRealm, application,processUnit, service, identityProvider, databaseProvider,
         drawGrid: {name: "mesh", args: {color: 'rgba(0, 0, 0, 0.4)'}},
         drawGridSize: 100,

    })
}


export const createJointElement = (elementId: string) =>{

    const SECURITY_REALM = 'securityRealm';
    const APPLICATION = 'application';
    const SERVICE = 'service';
    const IDENTITY_PROVIDER = 'identityProvider';
    const PROCESS_UNIT = 'processUnit';
    const DATABASE_PROVIDER = 'databaseProvider';



    console.log(elementId);

    let element;
    switch (elementId){
        case SECURITY_REALM:
            element = new securityRealm();
            break;
        case APPLICATION:
            element = new application();
            break;
        case SERVICE:
            element = new service();
            break;
        case DATABASE_PROVIDER:
            element = new databaseProvider();
            break;
        case IDENTITY_PROVIDER:
            element = new identityProvider();
            break;
        case PROCESS_UNIT:
            element = new processUnit();
            break;
        default:


    }
    if (element){
        element.position(100,30);
        element.resize(500,500);

        element.addTo(graph)
    }

}



