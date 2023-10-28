import React from 'react';
import Pdf from '@react-pdf/renderer';
import { createTw } from "react-pdf-tailwind";
import { Job, Skill } from "@/lib/contentful";

import { NextDate } from "@/utils/NextDate";

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

        <Pdf.View style={tw("p-4 h-full w-[2.5in] bg-blue-600 text-white")}>
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
          <Pdf.View style={tw("flex-row flex-wrap gap-1 mt-1.5")}>
            {skills.map((skill) => (
              <Pdf.View
                key={skill.id}
                style={{
                  backgroundColor: skill.color ?? tw("bg-neutral-900").backgroundColor,
                  ...tw("text-sm leading-none rounded text-white px-1 py-0.5"),
                }}
              >
                <Pdf.Text textAnchor="middle">
                  {skill.name}
                </Pdf.Text>
              </Pdf.View>
            ))}
          </Pdf.View>
        </Pdf.View>

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
                 <Pdf.View style={tw("flex-row flex-wrap gap-1 mt-1.5")}>
                   {job.skills.map((skill) => (
                     <Pdf.View
                       key={skill.id}
                       style={{
                         backgroundColor: skill.color ?? tw("bg-neutral-900").backgroundColor,
                         ...tw("text-sm leading-none rounded text-white px-1 py-0.5"),
                       }}
                     >
                       <Pdf.Text textAnchor="middle">
                         {skill.name}
                       </Pdf.Text>
                     </Pdf.View>
                   ))}
                 </Pdf.View>
               </Pdf.View>
             ))}
            </Pdf.View>
          </Pdf.View>
        </Pdf.View>

      </Pdf.Page>
    </Pdf.Document>
  );
}