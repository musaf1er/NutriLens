import type { FoodAnalysis, FoodRecognitionService, AIProvider } from "./types";
import { OpenAIFoodRecognitionService } from "./openai-provider";

/**
 * Mock provider for development/testing without API keys.
 * Returns realistic-looking fake data.
 */
class MockFoodRecognitionService implements FoodRecognitionService {
  getProviderName(): string {
    return "Mock (Development)";
  }

  async analyzeFoodImage(_imageBase64: string): Promise<FoodAnalysis> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockItems = [
      {
        foodName: "Grilled Chicken Breast",
        estimatedServing: "150g",
        calories: 248,
        protein: 46,
        carbs: 0,
        fat: 5,
        fiber: 0,
        confidence: 92,
      },
      {
        foodName: "White Rice",
        estimatedServing: "200g",
        calories: 260,
        protein: 5,
        carbs: 56,
        fat: 0.5,
        fiber: 0.6,
        confidence: 89,
      },
      {
        foodName: "Mixed Vegetables",
        estimatedServing: "100g",
        calories: 50,
        protein: 2,
        carbs: 10,
        fat: 0.5,
        fiber: 3,
        confidence: 85,
      },
    ];

    return {
      items: mockItems,
      totalCalories: 558,
      totalProtein: 53,
      totalCarbs: 66,
      totalFat: 6,
      totalFiber: 3.6,
      overallConfidence: 89,
      notes: "Mock analysis for development. Connect an AI provider for real results.",
    };
  }
}

/**
 * Factory to create the appropriate AI provider based on configuration.
 */
export function createFoodRecognitionService(
  provider?: AIProvider
): FoodRecognitionService {
  const selectedProvider = provider || (process.env.AI_PROVIDER as AIProvider) || "mock";

  switch (selectedProvider) {
    case "openai":
      if (!process.env.OPENAI_API_KEY) {
        console.warn("OPENAI_API_KEY not set, falling back to mock provider");
        return new MockFoodRecognitionService();
      }
      return new OpenAIFoodRecognitionService();

    case "gemini":
      // TODO: Implement Google Gemini Vision provider
      console.warn("Gemini provider not yet implemented, falling back to mock");
      return new MockFoodRecognitionService();

    case "claude":
      // TODO: Implement Claude Vision provider
      console.warn("Claude provider not yet implemented, falling back to mock");
      return new MockFoodRecognitionService();

    case "mock":
    default:
      return new MockFoodRecognitionService();
  }
}
