import { useMemo } from 'react';
import ContactUsSection from './ContactUsSection';
import Header from './Header';
import Section from './Section';
import Paragraphs from './Paragraphs';
import './pricing/Pricing.scss';

export default function App() {
  const aboutMeParagraphs = useMemo(
    () => [
      [
        'I am a software developer with almost a decade of experience in web development.',
        "In my entire career, I've worked on developing from scratch from simple landing-pages",
        'like this one to complex applications like e-commerces, business management projects, you name it.'
      ],
      [
        'I would be glad to work on your already existing project, or to create a solution for your business',
        'that would be developed specially for _your_ business. I am very flexible and I am willing to do all sorts',
        'of reasonable agreements to make sure I adapt our way of working to suit your needs.'
      ],
      [
        'Do not hesitate in contacting me any time either through WhatsApp or e-mail. You can find my contact information',
        'all over the place in this page.'
      ]
    ],
    []
  );
  const pricingParagraphs = useMemo(
    () => [
      [
        'A reasonable price of any service you pick is going to be presented with no cost at all,',
        'but only after we have fully understanding of what you are looking for. We will make sure you will',
        'get exactly what you are looking for.'
      ]
    ],
    []
  );
  const providedServicesParagraphs = useMemo(
    () => [
      [
        'We have a set of services we can provide for you or your business.',
        'These are valid for both existing applications or if you want to develop your application from scratch.'
      ],
      [
        'Keep in mind we develop applications with scalability in mind, so they are made for the future as well, to support millions of consecutive users.'
      ],
      ['Please see listed below:'],
      <ul key="serviceList">
        <li>Lead capture page creation from scratch</li>
        <li>Applications that deal with payment provider services</li>
        <li>
          Highly scalable real-time low-latency application development using
          WebSockets or raw TCP sockets when needed
        </li>
        <li>React Native application development (Android-only)</li>
        <li>Native desktop application development using modern Qt versions</li>
        <li>
          Scalable Zoom-like application development using modern WebRTC
          technologies
        </li>
        <li>Full source code and VCS history provided</li>
      </ul>,
      [
        'Any of the services you are interested is not listed? Please let us know.'
      ]
    ],
    []
  );
  const technologiesParagraphs = useMemo(
    () => [
      [
        'You can see below technologies we usually use to develop our applications:'
      ],
      <ul key="technologyList">
        <li>Node.js</li>
        <li>TypeScript</li>
        <li>JavaScript</li>
        <li>Next.js</li>
        <li>WebAssembly</li>
        <li>Qt</li>
        <li>Docker</li>
        <li>C or C++</li>
      </ul>
    ],
    []
  );
  return (
    <>
      <Header />
      <Section title="About">
        <Paragraphs>{aboutMeParagraphs}</Paragraphs>
      </Section>
      <Section title="Services">
        <Paragraphs>{providedServicesParagraphs}</Paragraphs>
      </Section>
      <Section
        title="Pricing"
        className="section-pricing text-white d-flex align-items-center"
      >
        <Paragraphs>{pricingParagraphs}</Paragraphs>
      </Section>
      <Section title="Technologies">
        <Paragraphs>{technologiesParagraphs}</Paragraphs>
      </Section>
      <Section title="Contact us">
        <ContactUsSection />
      </Section>
    </>
  );
}
