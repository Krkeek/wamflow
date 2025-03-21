import { useEffect, useState } from "react";
import { dia, shapes } from "@joint/core";
import { defaultGraph } from "@/libs/joint/GraphContext";
import { Invocation } from "@/libs/joint/links/Invocation/Invocation";

const usePaper = () => {
    const [paper, setPaper] = useState<dia.Paper | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const newPaper = new dia.Paper({
            model: defaultGraph,
            width: "100vw",
            height: "200vh",
            gridSize: 1,
            cellViewNamespace: shapes,
            background: { color: "#E9ECEF" },
            defaultLink: new Invocation(),
            linkPinning: false,
            defaultConnectionPoint: { name: "boundary" },
            interactive: function (cellView) {
                if (cellView.model.prop("locked")) {
                    return {
                        elementMove: false,
                        linkMove: false,
                        labelMove: true,
                    };
                }
                return true;
            },
            restrictTranslate: true,
            embeddingMode: true,
            validateEmbedding: (childView, parentView) => {
                const parentModel = parentView.model;
                return parentModel.get("type") === "SecurityRealm";
            },
            highlighting: {
                default: {
                    name: "stroke",
                    options: {
                        padding: 2,
                    },
                },
                connecting: {
                    name: "addClass",
                    options: {
                        className: "highlight-connecting",
                    },
                },
                embedding: false, // Disable highlighter for embedding
            },
            validateConnection: function (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                return cellViewS !== cellViewT; // Prevent linking from a port to itself
            },
        });
        setPaper(newPaper);
    }, []);
      return paper;
};

export default usePaper;