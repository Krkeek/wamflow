'use client'
import {dia, shapes, util} from '@joint/core';
import {getShapeById} from "@/libs/getShapeById";

 const SECURITY_REALM = 'securityRealm';
 const APPLICATION = 'application';
 const SERVICE = 'service';
 const IDENTITY_PROVIDER = 'identityProvider';
 const PROCESS_UNIT = 'processUnit';
 const DATABASE_PROVIDER = 'databaseProvider';





export const securityRealm = dia.Element.define(SECURITY_REALM,{
            size: {width: 100, height: 100},
            attrs: {
                body: {
                    width: 'calc(w)',
                    height: 'calc(h)'
                }
            },
            markup: util.svg `
            ${getShapeById(SECURITY_REALM)?.code}
            `
})


export const application = dia.Element.define(APPLICATION,{
    size: {width: 100, height: 100},
    attrs: {
        body: {
            width: 'calc(w)',
            height: 'calc(h)'
        }
    },
    markup: util.svg `
            ${getShapeById(APPLICATION)?.code}
            `
})

export const service = dia.Element.define(SERVICE,{
    size: {width: 100, height: 100},
    attrs: {
        body: {
            width: 'calc(w)',
            height: 'calc(h)'
        }
    },
    markup: util.svg `
            ${getShapeById(SERVICE)?.code}
            `
})

export const identityProvider = dia.Element.define(IDENTITY_PROVIDER,{
    size: {width: 100, height: 100},
    attrs: {
        body: {
            width: 'calc(w)',
            height: 'calc(h)'
        }
    },
    markup: util.svg `
            ${getShapeById(IDENTITY_PROVIDER)?.code}
            `
})

export const processUnit = dia.Element.define(PROCESS_UNIT,{
    size: {width: 100, height: 100},
    attrs: {
        body: {
            width: 'calc(w)',
            height: 'calc(h)'
        }
    },
    markup: util.svg `
            ${getShapeById(PROCESS_UNIT)?.code}
            `
})

export const databaseProvider = dia.Element.define(DATABASE_PROVIDER,{
    size: {width: 100, height: 100},
    attrs: {
        body: {
            width: 'calc(w)',
            height: 'calc(h)'
        }
    },
    markup: util.svg `
            ${getShapeById(DATABASE_PROVIDER)?.code}
            `
})

Object.assign(shapes, {
    myNamespace: {
        securityRealm,
        application,
        service,
        identityProvider,
        processUnit,
        databaseProvider
    }
});

