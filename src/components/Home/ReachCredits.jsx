import React from "react";

const ReachCredits = ({ reachCredits, handleBuyCredits }) => {
  return (
    <div className="bg-yellow-100 p-4 rounded-2xl shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <p className="text-sm font-semibold text-yellow-800">Reach Credits</p>
        <p className="text-2xl font-bold text-yellow-900">
          {reachCredits.total - reachCredits.used} / {reachCredits.total}
        </p>
        <div className="w-full bg-yellow-300 rounded-full h-3 mt-2">
          <div
            className="bg-yellow-500 h-3 rounded-full transition-all"
            style={{
              width: `${((reachCredits.total - reachCredits.used) / reachCredits.total) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      <button
        onClick={handleBuyCredits}
        className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
      >
        Buy More Credits
      </button>
    </div>
  );
};

export default ReachCredits;
