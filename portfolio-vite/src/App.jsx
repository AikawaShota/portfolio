import { useRef } from "react";
import "destyle.css/destyle.min.css";
import "./App.css";
import PortfolioIntro from "./components/PortfolioIntro/PortfolioIntro.jsx";
import GlobalNav from "./components/GlobalNav/GlobalNav.jsx";
import Profile from "./components/Profile/Profile.jsx";
import SkillSet from "./components/SkillSet/SkillSet.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Works from "./components/Works/Works.jsx";

function App() {
    const profileRef = useRef(null);
    const skillsRef = useRef(null);
    const worksRef = useRef(null);

    return (
        <>
            <header>
                <PortfolioIntro />
            </header>
            <GlobalNav profileRef={profileRef} skillsRef={skillsRef} worksRef={worksRef} />
            <main>
                <Profile ref={profileRef} />
                <SkillSet ref={skillsRef} />
                <Works ref={worksRef} />
            </main>
            <Footer />
        </>
    )
}

export default App
