import { useRef } from "react";
import "destyle.css/destyle.min.css";
import PortfolioIntro from "./components/PortfolioIntro";
import GlobalNav from "./components/GlobalNav";
import Profile from "./components/Profile";
import SkillSet from "./components/SkillSet";
import Footer from "./components/Footer";

function App() {
    const profileRef = useRef<HTMLDivElement>(null);
    const skillRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <PortfolioIntro />
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
