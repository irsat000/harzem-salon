import React from 'react';

const Template: React.FC<{
  children: any
}> = ({ children }) => {
  return (
    <div className="page_content">
      <header>
        {/* Header content */}
      </header>
      <nav>
        {/* Navigation menu */}
      </nav>
      <main>
        {children} {/* This is where the content from the Page component will go */}
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
};

export default Template;
