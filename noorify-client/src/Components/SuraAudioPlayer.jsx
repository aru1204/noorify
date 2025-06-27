import React, { useState, useEffect, useRef } from "react";

const SuraAudioPlayer = () => {
    const [suraList, setSuraList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showTrackList, setShowTrackList] = useState(false);
    const audioRef = useRef(null);

    // Fetch sura list from public folder
    useEffect(() => {
        fetch("/suraData.json")
            .then((response) => response.json())
            .then((data) => setSuraList(data))
            .catch((error) => console.error("Error fetching sura data:", error));
    }, []);

    // Play audio when currentIndex changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load(); // Reload audio source
            audioRef.current.play().catch((error) => console.error("Playback failed:", error));
        }
    }, [currentIndex]);

    const handlePlayPause = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % suraList.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? suraList.length - 1 : prevIndex - 1
        );
    };

    const handleAudioEnd = () => {
        handleNext();
    };

    if (suraList.length === 0) {
        return <p>Loading sura list...</p>;
    }

    return (
        <div>
            <div>
                <p className="text-base font-medium text-white text-center py-3">Recreation by sura</p>
            </div>
            <div className="audio-player bg-white md:p-5 p-3 flex flex-col items-center justify-center rounded-xl">
                <h2 className="pb-3 text-center text-lg font-medium">Surah {suraList[currentIndex].title}</h2>
                <audio
                    ref={audioRef}
                    controls
                    onEnded={handleAudioEnd}
                >
                    <source src={suraList[currentIndex].src} type="audio/mp3" />
                </audio>

                <div className="controls pt-3 space-y-4 flex flex-col items-center">
                    <div className="flex justify-between">
                        <button
                            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                            onClick={handlePlayPause}
                        >
                            ▶️ Play / ⏸️ Pause
                        </button>
                    </div>
                    <div className="flex justify-between gap-5">
                        <button
                            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                            onClick={handlePrevious}
                        >
                            ⏮️ Previous
                        </button>
                        <button
                            className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                            onClick={handleNext}
                        >
                            ⏭️ Next
                        </button>
                    </div>
                </div>

                <h3
                    className="cursor-pointer mt-4 font-medium text-center hover:text-blue-600 px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
                    onClick={() => setShowTrackList(true)}
                >
                    All Sura's
                </h3>

                {/* Track List Modal */}
                {showTrackList && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg max-h-[80vh] w-full max-w-md overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-semibold">Select a Surah</h3>
                                <button
                                    onClick={() => setShowTrackList(false)}
                                    className="text-gray-500 hover:text-gray-700 text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                            <ul className="space-y-2">
                                {suraList.map((sura, index) => (
                                    <li
                                        key={sura.id}
                                        className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${index === currentIndex ? "font-bold bg-blue-50" : ""
                                            }`}
                                        onClick={() => {
                                            setCurrentIndex(index);
                                            setShowTrackList(false);
                                        }}
                                    >
                                        {sura.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuraAudioPlayer;