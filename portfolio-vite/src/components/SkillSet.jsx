export default function SkillSet() {
    const pythonImg = (
        <img
            src="/images/python.svg"
            alt="python logo"
            className="" />
    )

    return (
        <div className="hero">
            <SkillCard imgTag={pythonImg} title="Python" text="私の一番得意な言語です。" />
        </div>
    )
}

function SkillCard({ imgTag, title, text }) {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure className="px-10 pt-10">
                {imgTag}
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{title}</h2>
                <p>{text}</p>
                <div className="card-actions">
                    <button className="btn btn-primary">成果物</button>
                </div>
            </div>
        </div>
    )
}