class Category < ApplicationRecord
  # Prefer Unicode escapes so validation matches DB defaults across encodings.
  DEFAULT_EMOJI = "\u{1F4E6}" # 📦
  ALLOWED_EMOJIS = [
    "\u{1F354}",                 # 🍔
    "\u{1F697}",                 # 🚗
    "\u{1F3AC}",                 # 🎬
    "\u{1F6CD}\u{FE0F}",         # 🛍️
    "\u{1F4C4}",                 # 📄
    "\u{1F3E5}",                 # 🏥
    "\u{1F4DA}",                 # 📚
    "\u{2708}\u{FE0F}",          # ✈️
    "\u{1F4E6}",                 # 📦
    "\u{2728}",                  # ✨
    "\u{1F4A1}",                 # 💡
    "\u{1F3E0}",                 # 🏠
    "\u{2615}",                  # ☕
    "\u{1F3AE}",                 # 🎮
    "\u{1F3B5}"                  # 🎵
  ].freeze

  has_many :expenses, dependent: :destroy

  before_validation :normalize_name
  before_validation :assign_default_emoji

  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :emoji, presence: true, inclusion: { in: ALLOWED_EMOJIS }

  private

  def normalize_name
    self.name = name.strip if name.present?
  end

  def assign_default_emoji
    self.emoji = DEFAULT_EMOJI if emoji.blank?
  end
end
