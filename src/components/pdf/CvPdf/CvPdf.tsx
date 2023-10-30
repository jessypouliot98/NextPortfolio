import React from 'react';
import Pdf from '@react-pdf/renderer';
import { renderToString } from "react-dom/server";
import { createTw } from "react-pdf-tailwind";
import { documentToReactComponents, Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document, INLINES, MARKS } from "@contentful/rich-text-types";
import NodeHtmlParser from "node-html-parser";
import HTMLElement from "node-html-parser/dist/nodes/html";
import { CVPage } from "@/lib/contentful";

import { NextDate } from "@/utils/NextDate";

import { SkillIcon } from "@/components/parts/SkillIcon/SkillIcon";

import twConfig from "../../../../tailwind.config";

Pdf.Font.registerEmojiSource({
  format: 'png',
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
});

// Create styles
const tw = createTw(twConfig);

export type CvPdfProps = CVPage;

// Create Document Component
export function CvPdf(page: CvPdfProps) {
  return (
    <Pdf.Document>
      <Pdf.Page size="A4" style={tw("flex-row text-base leading-snug text-neutral-900")}>

        <Pdf.View style={tw("p-4 h-full flex-1")}>
          <Pdf.View style={tw("mb-6")}>
            <Pdf.Text style={tw("text-4xl font-bold leading-none text-blue-600 mb-2")}>{page.title}</Pdf.Text>
            <Pdf.Text style={tw("text-xl leading-none text-neutral-600")}>{page.subtitle}</Pdf.Text>
          </Pdf.View>
          <Pdf.View style={tw("mb-6")}>
            <PdfContentfulDisplay document={page.intro} />
          </Pdf.View>
          <Pdf.View>
            <Pdf.Text style={tw("font-bold text-2xl leading-snug text-neutral-700 border-b border-neutral-200 mb-4")}>Work experiences</Pdf.Text>
            <Pdf.View style={tw("gap-4")}>
             {page.jobs.map((job) => (
               <Pdf.View key={job.id}>
                 <Pdf.Text style={tw("text-sm text-neutral-500")}>{`${NextDate.getMonthYear(new Date(job.startDate ?? Date.now()))} - ${job.endDate ? NextDate.getMonthYear(new Date(job.endDate)) : "Present"}`}</Pdf.Text>
                 <Pdf.Text style={tw("font-bold text-xl leading-none text-blue-600")}>{`${job.title} at ${job.companyName}`}</Pdf.Text>
                 <Pdf.View style={tw("flex-row flex-wrap gap-2 mt-2")}>
                   {job.skills.map((skill) => (
                     <SvgMapper
                       key={skill.id}
                       currentColor={skill.color ?? "black"}
                       svg={<SkillIcon skill={skill.slug} />}
                       height={14}
                       width={14}
                     />
                   ))}
                 </Pdf.View>
                 <PdfContentfulDisplay
                   style={tw("text-base leading-snug mt-2 gap-2")}
                   document={job.content}
                   options={{
                     renderNode: {
                       [INLINES.HYPERLINK]: (node, children) => (
                         <Pdf.Text>{children}</Pdf.Text>
                       ),
                     },
                   }}
                 />
               </Pdf.View>
             ))}
            </Pdf.View>
          </Pdf.View>
        </Pdf.View>

        <Pdf.View style={tw("flex-col gap-6 p-4 h-full w-[2.8in] bg-blue-600 text-white")}>
          <PdfContentfulDisplay
            style={tw("text-white leading-snug")}
            document={page.contact}
            options={{
              renderNode: {
                [INLINES.HYPERLINK]: (node, children) => {
                  return (
                    <Pdf.Link style={tw("no-underline text-white")} src={node.data.uri}>
                      {children}
                    </Pdf.Link>
                  );
                },
                [BLOCKS.LIST_ITEM]: (node, children) => {
                  return (
                    <Pdf.View>
                      {children}
                    </Pdf.View>
                  );
                },
              },
            }}
          />
          <Pdf.View>
            <Pdf.Text style={tw("text-xl leading-snug font-bold border-b border-white mb-4")}>Education</Pdf.Text>
            <PdfContentfulDisplay
              style={tw("text-white leading-snug")}
              document={page.education}
              options={{
                renderNode: {
                  [BLOCKS.HEADING_2]: (node, children) => {
                    return (
                      <Pdf.Text style={tw("text-sm leading-snug")}>
                        {children}
                      </Pdf.Text>
                    );
                  },
                }
              }}
            />
          </Pdf.View>
          <Pdf.View>
            <Pdf.Text style={tw("text-xl leading-snug font-bold border-b border-white mb-4")}>Skills</Pdf.Text>
            <Pdf.View style={tw("flex-row flex-wrap -mx-1 -my-2")}>
              {page.skills.map((skill) => (
                <Pdf.View
                  key={skill.id}
                  style={tw("flex-row items-center w-1/2 px-1 py-2")}
                >
                  <SvgMapper
                    style={tw("mr-2")}
                    currentColor="white"
                    svg={<SkillIcon skill={skill.slug} />}
                    height={14}
                    width={14}
                  />
                  <Pdf.Text style={tw("text-sm leading-none")}>
                    {skill.name}
                  </Pdf.Text>
                </Pdf.View>
              ))}
            </Pdf.View>
          </Pdf.View>
        </Pdf.View>

      </Pdf.Page>
    </Pdf.Document>
  );
}

