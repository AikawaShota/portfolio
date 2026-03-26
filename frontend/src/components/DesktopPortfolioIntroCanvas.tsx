import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader, type Font } from "three/examples/jsm/loaders/FontLoader.js";

interface DesktopPortfolioIntroCanvasProps {
    onReady?: () => void;
    isVisible?: boolean;
}

export default function DesktopPortfolioIntroCanvas({ onReady, isVisible = false }: DesktopPortfolioIntroCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textAnimationDelayMs = 700;

    useEffect(() => {
        const lines = ["Welcome to", "AikawaShota's", "Portfolio."];
        const lineGroups: THREE.Group[] = [];
        let camera: THREE.PerspectiveCamera | null = null;
        let scene: THREE.Scene | null = null;
        let renderer: THREE.WebGLRenderer | null = null;
        let controls: OrbitControls | null = null;
        let container: HTMLDivElement | null = null;
        let animationId = 0;
        let animationStartTime = 0;
        let isTextReady = false;

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

                scene.add(createHeartMark(matDark, matLite));

                const lineSpacing = 122;

                for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
                    const lineMessage = lines[lineIndex];
                    const shapes = font.generateShapes(lineMessage, 100);
                    const geometry = new THREE.ShapeGeometry(shapes);

                    geometry.computeBoundingBox();

                    const xPos = -((geometry.boundingBox?.max.x ?? 0) + (geometry.boundingBox?.min.x ?? 0)) / 2;
                    const baseY = ((lines.length - 1) * lineSpacing) / 2;
                    const yPos = baseY - lineIndex * lineSpacing;

                    geometry.translate(xPos, yPos, 0);

                    const lineGroup = new THREE.Group();
                    lineGroup.position.y = 36;

                    const text = new THREE.Mesh(geometry, matLite.clone());
                    text.position.z = -10;
                    (text.material as THREE.MeshBasicMaterial).opacity = 0;
                    lineGroup.add(text);

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

                    for (let i = 0; i < allShapes.length; i += 1) {
                        const shape = allShapes[i];
                        const points = shape.getPoints();
                        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

                        lineGeometry.translate(xPos, yPos, 0);

                        const lineMesh = new THREE.Line(lineGeometry, matDark.clone());
                        (lineMesh.material as THREE.LineBasicMaterial).opacity = 0;
                        lineGroup.add(lineMesh);
                    }

                    lineGroups.push(lineGroup);
                    scene.add(lineGroup);
                }

                isTextReady = true;
                animationStartTime = performance.now() + textAnimationDelayMs;
                onReady?.();
                startAnimation();
            });

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
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

            if (isTextReady) {
                updateLineAnimations();
            }

            renderer.render(scene, camera);
        }

        function updateLineAnimations() {
            const elapsed = (performance.now() - animationStartTime) / 1000;

            for (let lineIndex = 0; lineIndex < lineGroups.length; lineIndex += 1) {
                const group = lineGroups[lineIndex];
                const lineDelay = lineIndex * 0.45;
                const progress = THREE.MathUtils.clamp((elapsed - lineDelay) / 0.9, 0, 1);
                const eased = 1 - Math.pow(1 - progress, 3);

                group.position.y = (1 - eased) * 36;

                for (let childIndex = 0; childIndex < group.children.length; childIndex += 1) {
                    const child = group.children[childIndex];

                    if (child instanceof THREE.Mesh) {
                        const material = child.material as THREE.MeshBasicMaterial;
                        material.opacity = 0.4 * eased;
                    }

                    if (child instanceof THREE.Line) {
                        const material = child.material as THREE.LineBasicMaterial;
                        material.transparent = true;
                        material.opacity = eased;
                    }
                }
            }
        }

        function createHeartMark(
            outlineMaterial: THREE.LineBasicMaterial,
            fillMaterial: THREE.MeshBasicMaterial,
        ) {
            const x = 0;
            const y = 0;

            const heartShape = new THREE.Shape();
            heartShape.moveTo(x, y + 28);
            heartShape.bezierCurveTo(x, y + 52, x - 36, y + 52, x - 36, y + 20);
            heartShape.bezierCurveTo(x - 36, y - 8, x - 10, y - 24, x, y - 42);
            heartShape.bezierCurveTo(x + 10, y - 24, x + 36, y - 8, x + 36, y + 20);
            heartShape.bezierCurveTo(x + 36, y + 52, x, y + 52, x, y + 28);

            const heartGroup = new THREE.Group();
            heartGroup.position.set(0, 0, 800);
            heartGroup.rotation.y = Math.PI;

            const heartFillGeometry = new THREE.ShapeGeometry(heartShape, 24);
            const heartFill = new THREE.Mesh(heartFillGeometry, fillMaterial.clone());
            heartFill.scale.setScalar(2.6);
            heartFill.position.z = -8;
            (heartFill.material as THREE.MeshBasicMaterial).opacity = 0.24;
            heartGroup.add(heartFill);

            const heartPoints = heartShape.getPoints(120);
            const heartLineGeometry = new THREE.BufferGeometry().setFromPoints(heartPoints);
            const heartOutline = new THREE.LineLoop(heartLineGeometry, outlineMaterial.clone());
            heartOutline.scale.setScalar(2.6);
            heartGroup.add(heartOutline);

            return heartGroup;
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
            controls?.dispose();
            renderer?.dispose();

            if (container && renderer) {
                container.removeChild(renderer.domElement);
            }
        };
    }, [onReady]);

    return (
        <div
            ref={containerRef}
            className={`absolute inset-0 transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
            aria-hidden="true"
        />
    );
}
