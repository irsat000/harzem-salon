import React, { useRef } from 'react';
import Footer from './Footer';
import Header from './Header';
import '../styles/header.css';
import '../styles/footer.css';

const Template: React.FC<{
  children: any,
  isHomepage: boolean,
  gallerySection?: React.RefObject<HTMLDivElement>,
  ourservicesSection?: React.RefObject<HTMLDivElement>
}> = ({ children, isHomepage, gallerySection, ourservicesSection }) => {
  // Refs of section for scrolling down with links
  const aboutusSection = useRef<HTMLDivElement>(null);

  return (
    <div className="page_content">
      <Header isHomepage={isHomepage} aboutusSection={aboutusSection} gallerySection={gallerySection} ourservicesSection={ourservicesSection}/>
      <main>
        {children}
      </main>
      <Footer aboutusSection={aboutusSection} />
    </div>
  );
};

export default Template;
