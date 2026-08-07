require 'rails_helper'

RSpec.describe "Api::Expenses", type: :request do
  let!(:food_category) { Category.create!(name: "Food") }
  let!(:transport_category) { Category.create!(name: "Transport") }

  describe "GET /api/expenses" do
    let!(:older_date_expense) do
      Expense.create!(
        description: "Lunch",
        amount: 100.00,
        category: food_category,
        date: Date.today - 2.days
      )
    end
    let!(:newer_date_expense) do
      Expense.create!(
        description: "Taxi",
        amount: 50.00,
        category: transport_category,
        date: Date.today
      )
    end
    let!(:same_day_earlier) do
      Expense.create!(
        description: "Coffee",
        amount: 5.00,
        category: food_category,
        date: Date.today - 1.day
      )
    end
    let!(:same_day_later) do
      Expense.create!(
        description: "Dinner",
        amount: 40.00,
        category: food_category,
        date: Date.today - 1.day
      )
    end

    it "returns all expenses with category information" do
      get "/api/expenses"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(4)
    end

    it "returns expenses in descending order by date, then id" do
      # Create an older-dated expense after newer ones so created_at order would differ
      backdated_but_created_last = Expense.create!(
        description: "Backdated",
        amount: 20.00,
        category: food_category,
        date: Date.today - 3.days
      )

      get "/api/expenses"

      json = JSON.parse(response.body)
      ids = json.map { |expense| expense["id"] }

      expect(ids).to eq([
        newer_date_expense.id,
        same_day_later.id,
        same_day_earlier.id,
        older_date_expense.id,
        backdated_but_created_last.id
      ])
    end
  end

  describe "POST /api/expenses" do
    context "with valid parameters" do
      let(:valid_params) do
        {
          expense: {
            description: "Team Lunch",
            amount: 150.50,
            category_id: food_category.id,
            date: Date.today
          }
        }
      end

      it "creates a new expense" do
        expect {
          post "/api/expenses", params: valid_params, as: :json
        }.to change(Expense, :count).by(1)

        expect(response).to have_http_status(:created)
        json = JSON.parse(response.body)
        expect(json["description"]).to eq("Team Lunch")
        expect(json["amount"]).to eq("150.5")
      end
    end

    context "with invalid parameters" do
      it "with negative amounts" do
        invalid_params = {
          expense: {
            description: "Invalid expense",
            amount: -100.00,
            category_id: food_category.id,
            date: Date.today
          }
        }

        expect {
          post "/api/expenses", params: invalid_params, as: :json
        }.to change(Expense, :count).by(1)

        expect(response).to have_http_status(:created)
      end

      it "with empty descriptions" do
        invalid_params = {
          expense: {
            description: "",
            amount: 100.00,
            category_id: food_category.id,
            date: Date.today
          }
        }

        expect {
          post "/api/expenses", params: invalid_params, as: :json
        }.to change(Expense, :count).by(1)

        expect(response).to have_http_status(:created)
      end
    end
  end
end
