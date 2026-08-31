export interface FoodItem {
  foodName: string;
  estimatedServing: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  confidence: number;
}

export interface FoodAnalysis {
  items: FoodItem[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalFiber: number;
  overallConfidence: number;
  notes?: string;
}

export interface FoodRecognitionService {
  analyzeFoodImage(imageBase64: string): Promise<FoodAnalysis>;
  getProviderName(): string;
}

export type AIProvider = "openai" | "gemini" | "claude" | "mock";

export interface ScanResult {
  id: string;
  imageData: string;
  status: "PENDING" | "ANALYZING" | "COMPLETED" | "FAILED";
  analysis?: FoodAnalysis;
  errorMessage?: string;
  createdAt: string;
}

export function getConfidenceLevel(confidence: number): {
  label: string;
  color: string;
  textColor: string;
} {
  if (confidence >= 90) {
    return { label: "High", color: "bg-emerald-500/20", textColor: "text-emerald-400" };
  }
  if (confidence >= 70) {
    return { label: "Moderate", color: "bg-amber-500/20", textColor: "text-amber-400" };
  }
  return { label: "Low", color: "bg-red-500/20", textColor: "text-red-400" };
}
