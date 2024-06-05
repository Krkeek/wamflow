import {LinkInterface, ShapeInterface} from "./declarations";






export const ShapesData: ShapeInterface[] = [
    {
        id: 'securityRealm',
        name: "Security Realm",
        SVGUrl: "/assets/shapes/securityRealm.svg",
        code: `
<rect x="2.00506" y="1.87939" width="86.6955" height="86.6955" rx="13.4528" fill="white" stroke="black" stroke-width="2.9895"/>
<path d="M63.2898 1.50571L89.0742 25.048" stroke="black" stroke-width="2.9895"/>
        `
    },
    {
        id: 'application',
        name: "Application",
        SVGUrl: "/assets/shapes/application.svg",
    code: `
<svg width="87" height="88" viewBox="0 0 87 88" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.8785 2.24748H72.351C79.4928 2.24748 85.2823 8.03704 85.2823 15.1788V72.6513C85.2823 79.7931 79.4928 85.5827 72.351 85.5827H14.8785C7.73669 85.5827 1.94713 79.7931 1.94713 72.6513V15.1788C1.94713 8.03705 7.73668 2.24748 14.8785 2.24748Z" fill="white" stroke="black" stroke-width="2.87363"/>
</svg>

    `
    },
    {
        id: 'service',
        name: "Service",
        SVGUrl: "/assets/shapes/service.svg",
        code: `
  <svg width="86" height="78" viewBox="0 0 86 78" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M54.1521 8.43413L82.1492 56.9266C87.1265 65.5475 80.9049 76.3236 70.9504 76.3236H14.9561C5.0016 76.3236 -1.22 65.5475 3.75727 56.9266L31.7544 8.43415C36.7317 -0.186735 49.1748 -0.186749 54.1521 8.43413Z" fill="white" stroke="black" stroke-width="2.87363"/>
</svg>

        `
    },
    {
        id: 'identityProvider',
        name: "Identity Provider",
        SVGUrl: "/assets/shapes/identityProvider.svg",
        code: `
<svg width="76" height="77" viewBox="0 0 76 77" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M74.3946 65.3453V11.8404C74.3946 3.30662 64.0769 -0.967114 58.0426 5.06717L4.53775 58.5721C-1.49653 64.6063 2.77722 74.924 11.311 74.924H64.8158C70.106 74.924 74.3946 70.6355 74.3946 65.3453Z" fill="white" stroke="black" stroke-width="2.87363"/>
</svg>

        `
    },
    {
        id: 'processUnit',
        name: "Process Unit",
        SVGUrl: "/assets/shapes/processUnit.svg",
        code: `
<svg width="87" height="87" viewBox="0 0 87 87" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="43.6147" cy="43.7823" r="41.6676" fill="white" stroke="black" stroke-width="2.87363"/>
</svg>


        `
    },
    {
        id: 'databaseProvider',
        name: "Data Provider",
        SVGUrl: "/assets/shapes/databaseProvider.svg",
        code: `
 <svg width="77" height="88" viewBox="0 0 77 88" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M74.5476 74.7956C74.5476 75.9572 73.8791 77.2888 72.1596 78.7125C70.4501 80.1278 67.881 81.4735 64.5665 82.6342C57.9522 84.9504 48.7112 86.4124 38.4288 86.4124C28.1464 86.4124 18.9053 84.9504 12.291 82.6342C8.97658 81.4735 6.40748 80.1278 4.698 78.7125C2.9785 77.2888 2.30999 75.9572 2.30999 74.7956C2.30999 73.634 2.9785 72.3023 4.698 70.8787C6.40748 69.4633 8.97658 68.1177 12.291 66.957C18.9053 64.6407 28.1464 63.1787 38.4288 63.1787C48.7112 63.1787 57.9522 64.6407 64.5665 66.957C67.881 68.1177 70.4501 69.4633 72.1596 70.8787C73.8791 72.3023 74.5476 73.634 74.5476 74.7956Z" fill="white" stroke="black" stroke-width="3.17528"/>
<mask id="path-2-inside-1_129_16" fill="white">
<path d="M0.722351 13.0325H76.1352V75.2215H0.722351V13.0325Z"/>
</mask>
<path d="M0.722351 13.0325H76.1352V75.2215H0.722351V13.0325Z" fill="white"/>
<path d="M72.9599 13.0325V75.2215H79.3105V13.0325H72.9599ZM3.89763 75.2215V13.0325H-2.45293V75.2215H3.89763Z" fill="black" mask="url(#path-2-inside-1_129_16)"/>
<path d="M74.5476 13.8844C74.5476 15.046 73.8791 16.3776 72.1596 17.8013C70.4501 19.2166 67.881 20.5623 64.5665 21.723C57.9522 24.0392 48.7112 25.5013 38.4288 25.5013C28.1464 25.5013 18.9053 24.0392 12.291 21.723C8.97658 20.5623 6.40748 19.2166 4.698 17.8013C2.9785 16.3776 2.30999 15.046 2.30999 13.8844C2.30999 12.7228 2.9785 11.3911 4.698 9.96748C6.40748 8.55212 8.97658 7.2065 12.291 6.0458C18.9053 3.72952 28.1464 2.26751 38.4288 2.26751C48.7112 2.26751 57.9522 3.72952 64.5665 6.0458C67.881 7.2065 70.4501 8.55212 72.1596 9.96748C73.8791 11.3911 74.5476 12.7228 74.5476 13.8844Z" fill="white" stroke="black" stroke-width="3.17528"/>
</svg>


        `
    },
]

export const LinksData: LinkInterface[] = [
    {
        id: 'invocation',
        name: "Invocation",
        SVGUrl: "/assets/links/invocation.svg",
        code: ``
    },
    {
        id: 'trustRelationship',
        name: "Trust Relationship",
        SVGUrl: "/assets/links/trustRelationship.svg",
        code: ``
    },
    {
        id: 'legacyRelationship',
        name: "Legacy Relationship",
        SVGUrl: "/assets/links/legacyRelationship.svg",
        code: ``
    },

]