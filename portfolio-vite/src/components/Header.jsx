// React
import { useRef, useEffect } from 'react'
// Three.js
import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';


export default function Header() {
    return (
        <header>
            <div>
                <PortfolioIntro />
            </div>
        </header>
    )
}


function PortfolioIntro() {
    const containerRef = useRef(null);

    useEffect(() => {
        let camera, scene, renderer;
        let controls, container;
        let animationId;

        init();

        function init() {

            camera = new THREE.PerspectiveCamera(45, document.documentElement.clientWidth / window.innerHeight, 1, 10000);
            camera.position.set(0, 0, 750);

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);

            const loader = new FontLoader();
            loader.load('fonts/Ubuntu_Regular.json', function (font) {

                const color = 0x000000;

                const matDark = new THREE.LineBasicMaterial({
                    color: color,
                    side: THREE.DoubleSide
                });

                const matLite = new THREE.MeshBasicMaterial({
                    color: color,
                    transparent: true,
                    opacity: 0.4,
                    side: THREE.DoubleSide
                });

                const message = "Welcome to\nAikawaShota's\nPortfolio.";

                const shapes = font.generateShapes(message, 100);

                const geometry = new THREE.ShapeGeometry(shapes);

                geometry.computeBoundingBox();

                const xPos = - (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
                const yPos = - (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;

                geometry.translate(xPos, yPos, 0);

                // make shape ( N.B. edge view not visible )

                const text = new THREE.Mesh(geometry, matLite);
                text.position.z = - 10;
                scene.add(text);

                // make line shape ( N.B. edge view remains visible )

                const holeShapes = [];

                for (let i = 0; i < shapes.length; i++) {

                    const shape = shapes[i];

                    if (shape.holes && shape.holes.length > 0) {

                        for (let j = 0; j < shape.holes.length; j++) {

                            const hole = shape.holes[j];
                            holeShapes.push(hole);

                        }

                    }

                }

                shapes.push.apply(shapes, holeShapes);

                const lineText = new THREE.Object3D();

                for (let i = 0; i < shapes.length; i++) {

                    const shape = shapes[i];

                    const points = shape.getPoints();
                    const geometry = new THREE.BufferGeometry().setFromPoints(points);

                    geometry.translate(xPos, yPos, 0);

                    const lineMesh = new THREE.Line(geometry, matDark);
                    lineText.add(lineMesh);

                }

                scene.add(lineText);

                startAnimation();
            }); //end load function

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(document.documentElement.clientWidth, window.innerHeight);
            container = containerRef.current;
            container.appendChild(renderer.domElement);

            controls = new OrbitControls(camera, renderer.domElement);
            controls.enabled = true;
            controls.enableZoom = false;
            controls.target.set(0, 0, 400);
            controls.update();

            controls.addEventListener('change', render);

            window.addEventListener('resize', onWindowResize);

            onWindowResize(); // canvasサイズが縦スクロールバーのwidthだけ大きくなるため、onWindowResizeで調整。
        } // end init

        function onWindowResize() {

            camera.aspect = document.documentElement.clientWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(document.documentElement.clientWidth, window.innerHeight);

            render();

        }

        function render() {

            renderer.render(scene, camera);

        }

        function startAnimation() {
            function animate() {
                animationId = requestAnimationFrame(animate);
                render();
            }
            animate();
        }

        // cleanup
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', onWindowResize);
            controls.removeEventListener('change', render);
            if (container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={containerRef} />;
}