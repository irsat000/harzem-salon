import React, { useRef } from 'react';
import Footer from './Footer';
import Header from './Header';

const Template: React.FC<{
  children: any,
  isHomepage: boolean,
  gallerySection?: React.RefObject<HTMLDivElement>
}> = ({ children, isHomepage, gallerySection }) => {
  // Refs of section for scrolling down with links
  const aboutusSection = useRef<HTMLDivElement>(null);

  return (
    <div className="page_content">
      <Header isHomepage={isHomepage} aboutusSection={aboutusSection} gallerySection={gallerySection} />
      <main>
        {children}
      </main>
      <Footer aboutusSection={aboutusSection} />
    </div>
  );
};

export default Template;
