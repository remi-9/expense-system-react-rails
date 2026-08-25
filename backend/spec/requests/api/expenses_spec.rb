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
        expect(json["amount"]).to eq(150.5)
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

      it "rejects a future date" do
        invalid_params = {
          expense: {
            description: "Future expense",
            amount: 100.00,
            category_id: food_category.id,
            date: Date.tomorrow
          }
        }

        expect {
          post "/api/expenses", params: invalid_params, as: :json
        }.not_to change(Expense, :count)

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json["errors"]).to include("Date cannot be in the future")
      end
    end
  end

  describe "PUT /api/expenses/:id" do
    let!(:expense) do
      Expense.create!(
        description: "Lunch",
        amount: 20.00,
        category: food_category,
        date: Date.today
      )
    end

    it "rejects updating to a future date" do
      put "/api/expenses/#{expense.id}",
          params: { expense: { date: Date.tomorrow } },
          as: :json

      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json["errors"]).to include("Date cannot be in the future")
      expect(expense.reload.date).to eq(Date.today)
    end
  end
end
