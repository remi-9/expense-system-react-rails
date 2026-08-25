require 'rails_helper'

RSpec.describe Category, type: :model do
  describe "emoji validation" do
    it "assigns a default emoji when blank" do
      category = Category.create!(name: "Utilities")

      expect(category.emoji).to eq(Category::DEFAULT_EMOJI)
    end

    it "rejects an emoji outside the allowed preset list" do
      category = Category.new(name: "Utilities", emoji: "🚀")

      expect(category).not_to be_valid
      expect(category.errors[:emoji]).to be_present
    end

    it "accepts an allowed emoji" do
      category = Category.new(name: "Utilities", emoji: "💡")

      expect(category).to be_valid
    end
  end
end
