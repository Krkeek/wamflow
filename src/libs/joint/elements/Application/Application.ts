import {dia, util} from "@joint/core";
import {ports} from "@/libs/joint/elements/Application/ports";

export const Application = dia.Element.define("Application", {
        size: { width: 70, height: 70 },
        customData: {
            title: 'Application',
            name: '',
            uri: '',
            showName: true,
            showUri: false,
        },
        properties: [
            {
                name: "Theme",
                value: "dark",
                type: "string",
                active: true,
            },
            {
                name: "MaxUsers",
                value: 1000,
                type: "number",
                active: true,
            },
            {
                name: "EnableLogging",
                value: false,
                type: "boolean",
                active: true,
            },
            {
                name: "Timeout",
                value: 30,
                type: "number",
                active: true,
            },
            {
                name: "API_URL",
                value: "//api.example.com",
                type: "string",
                active: true,
            },
            {
                name: "DebugMode",
                value: false,
                type: "boolean",
                active: true,
            },
            {
                name: "DatabaseHost",
                value: "db.example.com",
                type: "string",
                active: true,
            },
            {
                name: "CacheEnabled",
                value: true,
                type: "boolean",
                active: true,
            },
            {
                name: "Port",
                value: 8080,
                type: "number",
                active: true,
            },
            {
                name: "LogLevel",
                value: "info",
                type: "string",
                active: true,
            },
            {
                name: "MaxConnections",
                value: 500,
                type: "number",
                active: true,
            },
            {
                name: "UseSSL",
                value: true,
                type: "boolean",
                active: true,
            },
            {
                name: "APIVersion",
                value: "v2",
                type: "string",
                active: true,
            },
            {
                name: "EnableCache",
                value: true,
                type: "boolean",
                active: true,
            },
            {
                name: "Region",
                value: "US-West",
                type: "string",
                active: true,
            },
            {
                name: "EnableCompression",
                value: false,
                type: "boolean",
                active: true,
            },
            {
                name: "RetentionPeriod",
                value: 90,
                type: "number",
                active: true,
            },
            {
                name: "ProxyEnabled",
                value: false,
                type: "boolean",
                active: true,
            },
            {
                name: "BackupEnabled",
                value: true,
                type: "boolean",
                active: true,
            },
            {
                name: "MaintenanceMode",
                value: false,
                type: "boolean",
                active: true,
            },
            {
                name: "RegionAvailability",
                value: "US-West, EU-North",
                type: "string",
                active: true,
            }
        ],
        attrs: {
            path: {
                refDResetOffset:  `M1.94713 15.1788C1.94713 8.03705 7.73668 2.24748 14.8785 2.24748H72.351C79.4928 2.24748 85.2823 8.03704 85.2823 15.1788V72.6513C85.2823 79.7931 79.4928 85.5827 72.351 85.5827H14.8785C7.73669 85.5827 1.94713 79.7931 1.94713 72.6513V15.1788Z`,
                strokeWidth: 2.2,
                stroke: 'black',
                fill: '#E9ECEF',
                cursor: 'move'

            },
            label: {
                title:'',
                textVerticalAnchor: 'middle',
                textAnchor: 'middle',
                x: 'calc(0.5*w)',
                y: 'calc(0.5*h)',
                fontSize: 12,
                fill: '#333333'
            },
            label2: {
                text: '',
                textVerticalAnchor: 'top',
                textAnchor: 'middle',
                fontSize: 12,
                fill: '#333333',
                refX: "50%",
                refDy: 5

            },

        },
        ports: ports
    },
    {
        markup: [{
            tagName: 'path',
            selector: 'path',
        }, {
            tagName: 'text',
            selector: 'label'
        },
            {
                tagName: 'text',
                selector: 'label2'
            },
        ],
        initialize: function() {
            // @ts-ignore
            dia.Element.prototype.initialize.apply(this, arguments);
            this.updateLabel();

            this.on('change:customData/name', this.updateLabel.bind(this));
            this.on('change:attrs', this.updateLabel.bind(this));

        },
        updateLabel: function() {
            const name = this.prop('customData/name');
            const labelWidth = this.size().width - 10; // Adjust the width based on element size

            // Break the text to fit inside the element
            const wrappedText = util.breakText(name, { width: labelWidth });

            // Apply the wrapped text to the label
            this.attr('label/text', wrappedText);
            this.attr('label2/text', this.prop('customData/uri'));
        }
    }
);

