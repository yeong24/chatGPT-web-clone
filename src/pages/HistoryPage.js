import { useState } from "react";

const tempList = [
  {
    title: "title1",
    contents: "contents1",
  },
  {
    title: "title2",
    contents: "contents2",
  },
  {
    title: "title3",
    contents: "contents3",
  },
  {
    title: "title4",
    contents: "contents4",
  },
  {
    title: "title5",
    contents: "contents5",
  },
];

const HistoryPage = ({ isHistoryOpen = false }) => {
  const [historyList, setHistoryList] = useState(tempList);

  return (
    <>
      <div className={`history-container ${isHistoryOpen ? "active-1" : ""}`}>
        <h3 className="history-title">History</h3>
        {/* 히스토리 리스트 */}
        <div className="history-list">
          {/* 히스토리 내용 */}
          {historyList.length === 0 ? (
            <p>Your history items go here.</p>
          ) : (
            <ul>
              {historyList.map((item, idx) => (
                <li key={idx}>{item.title}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
