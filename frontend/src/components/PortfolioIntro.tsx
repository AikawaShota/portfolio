import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader, type Font } from "three/examples/jsm/loaders/FontLoader.js";

export default function PortfolioIntro() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
    }, []);

    return (
        <header className="animate-fade h-screen cursor-grab active:cursor-grabbing">
            <div ref={containerRef} />
        </header>
    );
}
