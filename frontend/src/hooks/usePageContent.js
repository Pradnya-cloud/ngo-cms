import { useEffect, useState } from "react";
import { api } from "../utils/apiClient";

function parseContent(value) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return value;
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return value;
    }
  }
  return value;
}

function getBlocks(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.results)) return response.results;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.blocks)) return response.blocks;
  return [];
}

function mergePageData(fallbackData, blocks) {
  if (!blocks.length) return fallbackData;

  return blocks.reduce((merged, block) => {
    const section = block?.section || block?.type || "content";
    const value = parseContent(block?.content ?? block?.value ?? block);
    merged[section] = value;
    if (!merged.blocks) merged.blocks = [];
    merged.blocks.push({ ...block, content: value });
    return merged;
  }, { ...fallbackData });
}

export function usePageContent(pageType, fallbackData) {
  const [state, setState] = useState({
    content: fallbackData,
    blocks: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;
    setState({ content: fallbackData, blocks: [], loading: true, error: null });

    api
      .get(`/content/?page_type=${encodeURIComponent(pageType)}`)
      .then((response) => {
        if (!active) return;
        const blocks = getBlocks(response);
        setState({
          content: mergePageData(fallbackData, blocks),
          blocks,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        if (!active) return;
        setState({
          content: fallbackData,
          blocks: [],
          loading: false,
          error: error?.message || "Unable to load this page right now.",
        });
      });

    return () => {
      active = false;
    };
  }, [pageType, fallbackData]);

  return state;
}

export function getSection(content, section, fallback = null) {
  const value = content?.[section];
  return value === undefined || value === null || value === "" ? fallback : value;
}
