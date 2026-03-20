import { useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader, type Font } from "three/examples/jsm/loaders/FontLoader.js";

interface PortfolioIntroProps {
    nextSectionRef: RefObject<HTMLElement>;
}

export default function PortfolioIntro({ nextSectionRef }: PortfolioIntroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

    const scrollToNextSection = () => {
        nextSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        const updateIsMobile = (event: MediaQueryList | MediaQueryListEvent) => {
            setIsMobile(event.matches);
        };

        updateIsMobile(mediaQuery);
        mediaQuery.addEventListener("change", updateIsMobile);

        return () => {
            mediaQuery.removeEventListener("change", updateIsMobile);
        };
    }, []);

    useEffect(() => {
        if (isMobile) {
            return;
        }

        let camera: THREE.PerspectiveCamera | null = null;
        let scene: THREE.Scene | null = null;
        let renderer: THREE.WebGLRenderer | null = null;
        let controls: OrbitControls | null = null;
        let container: HTMLDivElement | null = null;
        let animationId = 0;

        init();

        function init() {
            camera = new THREE.PerspectiveCamera(45, document.documentElement.clientWidth / window.innerHeight, 1, 10000);
            camera.position.set(0, 0, 750);

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xf9fafb);

            const loader = new FontLoader();
            loader.load("fonts/Ubuntu_Regular.json", function (font: Font) {
                if (!scene) {
                    return;
                }

                const color = 0x000000;

                const matDark = new THREE.LineBasicMaterial({
                    color,
                    side: THREE.DoubleSide,
                });

                const matLite = new THREE.MeshBasicMaterial({
                    color,
                    transparent: true,
                    opacity: 0.4,
                    side: THREE.DoubleSide,
                });

                const message = "Welcome to\nAikawaShota's\nPortfolio.";
                const shapes = font.generateShapes(message, 100);
                const geometry = new THREE.ShapeGeometry(shapes);

                geometry.computeBoundingBox();

                const xPos = -((geometry.boundingBox?.max.x ?? 0) + (geometry.boundingBox?.min.x ?? 0)) / 2;
                const yPos = -((geometry.boundingBox?.max.y ?? 0) + (geometry.boundingBox?.min.y ?? 0)) / 2;

                geometry.translate(xPos, yPos, 0);

                const text = new THREE.Mesh(geometry, matLite);
                text.position.z = -10;
                scene.add(text);

                const holeShapes: THREE.Path[] = [];

                for (let i = 0; i < shapes.length; i += 1) {
                    const shape = shapes[i];

                    if (shape.holes && shape.holes.length > 0) {
                        for (let j = 0; j < shape.holes.length; j += 1) {
                            holeShapes.push(shape.holes[j]);
                        }
                    }
                }

                const allShapes = [...shapes, ...holeShapes];

                const lineText = new THREE.Object3D();

                for (let i = 0; i < allShapes.length; i += 1) {
                    const shape = allShapes[i];
                    const points = shape.getPoints();
                    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

                    lineGeometry.translate(xPos, yPos, 0);

                    const lineMesh = new THREE.Line(lineGeometry, matDark);
                    lineText.add(lineMesh);
                }

                scene.add(lineText);
                startAnimation();
            });

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(document.documentElement.clientWidth, window.innerHeight);
            container = containerRef.current;
            container?.appendChild(renderer.domElement);

            controls = new OrbitControls(camera, renderer.domElement);
            controls.rotateSpeed = 0.3;
            controls.enableZoom = false;
            controls.target.set(0, 0, 400);
            controls.update();
            controls.addEventListener("change", render);

            window.addEventListener("resize", onWindowResize);
            onWindowResize();
        }

        function onWindowResize() {
            if (!camera || !renderer) {
                return;
            }

            camera.aspect = document.documentElement.clientWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(document.documentElement.clientWidth, window.innerHeight);
            render();
        }

        function render() {
            if (!renderer || !scene || !camera) {
                return;
            }

            renderer.render(scene, camera);
        }

        function startAnimation() {
            function animate() {
                animationId = requestAnimationFrame(animate);
                render();
            }

            animate();
        }

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", onWindowResize);
            controls?.removeEventListener("change", render);

            if (container && renderer) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [isMobile]);

    useEffect(() => {
        if (!isMobile) {
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
        }, 3500);

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
    }, [isMobile, nextSectionRef]);

    if (isMobile) {
        return (
            <section className="animate-fade relative flex min-h-screen items-center bg-gray-50 pb-20 pl-6 pt-20 text-black">
                <div className="mx-auto w-full max-w-none">
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
                </div>
                <button
                    type="button"
                    onClick={scrollToNextSection}
                    className="scroll-indicator">
                    <span className="scroll-indicator__label">Scroll</span>
                    <span className="scroll-indicator__line" />
                </button>
            </section>
        );
    }

    return (
        <section className="animate-fade relative h-screen cursor-grab active:cursor-grabbing">
            <div ref={containerRef} />
        </section>
    );
}
