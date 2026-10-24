import { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

// Simple "coming soon" pages that share the landing page header and footer.
export const pages = {
  docs: {
    title: 'Documentation',
    eyebrow: 'Docs',
    text: 'Feel free to leave us a message if you have any queries regarding our Documentation.',
    heading: 'Coming Soon',
  },
  'api-status': {
    title: 'API',
    eyebrow: 'API',
    text: 'Feel free to leave us a message if you have any queries regarding our API services.',
    heading: 'Coming Soon',
  },
  terms: {
    title: 'Terms & Conditions',
    eyebrow: 'Terms',
    text: 'Feel free to leave us a message if you have any queries regarding our terms & conditions.',
    heading: 'Disclaimer:',
    paragraphs: [
      'By using industrialpmr.com (\'Site\') or it\'s services you agree to these terms and conditions of the site.(In these terms, "we", or "us" refers to industrialpmr and "you", and "your" refers to the user/viewer of the website.)',
      'Our website may contain errors, inaccuracies, or outdated information. Here at industrialpmr, We try our best to ensure the quality and accuracy of our product and services. However, industrialpmr assumes no responsibility for the accuracy of the data shown on our website.',
      'All logos, trademarks, domain names are related to intellectual property rights. Without prior consent, You may not copy, reproduce, republish, upload, post, transmit, modify, display or prepare derivative works based upon the materials on this site. Modification if the material or use of the materials for any other purpose may violate our (or third party) copyright and other proprietary rights.',
      'Reproduction or redistribution of this software is strictly prohibited for anyone.',
      'industrialpmr will not be liable for any direct, indirect, incidental, special, consequential, or punitive damages of any kind from the use of or the inability to use *.industrialpmr.com, resulting from goods or services purchased or obtained from industrialpmr.',
      'Our website may contain third party links to other websites or resources, But we are not responsible for any content, product, material available on those sites or resources',
      'By subscribing to any of our monthly paid services you agree that you are financially responsible for all payment of those services. Any payment made to industrialpmr will not be refunded.',
      'industrialpmr reserves the right to suspend or terminate your account at any time, with or without notice, for any reason whatsoever. industrialpmr reserves the right to refuse service to anyone for any reason at any time.',
      'industrialpmr reserves the right to change the terms and conditions of the site at any time. You are responsible for regularly reviewing these terms and conditions. Your continued use of the site after any changes to these terms and conditions will mean you accept those changes.',
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    eyebrow: 'Privacy',
    text: 'Feel free to leave us a message if you have any queries regarding our privacy policies.',
    heading: 'Disclaimer:',
    paragraphs: [],
  },
};

export default function InfoPage({ page }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { title, eyebrow, text, heading, paragraphs = [] } = pages[page];

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} base="/" />
      <main id="main" className="subpage__main">
        <section className="pagehead">
          <div className="wrap">
            <h1>{title}</h1>
            <nav className="crumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{title}</span>
            </nav>
          </div>
        </section>

        <section className="info">
          <div className="wrap">
            <div className="info__head">
              <p className="info__eyebrow">{eyebrow}</p>
              <h2>{title}</h2>
              <p className="info__text">{text}</p>
            </div>
            <div className="info__body">
              <h3 className="info__soon">{heading}</h3>
              {paragraphs.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer home="/" />
    </>
  );
}
