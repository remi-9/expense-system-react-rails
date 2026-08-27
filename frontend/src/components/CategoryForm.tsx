/**
 * Form component for adding categories
 */

import React, { useState } from "react";
import { CategoryFormData } from "../types";
import {
  CATEGORY_EMOJI_PRESETS,
  DEFAULT_CATEGORY_EMOJI,
} from "../constants/categoryEmojis";
import { COLORS } from "../constants/colors";
import { COPY } from "../constants/copy";
import { FONTS } from "../constants/fonts";
import { TextField, Button } from "../vibes";

interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel?: () => void;
}

export function CategoryForm({ onSubmit, onCancel }: CategoryFormProps) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState<string>(DEFAULT_CATEGORY_EMOJI);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  };

  const emojiLabelStyle: React.CSSProperties = {
    fontSize: "0.72rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontFamily: FONTS.mono,
    color: COLORS.text.primary,
    marginBottom: "0.5rem",
  };

  const emojiGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
    gap: "0.5rem",
  };

  const emojiButtonStyle = (selected: boolean): React.CSSProperties => ({
    fontSize: "1.25rem",
    lineHeight: 1,
    padding: "0.5rem",
    borderRadius: "2px",
    border: `2px solid ${selected ? COLORS.copper : COLORS.ink}`,
    backgroundColor: selected ? COLORS.primary.p01 : COLORS.cream,
    cursor: "pointer",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Category name is required");
      return;
    }

    setIsSubmitting(true);
    setError(undefined);
    try {
      await onSubmit({ name: trimmedName, emoji });
      setName("");
      setEmoji(DEFAULT_CATEGORY_EMOJI);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create category";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <TextField
        label="Category Name"
        placeholder={COPY.categoryPlaceholder}
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
          if (error) {
            setError(undefined);
          }
        }}
        error={error}
        fullWidth
        required
      />

      <div>
        <div style={emojiLabelStyle}>{COPY.emojiLabel}</div>
        <div
          style={emojiGridStyle}
          role="radiogroup"
          aria-label="Category emoji"
        >
          {CATEGORY_EMOJI_PRESETS.map((preset) => {
            const selected = emoji === preset;
            return (
              <button
                key={preset}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`Select emoji ${preset}`}
                style={emojiButtonStyle(selected)}
                onClick={() => setEmoji(preset)}
                disabled={isSubmitting}
              >
                {preset}
              </button>
            );
          })}
        </div>
      </div>

      <div style={buttonGroupStyle}>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? COPY.adding : COPY.saveCategory}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
