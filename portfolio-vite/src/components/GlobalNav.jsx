// React
import { useRef, useEffect, useState } from "react";

import PropTypes from "prop-types";

export default function GlobalNav({ profileRef, skillRef }) {
    const [isVisible, setIsVisible] = useState(false);
    const globalNavRef = useRef(null);

    useEffect(() => {
        const globalNav = globalNavRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // 要素がビューポートに入ったかどうかを確認
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 1.0 } // 完全に表示されたタイミングで発火
        );

        if (globalNav) {
            observer.observe(globalNav);
        }

        // コンポーネントがアンマウントされたときに監視を解除
        return () => {
            if (globalNav) {
                observer.unobserve(globalNav);
            }
        };
    }, []);

    // CSS
    const globalNavStyle = {
        opacity: isVisible ? 1 : 0,
        transition: "opacity 1s ease",
    }

    // SVG
    const personIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" /></svg>
    )

    const mailIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
    )

    const openInNewIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" /></svg>
    )

    const bagIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" /></svg>
    )

    const scrollToSection = (ref) => {
        ref.current.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <nav ref={globalNavRef} style={globalNavStyle} className="navbar bg-gray-50 sticky top-0 z-10">
            <div className="navbar-start min-w-fit">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-40 p-2 shadow">
                        <li onClick={() => scrollToSection(profileRef)}><a>{personIcon}Profile</a></li>
                        <li>
                            <a>{bagIcon}Portfolio</a>
                            <ul className="p-2">
                                <li onClick={() => scrollToSection(skillRef)}><a>Skill</a></li>
                                <li><a>Work</a></li>
                            </ul>
                        </li>
                        <li><a>{mailIcon}Contact</a></li>
                        <li><a>{openInNewIcon}Blog</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">AikawaShota&apos;s Portfolio</a>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 ">
                    <li onClick={() => scrollToSection(profileRef)}><a>{personIcon}Profile</a></li>
                    <li>
                        <details>
                            <summary>{bagIcon}Portfolio</summary>
                            <ul className="p-4 w-full">
                                <li onClick={() => scrollToSection(skillRef)}><a>Skill</a></li>
                                <li><a>Work</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>{mailIcon}Contact</a></li>
                    <li><a href="https://mesekit.com" target="_blank">{openInNewIcon}Blog</a></li>
                </ul>
            </div>
        </nav>
    )
}

GlobalNav.propTypes = {
    profileRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    }),
};