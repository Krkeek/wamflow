'use client'
import {createContext} from "react";
import {dia, shapes, util} from "@joint/core";
import {SecurityRealm} from "@/libs/joint/elements/SecurityRealm/SecurityRealm";
import {Application} from "@/libs/joint/elements/Application/Application";
import {Service} from "@/libs/joint/elements/Service/Service";
import {IdentityProvider} from "@/libs/joint/elements/IdentityProvider/IdentityProvider";
import {ProcessUnit} from "@/libs/joint/elements/ProcessUnit/ProcessUnit";
import {DatabaseProvider} from "@/libs/joint/elements/DatabaseProvider/DatabaseProvider";


const namespace = { shapes, SecurityRealm,  Application, Service, IdentityProvider, DatabaseProvider, ProcessUnit };
export const defaultGraph = new dia.Graph({},{cellNamespace: namespace});
export const GraphContext = createContext<any>(defaultGraph);
