import React, { useRef, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import '../styles/header.css';
import '../styles/footer.css';
import BalanceCheck from './BalanceCheck';
import Drawer from './Drawer';

const Template: React.FC<{
	children: any,
	isHomepage: boolean,
	gallerySection?: React.RefObject<HTMLDivElement>,
	ourservicesSection?: React.RefObject<HTMLDivElement>
}> = ({ children, isHomepage, gallerySection, ourservicesSection }) => {
	// Refs of section for scrolling down with links
	const aboutusSection = useRef<HTMLDivElement>(null);
	const [balanceCheckActive, setBalanceCheckActive] = useState(false);
	const [drawerActive, setDrawerActive] = useState(false);

	const scrollToSection = (section: React.RefObject<HTMLDivElement>) => {
		//section.current?.scrollIntoView({ behavior: 'smooth' }); //Work perfectly well aswell without -50px

		// 50 pixel higher than the section for better UX
		if (section.current) {
			const yOffset = -50;
			const y = section.current.getBoundingClientRect().top + yOffset;
			window.scrollTo({ top: y, behavior: 'smooth' });
		}
	};

	return (
		<div className="page_content">
			<Drawer
				drawerActive={drawerActive}
				setDrawerActive={setDrawerActive}
				setBalanceCheckActive={setBalanceCheckActive}
				isHomepage={isHomepage}
				scrollToSection={scrollToSection}
				aboutusSection={aboutusSection}
				ourservicesSection={ourservicesSection}
			/>
			<BalanceCheck
				balanceCheckActive={balanceCheckActive}
				setBalanceCheckActive={setBalanceCheckActive}
			/>
			<Header
				isHomepage={isHomepage}
				setBalanceCheckActive={setBalanceCheckActive}
				setDrawerActive={setDrawerActive}
				scrollToSection={scrollToSection}
				aboutusSection={aboutusSection}
				gallerySection={gallerySection}
				ourservicesSection={ourservicesSection}
			/>
			<main>
				{children}
			</main>
			<Footer aboutusSection={aboutusSection} />
		</div >
	);
};

export default Template;
