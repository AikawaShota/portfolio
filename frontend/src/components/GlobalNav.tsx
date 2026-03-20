import { useRef, useEffect, useState, type CSSProperties, type RefObject } from "react";

type SectionRef = RefObject<HTMLElement>;
type IconType = "person" | "mail" | "star" | "bag";

interface GlobalNavProps {
    profileRef: SectionRef;
    skillRef: SectionRef;
    worksRef: SectionRef;
}

interface NavItem {
    label: string;
    icon: IconType;
    href?: string;
    onClick?: () => void;
    children?: NavItem[];
}

export default function GlobalNav({ profileRef, skillRef, worksRef }: GlobalNavProps) {
    const [isVisible, setIsVisible] = useState(false);
    const globalNavRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const globalNav = globalNavRef.current;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 1.0 }
        );

        if (globalNav) {
            observer.observe(globalNav);
        }

        return () => {
            if (globalNav) {
                observer.unobserve(globalNav);
            }
        };
    }, []);

    const globalNavStyle: CSSProperties = {
        opacity: isVisible ? 1 : 0,
        transition: "opacity 1s ease",
    }

    const scrollToSection = (ref: SectionRef) => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }

    const navItems: NavItem[] = [
        {
            label: "Profile",
            icon: "person",
            onClick: () => scrollToSection(profileRef),
        },
        {
            label: "Skill",
            icon: "star",
            onClick: () => scrollToSection(skillRef),
        },
        {
            label: "Works",
            icon: "bag",
            onClick: () => scrollToSection(worksRef),
        },
        {
            label: "Contact",
            icon: "mail",
        },
    ];

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
                        {navItems.map((item) => (
                            <MobileNavItem key={item.label} item={item} />
                        ))}
                    </ul>
                </div>
                <p className="pl-4 font-bold text-xl">AikawaShota&apos;s Portfolio</p>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 ">
                    {navItems.map((item) => (
                        <DesktopNavItem key={item.label} item={item} />
                    ))}
                </ul>
            </div>
        </nav>
    )
}

function DesktopNavItem({ item }: { item: NavItem }) {
    if (item.children) {
        return (
            <li>
                <details>
                    <summary>{renderIcon(item.icon)}{item.label}</summary>
                    <ul className="p-4 w-full">
                        {item.children.map((child) => (
                            <li key={child.label} onClick={child.onClick}>
                                {child.href ? (
                                    <a href={child.href} target="_blank" rel="noopener noreferrer">{child.label}</a>
                                ) : (
                                    <a>{child.label}</a>
                                )}
                            </li>
                        ))}
                    </ul>
                </details>
            </li>
        );
    }

    return (
        <li onClick={item.onClick}>
            {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">{renderIcon(item.icon)}{item.label}</a>
            ) : (
                <a>{renderIcon(item.icon)}{item.label}</a>
            )}
        </li>
    );
}

function MobileNavItem({ item }: { item: NavItem }) {
    if (item.children) {
        return (
            <li>
                <a>{renderIcon(item.icon)}{item.label}</a>
                <ul className="p-2">
                    {item.children.map((child) => (
                        <li key={child.label} onClick={child.onClick}>
                            {child.href ? (
                                <a href={child.href} target="_blank" rel="noopener noreferrer">{child.label}</a>
                            ) : (
                                <a>{child.label}</a>
                            )}
                        </li>
                    ))}
                </ul>
            </li>
        );
    }

    return (
        <li onClick={item.onClick}>
            {item.href ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">{renderIcon(item.icon)}{item.label}</a>
            ) : (
                <a>{renderIcon(item.icon)}{item.label}</a>
            )}
        </li>
    );
}

function renderIcon(icon: IconType) {
    switch (icon) {
        case "person":
            return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" /></svg>;
        case "mail":
            return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>;
        case "star":
            return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z" /></svg>;
        case "bag":
            return <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" /></svg>;
    }
}
