'use client'
import {createContext} from "react";
import {dia, shapes} from "@joint/core";
import {SecurityRealm} from "@/libs/joint/elements/SecurityRealm/SecurityRealm";
import {Application} from "@/libs/joint/elements/Application/Application";
import {Service} from "@/libs/joint/elements/Service/Service";
import {IdentityProvider} from "@/libs/joint/elements/IdentityProvider/IdentityProvider";
import {ProcessUnit} from "@/libs/joint/elements/ProcessUnit/ProcessUnit";
import {DatabaseProvider} from "@/libs/joint/elements/DatabaseProvider/DatabaseProvider";
import {Invocation} from "@/libs/joint/links/Invocation/Invocation";
import {LegacyRelationship} from "@/libs/joint/links/LegacyRelationship/LegacyRelationship";
import {TrustRelationship} from "@/libs/joint/links/TrustRelationship/TrustRelationship";


export const namespace = {...shapes, SecurityRealm,  Application, Service, IdentityProvider, ProcessUnit, DatabaseProvider, Invocation, LegacyRelationship, TrustRelationship };
export const defaultGraph = new dia.Graph({
    projectTitle: 'Untitled'
},{cellNamespace: namespace});
export const GraphContext = createContext<dia.Graph>(defaultGraph);
