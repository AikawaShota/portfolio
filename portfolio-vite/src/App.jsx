import { useRef } from 'react';
import 'destyle.css/destyle.min.css';
import './App.css';
import PortfolioIntro from './components/PortfolioIntro.jsx';
import GlobalNav from './components/GlobalNav.jsx'
import Profile from './components/Profile.jsx'

function App() {
    const profileRef = useRef(null);

    return (
        <>
            <PortfolioIntro />
            <GlobalNav profileRef={profileRef} />
            <Profile ref={profileRef} />
        </>
    )
}

export default App
