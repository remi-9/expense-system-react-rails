class AddEmojiToCategories < ActiveRecord::Migration[7.2]
  DEFAULT_EMOJI = "\u{1F4E6}" # 📦

  EMOJI_BY_NAME = {
    "Food" => "\u{1F354}",
    "Transportation" => "\u{1F697}",
    "Entertainment" => "\u{1F3AC}",
    "Shopping" => "\u{1F6CD}\u{FE0F}",
    "Bills" => "\u{1F4C4}",
    "Healthcare" => "\u{1F3E5}",
    "Education" => "\u{1F4DA}",
    "Travel" => "\u{2708}\u{FE0F}",
    "Personal" => "\u{2728}",
    "Other" => DEFAULT_EMOJI
  }.freeze

  def up
    # Avoid a DB-level emoji default — MySQL/client encoding can corrupt it to "?".
    # Rails assigns Category::DEFAULT_EMOJI in before_validation instead.
    add_column :categories, :emoji, :string, limit: 16

    EMOJI_BY_NAME.each do |name, emoji|
      execute(
        ActiveRecord::Base.sanitize_sql_array(
          [ "UPDATE categories SET emoji = ? WHERE name = ?", emoji, name ]
        )
      )
    end

    execute(
      ActiveRecord::Base.sanitize_sql_array(
        [ "UPDATE categories SET emoji = ? WHERE emoji IS NULL OR emoji = '' OR emoji = ?", DEFAULT_EMOJI, "?" ]
      )
    )

    change_column_null :categories, :emoji, false
  end

  def down
    remove_column :categories, :emoji
  end
end
