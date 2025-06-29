import { useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import {
  SearchBarOverlay,
  SearchBarBox,
  SearchInput,
  SearchClose,
  SearchSuggestionsBox,
  SearchSectionTitle,
  SearchNoResults,
  SearchSuggestionItem,
  SearchSuggestionImage,
  SearchSuggestionName,
  SearchSuggestionsGrid,
  SearchSuggestionText,
  SearchSuggestionDesc,
} from "./HeaderStyled";
import products from "../data/product.json";
import { useImagePath } from "../context/ImagePathContext";

const SearchBar = ({ isOpen, onClose }) => {
  const inputRef = useRef(null);
  const overlayRef = useRef(null);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const imagePath = useImagePath();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
    setQuery("");
    setFiltered([]);
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
      return;
    }
    const q = query.toLowerCase();
    setFiltered(
      products.filter(
        (p) =>
          typeof p.productName === "string" &&
          p.productName.toLowerCase().includes(q)
      )
    );
  }, [query]);

  useEffect(() => {
    const handleClick = (e) => {
      if (overlayRef.current && e.target === overlayRef.current) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  return (
    <SearchBarOverlay $isOpen={isOpen} ref={overlayRef}>
      <SearchBarBox>
        <Icon icon="tabler:search" width={28} />
        <SearchInput
          ref={inputRef}
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchClose onClick={onClose} aria-label="Close">
          &times;
        </SearchClose>
      </SearchBarBox>
      {query && (
        <SearchSuggestionsBox>
          <SearchSectionTitle>PRODUCTS</SearchSectionTitle>
          {filtered.length === 0 && (
            <SearchNoResults>No results found.</SearchNoResults>
          )}
          <SearchSuggestionsGrid>
            {filtered.map((p) => (
              <SearchSuggestionItem
                key={p.id}
                tabIndex={0}
                onClick={() => {
                  navigate(`/product/${p.id}`);
                  onClose();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/product/${p.id}`);
                    onClose();
                  }
                }}
              >
                {" "}
                <SearchSuggestionImage
                  src={
                    p.thumbnail
                      ? `${imagePath}${p.thumbnail}`
                      : `${imagePath}${p.image || ""}`
                  }
                  alt={p.productName}
                />
                <SearchSuggestionText>
                  <SearchSuggestionName>{p.productName}</SearchSuggestionName>
                  <SearchSuggestionDesc>{p.description}</SearchSuggestionDesc>
                </SearchSuggestionText>
              </SearchSuggestionItem>
            ))}
          </SearchSuggestionsGrid>
        </SearchSuggestionsBox>
      )}
    </SearchBarOverlay>
  );
};

export default SearchBar;
