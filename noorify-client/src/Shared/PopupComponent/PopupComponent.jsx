import { useState, useEffect } from "react";

function PopupComponent() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const popupSeen = localStorage.getItem("popupSeen"); // LocalStorage চেক
    const sessionPopup = sessionStorage.getItem("popupSeen"); // SessionStorage চেক

    if (!popupSeen && !sessionPopup) {
      setShowPopup(true);
    }

    // ট্যাব ক্লোজ হলে লোকাল স্টোরেজ মুছে ফেলবে
    const handleTabClose = () => {
      localStorage.removeItem("popupSeen");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem("popupSeen", "true"); // লোকাল স্টোরেজে সেভ
    sessionStorage.setItem("popupSeen", "true"); // বর্তমান ট্যাবের জন্য সেভ
  };

  return (
    <div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg text-center">
            <h2 className="text-xl font-bold">Welcome to My Website</h2>
            <p>This is a pop-up message.</p>
            <button
              onClick={handleClose}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupComponent;
