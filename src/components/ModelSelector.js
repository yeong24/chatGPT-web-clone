import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config"; // 중앙 관리된 API 키 가져오기

const ModelSelector = ({ selectedModel, onModelChange }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get("https://api.openai.com/v1/models", {
          headers: {
            Authorization: `Bearer ${config.OPENAI_API_KEY}`, // 중앙 관리된 API 키 사용
          },
        });

        // 모델 데이터 필터링 (사용 가능한 모델만 표시)
        const availableModels = response.data.data
          .filter(
            (model) => model.id.includes("gpt") || model.id.includes("o1")
          ) // GPT 관련 및 o1 포함하는 모델
          .sort((a, b) => (a.id.startsWith("chatgpt-4o-latest") ? -1 : 1)) // o1-mini로 시작하는 모델을 먼저 표시
          .map((model) => ({ id: model.id, name: model.id }));

        setModels(availableModels);
        setLoading(false);

        // 첫 번째 모델 자동 선택
        if (availableModels.length > 0) {
          onModelChange(availableModels[0].id);
        }
      } catch (error) {
        console.error("Error fetching models:", error);
        setLoading(false);
      }
    };

    fetchModels();
  }, [onModelChange]);

  if (loading) {
    return <p>Loading models...</p>;
  }

  return (
    <div style={{ marginBottom: "20px" }}>
      <label htmlFor="model-select" style={{ marginRight: "10px" }}>
        Select Model:
      </label>
      <select
        id="model-select"
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        style={{ padding: "5px", fontSize: "16px" }}
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelector;
