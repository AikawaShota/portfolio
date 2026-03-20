import { useRef } from "react";
import "destyle.css/destyle.min.css";
import PortfolioIntro from "./components/PortfolioIntro";
import GlobalNav from "./components/GlobalNav";
import Profile from "./components/Profile";
import SkillSet from "./components/SkillSet";
import Works from "./components/Works";
import Footer from "./components/Footer";

function App() {
    const profileRef = useRef<HTMLDivElement>(null);
    const skillRef = useRef<HTMLDivElement>(null);
    const worksRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <PortfolioIntro nextSectionRef={profileRef} />
            <GlobalNav profileRef={profileRef} skillRef={skillRef} worksRef={worksRef} />
            <main>
                <Profile ref={profileRef} />
                <SkillSet ref={skillRef} />
                <Works ref={worksRef} />
            </main>
            <Footer />
        </>
    )
}

export default App
