import OpenAI from "openai";
import type { FoodAnalysis, FoodRecognitionService } from "./types";
import {
  FOOD_ANALYSIS_SYSTEM_PROMPT,
  FOOD_ANALYSIS_USER_PROMPT,
  FOOD_ANALYSIS_JSON_SCHEMA,
} from "./prompt";

export class OpenAIFoodRecognitionService implements FoodRecognitionService {
  private client: OpenAI;
  private model: string;

  constructor(apiKey?: string, model: string = "gpt-4o") {
    this.client = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
    });
    this.model = model;
  }

  getProviderName(): string {
    return `OpenAI (${this.model})`;
  }

  async analyzeFoodImage(imageBase64: string): Promise<FoodAnalysis> {
    try {
      // Ensure we have a proper data URL
      const imageUrl = imageBase64.startsWith("data:")
        ? imageBase64
        : `data:image/jpeg;base64,${imageBase64}`;

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: "system",
            content: FOOD_ANALYSIS_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: FOOD_ANALYSIS_USER_PROMPT,
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                  detail: "high",
                },
              },
            ],
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: FOOD_ANALYSIS_JSON_SCHEMA,
        },
        max_tokens: 2000,
        temperature: 0.1,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error("No response from AI model");
      }

      const parsed = JSON.parse(content);

      // Calculate totals
      const items = parsed.items || [];
      const totalCalories = items.reduce(
        (sum: number, item: { calories: number }) => sum + item.calories,
        0
      );
      const totalProtein = items.reduce(
        (sum: number, item: { protein: number }) => sum + item.protein,
        0
      );
      const totalCarbs = items.reduce(
        (sum: number, item: { carbs: number }) => sum + item.carbs,
        0
      );
      const totalFat = items.reduce(
        (sum: number, item: { fat: number }) => sum + item.fat,
        0
      );
      const totalFiber = items.reduce(
        (sum: number, item: { fiber: number }) => sum + item.fiber,
        0
      );
      const overallConfidence =
        items.length > 0
          ? Math.round(
              items.reduce(
                (sum: number, item: { confidence: number }) =>
                  sum + item.confidence,
                0
              ) / items.length
            )
          : 0;

      return {
        items,
        totalCalories: Math.round(totalCalories),
        totalProtein: Math.round(totalProtein * 10) / 10,
        totalCarbs: Math.round(totalCarbs * 10) / 10,
        totalFat: Math.round(totalFat * 10) / 10,
        totalFiber: Math.round(totalFiber * 10) / 10,
        overallConfidence,
        notes: parsed.notes,
      };
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        throw new Error(`OpenAI API error: ${error.message}`);
      }
      throw error;
    }
  }
}
