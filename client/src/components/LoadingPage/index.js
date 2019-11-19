import React from 'react';
import './index.scss';
const LoadingPage = () => {
    return (
        <div className="divLoader">
            <div className="overlay" />
            <svg
                className="svgLoader"
                viewBox="0 0 100 100"
                width="2em"
                height="2em"
            >
                <path
                    ng-attr-d="{{config.pathCmd}}"
                    ng-attr-fill="{{config.color}}"
                    stroke="none"
                    d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
                    fill="#51CACC"
                    transform="rotate(179.719 50 51)"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        calcMode="linear"
                        values="0 50 51;360 50 51"
                        keyTimes="0;1"
                        dur="1s"
                        begin="0s"
                        repeatCount="indefinite"
                    />
                </path>
            </svg>
        </div>
    );
};
export default LoadingPage;
