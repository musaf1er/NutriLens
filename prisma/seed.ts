import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create default user
  const user = await prisma.user.upsert({
    where: { email: "user@calorieai.app" },
    update: {},
    create: {
      name: "Alex",
      email: "user@calorieai.app",
      dailyCalorieGoal: 2000,
      dailyProteinGoal: 150,
      dailyCarbsGoal: 250,
      dailyFatGoal: 65,
    },
  });

  console.log(`✅ Created user: ${user.name} (${user.id})`);

  // Create some sample meals for the past 7 days
  const mealTypes = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];
  const sampleMeals = [
    {
      name: "Morning Oatmeal",
      mealType: "BREAKFAST",
      items: [
        { foodName: "Oatmeal", calories: 150, protein: 5, carbs: 27, fat: 3, fiber: 4, servingSize: 1, servingUnit: "cup" },
        { foodName: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, fiber: 3.1, servingSize: 1, servingUnit: "medium" },
        { foodName: "Honey", calories: 64, protein: 0, carbs: 17, fat: 0, fiber: 0, servingSize: 1, servingUnit: "tbsp" },
      ],
    },
    {
      name: "Grilled Chicken Salad",
      mealType: "LUNCH",
      items: [
        { foodName: "Grilled Chicken Breast", calories: 248, protein: 46, carbs: 0, fat: 5, fiber: 0, servingSize: 150, servingUnit: "g" },
        { foodName: "Mixed Greens", calories: 20, protein: 2, carbs: 3, fat: 0.3, fiber: 2, servingSize: 100, servingUnit: "g" },
        { foodName: "Cherry Tomatoes", calories: 27, protein: 1.3, carbs: 5.8, fat: 0.3, fiber: 1.8, servingSize: 150, servingUnit: "g" },
        { foodName: "Olive Oil Dressing", calories: 120, protein: 0, carbs: 0, fat: 14, fiber: 0, servingSize: 1, servingUnit: "tbsp" },
      ],
    },
    {
      name: "Salmon & Rice Bowl",
      mealType: "DINNER",
      items: [
        { foodName: "Grilled Salmon", calories: 367, protein: 34, carbs: 0, fat: 22, fiber: 0, servingSize: 200, servingUnit: "g" },
        { foodName: "Brown Rice", calories: 216, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5, servingSize: 1, servingUnit: "cup" },
        { foodName: "Steamed Broccoli", calories: 55, protein: 3.7, carbs: 11, fat: 0.6, fiber: 5.1, servingSize: 150, servingUnit: "g" },
      ],
    },
    {
      name: "Protein Shake",
      mealType: "SNACK",
      items: [
        { foodName: "Whey Protein", calories: 120, protein: 24, carbs: 3, fat: 1, fiber: 0, servingSize: 1, servingUnit: "scoop" },
        { foodName: "Almond Milk", calories: 30, protein: 1, carbs: 1, fat: 2.5, fiber: 0.5, servingSize: 1, servingUnit: "cup" },
      ],
    },
  ];

  // Create meals for the past 7 days
  for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
    const date = new Date();
    date.setDate(date.getDate() - dayOffset);
    date.setHours(0, 0, 0, 0);

    // Pick 2-4 random meals per day
    const mealsToday = dayOffset === 0 ? 2 : Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < mealsToday; i++) {
      const sampleMeal = sampleMeals[i % sampleMeals.length];
      // Add slight calorie variation
      const variation = 0.85 + Math.random() * 0.3;

      const items = sampleMeal.items.map((item) => ({
        ...item,
        calories: Math.round(item.calories * variation),
        protein: Math.round(item.protein * variation * 10) / 10,
        carbs: Math.round(item.carbs * variation * 10) / 10,
        fat: Math.round(item.fat * variation * 10) / 10,
        quantity: 1,
      }));

      const totalCalories = items.reduce((sum, item) => sum + item.calories, 0);
      const totalProtein = items.reduce((sum, item) => sum + item.protein, 0);
      const totalCarbs = items.reduce((sum, item) => sum + item.carbs, 0);
      const totalFat = items.reduce((sum, item) => sum + item.fat, 0);
      const totalFiber = items.reduce((sum, item) => sum + item.fiber, 0);

      const mealDate = new Date(date);
      mealDate.setHours(8 + i * 4);

      await prisma.meal.create({
        data: {
          userId: user.id,
          name: sampleMeal.name,
          mealType: sampleMeal.mealType,
          totalCalories,
          totalProtein,
          totalCarbs,
          totalFat,
          totalFiber,
          date: mealDate,
          items: {
            create: items,
          },
        },
      });
    }
  }

  console.log("✅ Created sample meals for past 7 days");

  // Create weight entries for the past 30 days
  const startWeight = 82;
  for (let dayOffset = 30; dayOffset >= 0; dayOffset--) {
    const date = new Date();
    date.setDate(date.getDate() - dayOffset);
    date.setHours(7, 0, 0, 0);

    // Simulate gradual weight loss with some noise
    const progress = (30 - dayOffset) / 30;
    const noise = (Math.random() - 0.5) * 0.6;
    const weight = Math.round((startWeight - progress * 2.5 + noise) * 10) / 10;

    await prisma.weightEntry.create({
      data: {
        userId: user.id,
        weight,
        unit: "kg",
        date,
      },
    });
  }

  console.log("✅ Created weight entries for past 30 days");
  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
