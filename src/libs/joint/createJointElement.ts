import { SecurityRealm } from "@/libs/joint/elements/SecurityRealm/SecurityRealm";
import { Application } from "@/libs/joint/elements/Application/Application";
import { Service } from "@/libs/joint/elements/Service/Service";
import { IdentityProvider } from "@/libs/joint/elements/IdentityProvider/IdentityProvider";
import { ProcessUnit } from "@/libs/joint/elements/ProcessUnit/ProcessUnit";
import { DatabaseProvider } from "@/libs/joint/elements/DatabaseProvider/DatabaseProvider";

export const createJointElement = (elementId: string, graph: any, x: number, y: number) => {
    let element;

    switch (elementId) {
        case "securityRealm":
            element = new SecurityRealm();
            break;
        case "application":
            element = new Application();
            break;
        case "service":
            element = new Service();
            break;
        case "identityProvider":
            element = new IdentityProvider();
            break;
        case "processUnit":
            element = new ProcessUnit();
            break;
        case "databaseProvider":
            element = new DatabaseProvider();
            break;
        default:
            return;
    }

    if (element) {
        const centerX = x - element.size().height / 2;
        const centerY = y - element.size().height / 2;

        element.position(centerX, centerY);
        element.addTo(graph);
    }
};