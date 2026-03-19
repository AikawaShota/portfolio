import { forwardRef, useState } from "react";
import "./skillItem.css";

interface GitHubRepository {
    title: string;
    link: string;
}

interface SkillData {
    id: string;
    title: string;
    rating: number;
    description: string;
    experience: string;
    gitHubRepositories?: GitHubRepository[];
}

interface SkillCategory {
    title: string;
    skills: SkillData[];
}

const skillCategories: SkillCategory[] = [
    {
        title: "Language",
        skills: [
            {
                id: "python",
                title: "Python",
                rating: 1,
                description: "主にバックエンド開発に利用しています。データ分析や機械学習の経験は無いので、現在勉強中です。",
                experience: "2年(e-learning, 学校の授業)",
                gitHubRepositories: [
                    {
                        title: "植物管理アプリ",
                        link: "https://github.com/AikawaShota/garden-management",
                    },
                ],
            },
            {
                id: "java",
                title: "Java",
                rating: 1,
                description: "Java+Servletで簡単なWebアプリケーション開発を学びました。",
                experience: "1年(学校の授業)",
            },
            {
                id: "javascript",
                title: "JavaScript",
                rating: 1,
                description: "フロントエンド開発に利用しています。このサイトもReact.jsで作成しています。これからバックエンド開発も学んでいきます。",
                experience: "1年(学校の授業, 個人開発)",
                gitHubRepositories: [
                    {
                        title: "ポートフォリオサイト(This site!)",
                        link: "https://github.com/AikawaShota/portfolio",
                    },
                ],
            },
            {
                id: "go",
                title: "Go",
                rating: 1,
                description: "Restful APIの開発に利用しています。現在勉強中です。",
                experience: "1年(学校の授業, 個人開発)",
            },
            {
                id: "html-css",
                title: "HTML / CSS",
                rating: 1,
                description: "Webページの構造やデザインを作成するために利用しています。",
                experience: "1年(学校の授業, 個人開発)",
                gitHubRepositories: [
                    {
                        title: "ポートフォリオサイト(This site!)",
                        link: "https://github.com/AikawaShota/portfolio",
                    },
                ],
            },
        ],
    },
    {
        title: "Framework & Library",
        skills: [],
    },
    {
        title: "Infrastructure",
        skills: [],
    },
    {
        title: "Tool",
        skills: [],
    },
];

const SkillSet = forwardRef<HTMLDivElement>(function SkillSet(_props, skillRef) {
    const [selectedSkill, setSelectedSkill] = useState<SkillData | null>(null);

    return (
        <section ref={skillRef} className="w-full min-h-screen bg-gray-50">
            <div className="md:w-9/12 mx-auto md:px-0 px-5">
                <h1 className="text-5xl font-bold pt-10">Skill</h1>
                {skillCategories.map((category) => (
                    <div key={category.title}>
                        <h2 className="font-bold text-3xl py-4">{category.title}</h2>
                        <div className="grid justify-items-center gap-5 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-flow-row">
                            {category.skills.length > 0 ? (
                                category.skills.map((skill) => (
                                    <SkillItem
                                        key={skill.id}
                                        {...skill}
                                        onSelect={() => setSelectedSkill(skill)}
                                    />
                                ))
                            ) : (
                                <p className="w-full text-gray-400">Coming Soon</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <SkillDialog skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
        </section>
    )
});

function SkillItem({ title, rating, onSelect }: SkillData & { onSelect: () => void }) {
    return (
        <div className="w-full">
            <button className="btn btn-outline w-full h-fit justify-between" onClick={onSelect}>
                <h3 className="font-bold text-lg">{title}</h3>
                <RatingStar rating={rating} />
            </button>
        </div>
    )
}

function SkillDialog({ skill, onClose }: { skill: SkillData | null; onClose: () => void }) {
    return (
        <dialog className={`modal modal-bottom sm:modal-middle ${skill ? "modal-open" : ""}`}>
            <div className="modal-box">
                {skill ? (
                    <>
                        <h3 className="font-bold text-lg">{skill.title}</h3>
                        <p>{skill.description}</p>
                        <h3 className="font-bold text-lg mt-4">Experience</h3>
                        <p>{skill.experience}</p>
                        <h3 className="font-bold text-lg mt-4">GitHub</h3>
                        {skill.gitHubRepositories && skill.gitHubRepositories.length > 0 ? (
                            <ul className="list-decimal list-inside">
                                {skill.gitHubRepositories.map((repo) => (
                                    <li key={repo.link} className="pb-2">
                                        {repo.title}:<br />
                                        <a href={repo.link} target="_blank" rel="noopener noreferrer" className="link">
                                            {repo.link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400">Coming Soon</p>
                        )}
                    </>
                ) : null}
                <button
                    type="button"
                    aria-label="Close skill details"
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={onClose}>
                    ✕
                </button>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button type="button" onClick={onClose}>close</button>
            </form>
        </dialog>
    );
}

function RatingStar({ rating }: { rating: number }) {
    return (
        <div className="rating">
            {[...Array(5)].map((_, index) => {
                const starClass = `mask mask-star rating-star ${index < rating ? "highlighted-star" : "faded-star"}`;
                return (
                    <span key={index} className={starClass} />
                );
            })}
        </div>
    )
}

export default SkillSet;
