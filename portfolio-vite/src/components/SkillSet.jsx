import { useRef, forwardRef } from "react";
import PropTypes from "prop-types";
import "./skillItem.css";

export default forwardRef(function SkillSet(props, skillRef) {
    const pythonRef = useRef(null);
    const python = {
        skillRef: pythonRef,
        title: "Python",
        rating: 1,
        description: "主にバックエンド開発に利用しています。データ分析や機械学習の経験は無いので、現在勉強中です。",
        experience: "2年(e-learning, 学校の授業)",
        gitHubRepositories: [
            {
                title: "植物管理アプリ",
                link: "https://github.com/AikawaShota/garden-management"
            },
        ]
    }

    const javaRef = useRef(null);
    const java = {
        skillRef: javaRef,
        title: "Java",
        rating: 1,
        description: "Java+Servletで簡単なWebアプリケーション開発を学びました。",
        experience: "1年(学校の授業)",
    }

    const javascriptRef = useRef(null);
    const javascript = {
        skillRef: javascriptRef,
        title: "JavaScript",
        rating: 1,
        description: "フロントエンド開発に利用しています。このサイトもReact.jsで作成しています。これからバックエンド開発も学んでいきます。",
        experience: "1年(学校の授業, 個人開発)",
        gitHubRepositories: [
            {
                title: "ポートフォリオサイト(This site!)",
                link: "https://github.com/AikawaShota/portfolio"
            },
        ]
    }

    const goRef = useRef(null);
    const go = {
        skillRef: goRef,
        title: "Go",
        rating: 1,
        description: "Restful APIの開発に利用しています。現在勉強中です。",
        experience: "1年(学校の授業, 個人開発)",
        gitHubRepositories: []
    }

    const htmlCssRef = useRef(null);
    const htmlCss = {
        skillRef: htmlCssRef,
        title: "HTML / CSS",
        rating: 1,
        description: "Webページの構造やデザインを作成するために利用しています。",
        experience: "1年(学校の授業, 個人開発)",
        gitHubRepositories: [
            {
                title: "ポートフォリオサイト(This site!)",
                link: "https://github.com/AikawaShota/portfolio"
            },
        ]
    }

    return (
        <div ref={skillRef} className="w-full min-h-screen bg-gray-50">
            <div className="md:w-9/12 mx-auto md:px-0 px-5">
                <h1 className="text-5xl font-bold pt-10">Skill</h1>
                <div>
                    <h2 className="font-bold text-3xl py-4">Language</h2>
                    <div className="grid justify-items-center gap-5 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-flow-row">
                        < SkillItem {...python} />
                        < SkillItem {...java} />
                        < SkillItem {...javascript} />
                        < SkillItem {...go} />
                        < SkillItem {...htmlCss} />
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-3xl py-4">Framework & Library</h2>
                    <div className="grid justify-items-center gap-5 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-flow-row">
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-3xl py-4">Infrastructure</h2>
                    <div className="grid justify-items-center gap-5 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-flow-row">
                    </div>
                </div>
                <div>
                    <h2 className="font-bold text-3xl py-4">Tool</h2>
                    <div className="grid justify-items-center gap-5 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-flow-row">
                    </div>
                </div>
            </div>
        </div>
    )
});

function SkillItem({ skillRef, title, rating, description, experience, gitHubRepositories = [] }) {

    return (
        <div className="w-full">
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-outline w-full h-fit justify-between" onClick={() => skillRef.current.showModal()}>
                <h3 className="font-bold text-lg">{title}</h3>
                <RatingStar rating={rating} />
            </button >
            <dialog ref={skillRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="">{description}</p>
                    <h3 className="font-bold text-lg mt-4">Experience</h3>
                    <p className="">{experience}</p>
                    <h3 className="font-bold text-lg mt-4">GitHub</h3>
                    {gitHubRepositories.length > 0 ? (
                        <ul className="list-decimal list-inside">
                            {gitHubRepositories.map((repo, index) => (
                                <li key={index} className="pb-2">
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
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
            </dialog>
        </div>
    )
}

function RatingStar({ rating }) {
    return (
        <div className="rating">
            {[...Array(5)].map((_, index) => {
                const starClass = `mask mask-star rating-star ${index < rating ? "highlighted-star" : "faded-star"}`;
                return (
                    <span key={index} className={starClass}></span>
                );
            })}
        </div >
    )
}

SkillItem.propTypes = {
    skillRef: PropTypes.shape({
        current: PropTypes.instanceOf(Element)
    }),
    title: PropTypes.string,
    rating: PropTypes.number,
    description: PropTypes.string,
    experience: PropTypes.string,
    gitHubRepositories: PropTypes.array,
};

RatingStar.propTypes = {
    rating: PropTypes.number,
}
