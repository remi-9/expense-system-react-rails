require 'rails_helper'

RSpec.describe "Api::Expenses", type: :request do
  let!(:food_category) { Category.create!(name: "Food") }
  let!(:transport_category) { Category.create!(name: "Transport") }

  describe "GET /api/expenses" do
  let!(:expense1) { Expense.create!(description: "Lunch", amount: 100.00, category: food_category, date: Date.today) }
  let!(:expense2) { Expense.create!(description: "Taxi", amount: 50.00, category: transport_category, date: Date.today) }

    it "returns all expenses with category information" do
      get "/api/expenses"

      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json.length).to eq(2)
    end

    it "returns expenses in descending order by created_at" do
      get "/api/expenses"

      json = JSON.parse(response.body)
      expect(json.first["id"]).to eq(expense2.id)
      expect(json.last["id"]).to eq(expense1.id)
    end

    context "when filtering by year and month" do
      let!(:july_expense) do
        Expense.create!(
          description: "July grocery",
          amount: 25.00,
          category: food_category,
          date: Date.new(2026, 7, 15)
        )
      end

      let!(:august_dated_expense) do
        Expense.create!(
          description: "August dinner",
          amount: 40.00,
          category: food_category,
          date: Date.new(2026, 8, 1)
        )
      end

      it "filters by expense date, not created_at" do
        # Simulate a July-dated expense that was created in August
        july_expense.update_columns(created_at: Time.zone.local(2026, 8, 5, 12, 0, 0))

        get "/api/expenses", params: { year: 2026, month: 7 }

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        ids = json.map { |expense| expense["id"] }

        expect(ids).to include(july_expense.id)
        expect(ids).not_to include(august_dated_expense.id)
      end

      it "includes expenses whose date falls in the selected month" do
        get "/api/expenses", params: { year: 2026, month: 8 }

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        ids = json.map { |expense| expense["id"] }

        expect(ids).to include(august_dated_expense.id)
        expect(ids).not_to include(july_expense.id)
      end
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
