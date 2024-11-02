import { useRef } from "react";
import PropTypes from "prop-types";
import "./skillItem.css";

export default function SkillSet() {
    const pythonRef = useRef(null);
    const python = {
        skillRef: pythonRef,
        title: "Python",
        rating: 1,
        text: "私が得意な言語です。",
        gitHubTitle: "植物管理アプリ",
        gitHubLink: "https://github.com/AikawaShota/garden-management",
    }

    const javaRef = useRef(null);
    const java = {
        skillRef: javaRef,
        title: "Java",
        rating: 1,
        text: "私が得意な言語です。",
        gitHubTitle: "植物管理アプリ",
        gitHubLink: "https://github.com/AikawaShota/garden-management",
    }


    const javascriptRef = useRef(null);
    const javascript = {
        skillRef: javascriptRef,
        title: "JavaScript",
        rating: 1,
        text: "このサイトで主に使われている言語です。",
        gitHubTitle: "植物管理アプリ",
        gitHubLink: "https://github.com/AikawaShota/garden-management",
    }

    return (
        <div className="hero bg-gray-50 min-h-screen">
            <div className="hero-content">
                <h2 className="font-bold text-3xl">Language</h2>
                <div className="grid grid-rows-2 grid-flow-col">
                    < SkillItem {...python} />
                    < SkillItem {...java} />
                    < SkillItem {...javascript} />
                </div>
            </div>
        </div>
    )
}

function SkillItem({ skillRef, title, rating, text, gitHubLink = "#", gitHubTitle = "N/A" }) {

    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn btn-outline" onClick={() => skillRef.current.showModal()}>
                <h3 className="font-bold text-lg">{title}</h3>
                <RatingStar rating={rating} />
            </button >
            <dialog ref={skillRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{text}</p>
                    <h3 className="font-bold text-lg">GitHub</h3>
                    <p>
                        <a href={gitHubLink} target="_blank" rel="noopener noreferrer" className="link">{gitHubTitle}</a>
                    </p>
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
    text: PropTypes.string,
    gitHubLink: PropTypes.string,
    gitHubTitle: PropTypes.string,
};

RatingStar.propTypes = {
    rating: PropTypes.number,
}
