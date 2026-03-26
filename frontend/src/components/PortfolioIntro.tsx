import { lazy, Suspense, useEffect, useState, type RefObject } from "react";

interface PortfolioIntroProps {
    nextSectionRef: RefObject<HTMLElement>;
}

const DesktopPortfolioIntroCanvas = lazy(() => import("./DesktopPortfolioIntroCanvas"));

export default function PortfolioIntro({ nextSectionRef }: PortfolioIntroProps) {
    const [isDesktop, setIsDesktop] = useState(false);
    const [isDesktopIntroReady, setIsDesktopIntroReady] = useState(false);

    const scrollToNextSection = () => {
        nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        const updateIsDesktop = (event: MediaQueryList | MediaQueryListEvent) => {
            setIsDesktop(event.matches);
        };

        updateIsDesktop(mediaQuery);
        mediaQuery.addEventListener("change", updateIsDesktop);

        return () => {
            mediaQuery.removeEventListener("change", updateIsDesktop);
        };
    }, []);

    useEffect(() => {
        if (!isDesktop) {
            setIsDesktopIntroReady(false);
        }
    }, [isDesktop]);

    useEffect(() => {
        if (isDesktop) {
            return;
        }

        let hasUserInteracted = false;

        const cancelAutoScroll = () => {
            hasUserInteracted = true;
        };

        const timeoutId = window.setTimeout(() => {
            if (hasUserInteracted || window.scrollY > 24) {
                return;
            }

            nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 4500);

        window.addEventListener("wheel", cancelAutoScroll, { passive: true });
        window.addEventListener("touchstart", cancelAutoScroll, { passive: true });
        window.addEventListener("pointerdown", cancelAutoScroll);
        window.addEventListener("keydown", cancelAutoScroll);

        return () => {
            window.clearTimeout(timeoutId);
            window.removeEventListener("wheel", cancelAutoScroll);
            window.removeEventListener("touchstart", cancelAutoScroll);
            window.removeEventListener("pointerdown", cancelAutoScroll);
            window.removeEventListener("keydown", cancelAutoScroll);
        };
    }, [isDesktop, nextSectionRef]);

    return (
        <>
            <section className="animate-fade relative flex min-h-screen items-center bg-gray-50 pb-20 pl-6 pt-20 text-black md:hidden">
                <div className="mx-auto w-full max-w-none">
                    <MobileIntroHeading />
                </div>
                <button
                    type="button"
                    onClick={scrollToNextSection}
                    className="scroll-indicator scroll-indicator-mobile">
                    <span className="scroll-indicator__label">Scroll</span>
                    <span className="scroll-indicator__line" />
                </button>
            </section>
            <section className="animate-fade relative hidden h-screen overflow-hidden bg-gray-50 md:block">
                {isDesktop ? (
                    <Suspense fallback={null}>
                        <DesktopPortfolioIntroCanvas
                            isVisible={isDesktopIntroReady}
                            onReady={() => setIsDesktopIntroReady(true)}
                        />
                    </Suspense>
                ) : null}
                <DesktopIntroCurtain isOpen={isDesktopIntroReady} />
                <button
                    type="button"
                    onClick={scrollToNextSection}
                    className="scroll-indicator scroll-indicator-delayed z-[1]">
                    <span className="scroll-indicator__label">Scroll</span>
                    <span className="scroll-indicator__line" />
                </button>
            </section>
        </>
    );
}

function DesktopIntroCurtain({ isOpen }: { isOpen: boolean }) {
    return (
        <div
            aria-hidden="true"
            className={`intro-curtain ${isOpen ? "intro-curtain-open" : ""}`}>
            <div className="intro-curtain-panel intro-curtain-panel-left" />
            <div className="intro-curtain-panel intro-curtain-panel-right" />
        </div>
    );
}

function MobileIntroHeading() {
    return (
        <div className="mobile-intro-title mt-4">
            <h1 className="mobile-intro-outline mobile-intro-heading font-bold leading-tight">
                <span className="mobile-intro-line mobile-intro-line-1">Welcome to</span>
                <span className="mobile-intro-line mobile-intro-line-2">AikawaShota&apos;s</span>
                <span className="mobile-intro-line mobile-intro-line-3">Portfolio.</span>
            </h1>
            <h1 className="mobile-intro-fill mobile-intro-heading font-bold leading-tight">
                <span className="mobile-intro-line mobile-intro-line-1">Welcome to</span>
                <span className="mobile-intro-line mobile-intro-line-2">AikawaShota&apos;s</span>
                <span className="mobile-intro-line mobile-intro-line-3">Portfolio.</span>
            </h1>
        </div>
    );
}
