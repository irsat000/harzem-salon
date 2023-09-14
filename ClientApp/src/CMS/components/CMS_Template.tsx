import React from 'react';
import '../../styles/global.css';
import '../../styles/cms.css';




const CMS_Template: React.FC<{
    children: any
}> = ({ children }) => {

    return (
        <div className="page_content">
            <nav>
                
            </nav>
            <main>
                {children}
            </main>
        </div>
    )
}

export default CMS_Template;