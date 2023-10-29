import React, { useRef } from 'react';
import Pdf from '@react-pdf/renderer';
import { renderToString } from "react-dom/server";
import { SiTypescript } from "react-icons/si";
import { createTw } from "react-pdf-tailwind";
import NodeHtmlParser from "node-html-parser";
import HTMLElement from "node-html-parser/dist/nodes/html";
import { Job, Skill } from "@/lib/contentful";

import { NextDate } from "@/utils/NextDate";

import { SkillIcon } from "@/components/parts/SkillIcon/SkillIcon";

import twConfig from "../../../../tailwind.config";

Pdf.Font.registerEmojiSource({
  format: 'png',
  url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
});

// Create styles
const tw = createTw(twConfig);

export type CvPdfProps = {
  title: string;
  subtitle: string;
  intro: string;
  contacts: Array<{ label: string; url: string }>;
  jobs: Job[];
  skills: Skill[];
}

// Create Document Component
export function CvPdf({ title, subtitle, intro, contacts, jobs, skills }: CvPdfProps) {
  return (
    <Pdf.Document>
      <Pdf.Page size="A4" style={tw("flex-row text-base leading-snug text-neutral-900")}>

        <Pdf.View style={tw("p-4 h-full flex-1")}>
          <Pdf.View style={tw("mb-6")}>
            <Pdf.Text style={tw("text-4xl font-bold leading-none text-blue-600 mb-2")}>{title}</Pdf.Text>
            <Pdf.Text style={tw("text-xl leading-none text-neutral-400")}>{subtitle}</Pdf.Text>
          </Pdf.View>
          <Pdf.View style={tw("mb-6")}>
            <Pdf.Text>{intro}</Pdf.Text>
          </Pdf.View>
          <Pdf.View>
            <Pdf.Text style={tw("font-bold text-2xl leading-none mb-4 text-neutral-700")}>Work experiences</Pdf.Text>
            <Pdf.View style={tw("gap-4")}>
             {jobs.map((job) => (
               <Pdf.View key={job.id}>
                 <Pdf.Text style={tw("text-sm text-neutral-500")}>{`${NextDate.getMonthYear(new Date(job.startDate ?? Date.now()))} - ${job.endDate ? NextDate.getMonthYear(new Date(job.endDate)) : "Present"}`}</Pdf.Text>
                 <Pdf.Text style={tw("font-bold text-xl leading-none text-blue-600")}>{`${job.title} at ${job.companyName}`}</Pdf.Text>
                 <Pdf.View style={tw("flex-row flex-wrap gap-2 mt-1.5")}>
                   {job.skills.map((skill) => (
                     <SvgMapper
                       key={skill.id}
                       currentColor={skill.color ?? "black"}
                       svg={<SkillIcon skill={skill.slug} />}
                       height={12}
                       width={12}
                     />
                   ))}
                 </Pdf.View>
               </Pdf.View>
             ))}
            </Pdf.View>
          </Pdf.View>
        </Pdf.View>

        <Pdf.View style={tw("p-4 h-full w-[2.6in] bg-blue-600 text-white")}>
          <Pdf.View>
            {contacts.map((contact) => (
              <Pdf.View key={contact.url}>
                <Pdf.Link
                  style={tw("no-underline text-white flex-row")}
                  src={contact.url}
                >
                  <Pdf.Text>{"> "}</Pdf.Text>
                  <Pdf.Text>{contact.label}</Pdf.Text>
                </Pdf.Link>
              </Pdf.View>
            ))}
          </Pdf.View>
          <Pdf.View style={tw("mt-1.5")}>
            <Pdf.View style={tw("flex-row flex-wrap -mx-1 -my-2")}>
              {skills.map((skill) => (
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