import 'destyle.css/destyle.min.css';
import './App.css';
import PortfolioIntro from './components/PortfolioIntro.jsx';
import GlobalNav from './components/GlobalNav.jsx'
import Profile from './components/Profile.jsx'

function App() {
    return (
        <>
            <PortfolioIntro />
            <GlobalNav />
            <Profile />
        </>
    )
}

export default App
