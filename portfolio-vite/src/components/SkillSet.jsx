import { useRef } from "react";

export default function SkillSet() {
    const pythonRef = useRef(null);
    const python = {
        skillRef: pythonRef,
        title: "Python",
        percent: 20,
        text: "私が得意な言語です。",
        gitHubTitle: "植物管理アプリ",
        gitHubLink: "https://github.com/AikawaShota/garden-management",
    }

    return (
        <div className="container">
            <SkillProgress {...python} />
        </div>
    )
}

function SkillProgress({ skillRef, title, percent, text, gitHubLink = "#", gitHubTitle = "N/A" }) {

    return (
        <>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button className="btn" onClick={() => skillRef.current.showModal()}>
                <h3 className="font-bold text-lg">{title}</h3>
                <progress className="progress w-40" value={percent} max="100"></progress>
                <p>{percent}%</p>
            </button >
            <dialog ref={skillRef} className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{text}</p>
                    <p>
                        {gitHubTitle}:<a href={gitHubLink} target="_blank" rel="noopener noreferrer" className="link">{gitHubLink}</a>
                    </p>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                </div>
            </dialog>
        </>
    )
}