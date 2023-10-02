import React, { useEffect, useRef, useState } from 'react';

const FadeInElement: React.FC<{
    children: any
}> = ({ children }) => {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Stop observing once it's visible.
                }
            });
        });

        observer.observe(elementRef.current!);

        // Clean up the observer when the component unmounts.
        return () => {
            observer.disconnect();
        };
    }, []);

    const animationClass = isVisible ? 'fadeIn_animated' : 'opacity_0';

    return React.cloneElement(React.Children.only(children), {
        ref: elementRef,
        className: `${children.props.className} ${animationClass}`,
    });
};

export default FadeInElement;