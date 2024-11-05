import { useRef } from "react";
import "destyle.css/destyle.min.css";
import "./App.css";
import PortfolioIntro from "./components/PortfolioIntro.jsx";
import GlobalNav from "./components/GlobalNav.jsx";
import Profile from "./components/Profile.jsx";
import SkillSet from "./components/SkillSet.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    const profileRef = useRef(null);
    const skillRef = useRef(null);

    return (
        <>
            <header>
                <PortfolioIntro />
            </header>
            <GlobalNav profileRef={profileRef} skillRef={skillRef} />
            <main>
                <Profile ref={profileRef} />
                <SkillSet ref={skillRef} />
            </main>
            <Footer />
        </>
    )
}

export default App
