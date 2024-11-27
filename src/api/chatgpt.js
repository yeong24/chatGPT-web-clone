import axios from "axios";
import config from "../config"; // 중앙 관리된 API 키 가져오기

// IP 주소 가져오기 함수
const fetchIPAddress = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Failed to fetch IP address:", error);
    return "unknown"; // IP 주소를 가져올 수 없을 경우 기본값
  }
};

// 브라우저 정보 가져오기 함수
const getBrowserInfo = () => {
  return navigator.userAgent; // 브라우저 정보 반환
};

const chatgptAPI = async (
  messages,
  model = "gpt-3.5-turbo",
  onStreamUpdate
) => {
  const endpoint = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${config.OPENAI_API_KEY}`, // 중앙 관리된 API 키 사용
  };

  // IP 주소 및 브라우저 정보 가져오기
  const ipAddress = await fetchIPAddress();
  const browserInfo = getBrowserInfo();

  const data = {
    model: model,
    messages: messages, // 전체 메시지 기록 전송
    user: `IP: ${ipAddress}, Browser: ${browserInfo}`, // 사용자 정보 포함
    stream: true, // 스트림 활성화
  };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;
    let result = "";

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonData = line.substring(6).trim();
            if (jsonData === "[DONE]") {
              done = true;
              break;
            }

            try {
              const parsedData = JSON.parse(jsonData);
              const token = parsedData.choices[0]?.delta?.content;
              if (token) {
                result += token;
                onStreamUpdate(result); // 실시간 업데이트 콜백 호출
              }
            } catch (error) {
              console.error("Error parsing stream data:", error);
            }
          }
        }
      }
    }

    return result;
  } catch (error) {
    console.error("Error fetching ChatGPT stream:", error);
    throw error;
  }
};

export default chatgptAPI;