const SvgMapper = (
  { style, svg, currentColor, height, width }: {
    style?: Pdf.SVGProps["style"];
    svg: React.ReactElement;
    currentColor: string;
    height: number;
    width: number;
  }
) => {
  const html = renderToString(svg);
  const node = NodeHtmlParser.parse(html);

  type NhpNode = (typeof node.childNodes)[number];

  const mapSvgShape = (node: NhpNode, index = 0) => {
    if (node.nodeType === NodeHtmlParser.NodeType.COMMENT_NODE) {
      return null;
    }
    if (node.nodeType === NodeHtmlParser.NodeType.TEXT_NODE) {
      return node.rawText;
    }

    const el = node as HTMLElement;
    const shapes = el.childNodes.map(mapSvgShape);

    switch (el.rawTagName) {
      case null: {
        return (
          <React.Fragment key={index}>
            {shapes}
          </React.Fragment>
        );
      }
      case "svg": {
        return (
          <Pdf.Svg
            key={index}
            style={style}
            viewBox={el.attributes.viewBox}
            // No support for `1em`
            // height={el.attributes.height}
            // width={el.attributes.width}
            height={height}
            width={width}
          >
            <Pdf.G
              stroke={el.attributes.stroke === "currentColor" ? currentColor : el.attributes.stroke}
              fill={el.attributes.fill === "currentColor" ? currentColor : el.attributes.fill}
              strokeWidth={el.attributes["stroke-width"]}
            >
              {shapes}
            </Pdf.G>
          </Pdf.Svg>
        );
      }
      case "path": {
        return (
          <Pdf.Path key={index} d={el.attributes.d} />
        );
      }
      case "title": return null;
      default: {
        console.log(el);
        return null;
      }
    }
  };

  return mapSvgShape(node) as React.ReactElement;
};

type PdfContentfulDisplayProps = {
  style?: Pdf.ViewProps["style"];
  document: Document;
  options?: Options;
}

const defaultOptions: Options = {
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <Pdf.Link src={node.data.uri}>
          {children}
        </Pdf.Link>
      );
    },
    [BLOCKS.HEADING_1]: (node, children) => {
      return (
        <Pdf.Text style={tw("text-2xl leading-snug")}>
          {children}
        </Pdf.Text>
      );
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return (
        <Pdf.Text style={tw("text-xl leading-snug")}>
          {children}
        </Pdf.Text>
      );
    },
    [BLOCKS.HEADING_3]: (node, children) => {
      return (
        <Pdf.Text style={tw("text-lg leading-snug")}>
          {children}
        </Pdf.Text>
      );
    },
    [BLOCKS.HEADING_4]: (node, children) => {
      return (
        <Pdf.Text style={tw("text-base leading-snug")}>
          {children}
        </Pdf.Text>
      );
    },
    [BLOCKS.HEADING_5]: (node, children) => {
      return (
        <Pdf.Text style={tw("text-sm leading-snug")}>
          {children}
        </Pdf.Text>
      );
    },
    [BLOCKS.HEADING_6]: (node, children) => {
      return (
        <Pdf.Text style={tw("text-xs leading-snug")}>
          {children}
        </Pdf.Text>
      );
    },
    [BLOCKS.UL_LIST]: (node, children) => {
      return (
        <Pdf.View style={tw("gap-2")}>
          {children}
        </Pdf.View>
      );
    },
    [BLOCKS.OL_LIST]: (node, children) => {
      return (
        <Pdf.View style={tw("gap-2")}>
          {children}
        </Pdf.View>
      );
    },
    [BLOCKS.LIST_ITEM]: (node, children) => {
      return (
        <Pdf.View style={tw("flex-row")}>
          <Pdf.Text style={tw("text-blue-600")}>{"• "}</Pdf.Text>
          <Pdf.View style={tw("pr-4")}>
            {children}
          </Pdf.View>
        </Pdf.View>
      );
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return (
        <Pdf.Text>
          {children}
        </Pdf.Text>
      );
    },
  },
  renderMark: {
    [MARKS.ITALIC]: (text) => (
      <Pdf.Text style={tw("italic")}>{text}</Pdf.Text>
    ),
    [MARKS.BOLD]: (text) => (
      <Pdf.Text style={tw("font-bold")}>{text}</Pdf.Text>
    ),
  },
  renderText: (text) => (
    <Pdf.Text>{text}</Pdf.Text>
  ),
};

const PdfContentfulDisplay: React.FC<PdfContentfulDisplayProps> = ({ style, document: contentfulDocument, options }) => {
  return (
    <Pdf.View style={style}>
      {documentToReactComponents(contentfulDocument, {
        ...defaultOptions,
        ...options,
        renderNode: {
          ...defaultOptions.renderNode,
          ...options?.renderNode,
        }
      })}
    </Pdf.View>
  );
};