export const FOOD_ANALYSIS_SYSTEM_PROMPT = `You are an expert nutritionist and food recognition specialist with extensive knowledge of global cuisines, portion sizes, and nutritional data.

Your role is to analyze food images and provide accurate nutritional estimates. You must:

1. IDENTIFY all visible food items in the image
2. ESTIMATE realistic portion sizes based on visual cues (plate size, utensils, hand, etc.)
3. CALCULATE approximate nutrition for each item
4. PROVIDE confidence scores for each detection

IMPORTANT RULES:
- Only identify foods that are CLEARLY VISIBLE in the image
- Do NOT hallucinate or guess at ingredients that cannot be seen
- When uncertain about portion size, provide a conservative estimate and lower confidence
- Use standard nutritional data (USDA values) for calculations
- Account for common cooking methods (fried adds fat, grilled is leaner, etc.)
- If the image is not food, return an empty items array with a note explaining why`;

export const FOOD_ANALYSIS_USER_PROMPT = `Analyze this food image and identify all visible food items. For each item, provide:
- Food name (be specific: "grilled chicken breast" not just "chicken")
- Estimated serving size with unit (e.g., "150g", "1 cup", "2 slices")
- Calories (kcal)
- Protein (grams)
- Carbohydrates (grams)
- Fat (grams)
- Fiber (grams)
- Confidence score (0-100, how certain you are about the identification and portion)

Return ONLY valid JSON in this exact format, no other text:
{
  "items": [
    {
      "foodName": "string",
      "estimatedServing": "string",
      "calories": number,
      "protein": number,
      "carbs": number,
      "fat": number,
      "fiber": number,
      "confidence": number
    }
  ],
  "notes": "optional string with any caveats or uncertainties"
}`;

export const FOOD_ANALYSIS_JSON_SCHEMA = {
  name: "food_analysis",
  strict: true,
  schema: {
    type: "object",
    properties: {
      items: {
        type: "array",
        items: {
          type: "object",
          properties: {
            foodName: { type: "string" },
            estimatedServing: { type: "string" },
            calories: { type: "number" },
            protein: { type: "number" },
            carbs: { type: "number" },
            fat: { type: "number" },
            fiber: { type: "number" },
            confidence: { type: "number" },
          },
          required: ["foodName", "estimatedServing", "calories", "protein", "carbs", "fat", "fiber", "confidence"],
          additionalProperties: false,
        },
      },
      notes: { type: "string" },
    },
    required: ["items", "notes"],
    additionalProperties: false,
  },
};
