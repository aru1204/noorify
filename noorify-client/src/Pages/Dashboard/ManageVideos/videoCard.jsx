import { useEffect } from "react";

const VideoCard = ({ singleVideo }) => {
    const videoLink = singleVideo?.videoLink;

    useEffect(() => {
        // Parse FB widget when component mounts or videoLink changes
        const checkAndParse = () => {
            if (window.FB) {
                window.FB.XFBML.parse();
            } else {
                setTimeout(checkAndParse, 100);
            }
        };

        checkAndParse();
    }, [videoLink]);

    return (
        <div className="video-container flex justify-center items-center">
            {videoLink ? (
                <div 
                    className="fb-video "
                    data-href={videoLink}
                    data-width="500"
                    data-show-text="false"
                ></div>
            ) : (
                <p>No Videos Here ..........</p>
            )}
        </div>
    );
};

export default VideoCard;