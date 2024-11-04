import { useRef } from "react";
import "destyle.css/destyle.min.css";
import "./App.css";
import PortfolioIntro from "./components/PortfolioIntro.jsx";
import GlobalNav from "./components/GlobalNav.jsx";
import Profile from "./components/Profile.jsx";
import SkillSet from "./components/SkillSet.jsx";

function App() {
    const profileRef = useRef(null);

    return (
        <>
            <header>
                <PortfolioIntro />
            </header>
            <GlobalNav profileRef={profileRef} />
            <main>
                <Profile ref={profileRef} />
                <SkillSet />
            </main>
        </>
    )
}

export default App
