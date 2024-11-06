import { useRef, forwardRef } from "react";
import PropTypes from "prop-types";
import "./workItem.css";

export default forwardRef(function Works(props, worksRef) {
    return (
        <div ref={worksRef} className="min-h-screen bg-gray-200">
            <div className="md:w-9/12 mx-auto md:px-0 px-5">
                <h1 className="text-5xl font-bold pt-10 pb-4">Works</h1>
            </div>
        </div>
    )
});

function WorkItem() {
    return (
        <></>
    )
}

WorkItem.propTypes = {
};
