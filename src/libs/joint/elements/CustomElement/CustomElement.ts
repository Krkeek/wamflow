import { dia, util } from '@joint/core';
import {ports} from "@/libs/joint/elements/CustomElement/ports";

export class CustomElement extends dia.Element {
    preinitialize() {
        this.markup = util.svg/* xml */`
            <g @selector="svg"/>
        `;
    }

    defaults() {
        return {
            ...super.defaults,
            type: 'custom.SvgNode',
            size: { width: 70, height: 70 },
            customData: {
                title: '',
                name: '',
                uri: '',
                showName: true,
                showUri: false,
            },
            ports: ports,
            properties: [],
            attrs: {
                root: { cursor: 'move' },
                svg: {
                    html: '',
                }
            }
        };
    }
}