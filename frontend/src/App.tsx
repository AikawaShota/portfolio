import { useRef } from "react";
import "destyle.css/destyle.min.css";
import PortfolioIntro from "./components/PortfolioIntro";
import GlobalNav from "./components/GlobalNav";
import Profile from "./components/Profile";
import SkillSet from "./components/SkillSet";
import Works from "./components/Works";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
    const profileRef = useRef<HTMLDivElement>(null);
    const skillRef = useRef<HTMLDivElement>(null);
    const worksRef = useRef<HTMLDivElement>(null);
    const contactRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <PortfolioIntro nextSectionRef={profileRef} />
            <GlobalNav profileRef={profileRef} skillRef={skillRef} worksRef={worksRef} contactRef={contactRef} />
            <main>
                <Profile ref={profileRef} />
                <SkillSet ref={skillRef} />
                <Works ref={worksRef} />
                <Contact ref={contactRef} />
            </main>
            <Footer />
        </>
    )
}

export default App
