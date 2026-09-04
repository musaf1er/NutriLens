<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Food;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Nutrition values are practical seed estimates for the MVP, not medical advice.
        // Food-101 compatible labels for AI model integration.
        foreach ([
            // Original 10
            ['Pizza', 'pizza', 266, 11, 33, 10],
            ['Apple Pie', 'apple_pie', 237, 2, 34, 11],
            ['Hamburger', 'hamburger', 295, 17, 24, 16],
            ['Fried Rice', 'fried_rice', 163, 4, 25, 5],
            ['Grilled Chicken', 'chicken_wings', 203, 31, 0, 8],
            ['Sushi', 'sushi', 150, 6, 30, 1],
            ['Spaghetti Bolognese', 'spaghetti_bolognese', 158, 6, 18, 6],
            ['Ice Cream', 'ice_cream', 207, 4, 24, 11],
            ['Salad', 'caesar_salad', 127, 7, 8, 8],
            ['French Fries', 'french_fries', 312, 3, 41, 15],
            
            // Additional foods
            ['Bacon', 'bacon', 541, 37, 1, 43],
            ['Baklava', 'baklava', 353, 6, 41, 18],
            ['Banana Split', 'banana_split', 342, 6, 43, 17],
            ['Beef Carpaccio', 'beef_carpaccio', 143, 26, 0, 5],
            ['Beef Steak', 'beef_steak', 271, 26, 0, 18],
            ['Beet Salad', 'beet_salad', 82, 3, 15, 2],
            ['Beignets', 'beignets', 309, 4, 37, 16],
            ['Bibimbap', 'bibimbap', 186, 9, 27, 4],
            ['Bread Pudding', 'bread_pudding', 205, 6, 28, 8],
            ['Breakfast Burrito', 'breakfast_burrito', 278, 15, 32, 10],
            
            ['Bruschetta', 'bruschetta', 188, 5, 22, 9],
            ['Caesar Salad', 'caesar_salad', 127, 7, 8, 8],
            ['Cake', 'cake', 387, 4, 48, 20],
            ['Calzone', 'calzone', 252, 10, 28, 11],
            ['Cannoli', 'cannoli', 357, 7, 39, 18],
            ['Caprese Salad', 'caprese_salad', 112, 4, 6, 8],
            ['Carrot Cake', 'carrot_cake', 395, 4, 48, 21],
            ['Ceviche', 'ceviche', 92, 18, 3, 1],
            ['Cheese Burger', 'cheese_burger', 354, 18, 27, 20],
            ['Cheesecake', 'cheesecake', 321, 7, 26, 23],
            
            ['Chicken Curry', 'chicken_curry', 143, 14, 8, 5],
            ['Chicken Parmesan', 'chicken_parmesan', 282, 24, 18, 12],
            ['Chicken Quesadilla', 'chicken_quesadilla', 267, 16, 24, 11],
            ['Chicken Tikka Masala', 'chicken_tikka_masala', 186, 16, 9, 9],
            ['Chocolate Cake', 'chocolate_cake', 405, 4, 50, 21],
            ['Chocolate Mousse', 'chocolate_mousse', 281, 5, 23, 20],
            ['Churros', 'churros', 365, 3, 42, 20],
            ['Clam Chowder', 'clam_chowder', 98, 6, 8, 4],
            ['Club Sandwich', 'club_sandwich', 294, 16, 28, 13],
            ['Cobb Salad', 'cobb_salad', 187, 14, 8, 12],
            
            ['Cookies and Cream', 'cookies_and_cream', 286, 4, 30, 17],
            ['Crab Cakes', 'crab_cakes', 280, 18, 16, 14],
            ['Creme Brulee', 'creme_brulee', 293, 5, 25, 19],
            ['Crepes', 'crepes', 235, 5, 30, 10],
            ['Crispy Chicken', 'crispy_chicken', 320, 24, 20, 16],
            ['Croissant', 'croissant', 406, 9, 40, 23],
            ['Croque Monsieur', 'croque_monsieur', 352, 18, 28, 18],
            ['Crudités', 'crudites', 42, 2, 8, 0],
            ['Cucumber Salad', 'cucumber_salad', 45, 1, 8, 0],
            ['Cupcakes', 'cupcakes', 380, 3, 48, 19],
            
            ['Deviled Eggs', 'deviled_eggs', 178, 13, 1, 14],
            ['Dosa', 'dosa', 168, 4, 26, 5],
            ['Double Chocolate Brownie', 'double_chocolate_brownie', 415, 4, 52, 22],
            ['Dumplings', 'dumplings', 214, 9, 28, 7],
            ['Edamame', 'edamame', 95, 11, 7, 4],
            ['Eggs Benedict', 'eggs_benedict', 267, 11, 16, 18],
            ['Eggplant Parmesan', 'eggplant_parmesan', 156, 8, 12, 8],
            ['Escargots', 'escargots', 62, 11, 2, 1],
            ['Falafel', 'falafel', 333, 13, 29, 17],
            ['Falafels', 'falafels', 333, 13, 29, 17],
            
            ['Filet Mignon', 'filet_mignon', 291, 28, 0, 20],
            ['Fish and Chips', 'fish_and_chips', 285, 14, 28, 14],
            ['Fish Tacos', 'fish_tacos', 280, 15, 28, 12],
            ['Foie Gras', 'foie_gras', 453, 7, 2, 46],
            ['Fried Calamari', 'fried_calamari', 299, 20, 20, 15],
            ['Fried Egg', 'fried_egg', 178, 13, 1, 14],
            ['Fried Green Tomatoes', 'fried_green_tomatoes', 198, 2, 18, 12],
            ['Fried Okra', 'fried_okra', 245, 3, 22, 15],
            ['Fried Squid', 'fried_squid', 299, 20, 20, 15],
            ['Fruit Salad', 'fruit_salad', 62, 1, 15, 0],
            
            ['Garlic Bread', 'garlic_bread', 350, 8, 38, 17],
            ['Gnocchi', 'gnocchi', 180, 6, 35, 1],
            ['Goat Cheese Salad', 'goat_cheese_salad', 156, 8, 10, 10],
            ['Grapes', 'grapes', 67, 1, 17, 0],
            ['Greek Salad', 'greek_salad', 119, 4, 9, 8],
            ['Green Beans', 'green_beans', 31, 2, 7, 0],
            ['Green Salad', 'green_salad', 45, 2, 8, 0],
            ['Grilled Salmon', 'grilled_salmon', 280, 25, 0, 20],
            ['Grilled Vegetables', 'grilled_vegetables', 82, 3, 14, 2],
            ['Guacamole', 'guacamole', 160, 2, 9, 15],
            
            ['Gyro', 'gyro', 288, 18, 28, 12],
            ['Halibut', 'halibut', 111, 21, 0, 2],
            ['Ham and Cheese Croissant', 'ham_and_cheese_croissant', 386, 12, 32, 22],
            ['Hamburger', 'hamburger', 295, 17, 24, 16],
            ['Hand-Rolled Sushi', 'hand_rolled_sushi', 150, 6, 30, 1],
            ['Hard Boiled Egg', 'hard_boiled_egg', 155, 13, 1, 11],
            ['Hash Browns', 'hash_browns', 257, 3, 28, 15],
            ['Heirloom Tomato Salad', 'heirloom_tomato_salad', 76, 1, 14, 1],
            ['Hexagon Cheese', 'hexagon_cheese', 402, 25, 1, 33],
            ['Honey Vinaigrette Chicken', 'honey_vinaigrette_chicken', 186, 24, 10, 6],
            
            ['Hot and Sour Soup', 'hot_and_sour_soup', 56, 4, 6, 1],
            ['Hot Dog', 'hot_dog', 290, 12, 22, 17],
            ['Huevos Rancheros', 'huevos_rancheros', 198, 10, 16, 10],
            ['Hummus', 'hummus', 166, 5, 14, 9],
            ['Ice Cream', 'ice_cream', 207, 4, 24, 11],
            ['Idiyappam', 'idiyappam', 155, 3, 32, 1],
            ['Inari', 'inari', 180, 6, 32, 2],
            ['Indian Food', 'indian_food', 186, 16, 9, 9],
            ['Italian Food', 'italian_food', 208, 8, 28, 8],
            ['Jalapeño Poppers', 'jalapeno_poppers', 286, 12, 18, 18],
        ] as [$name, $label, $calories, $protein, $carbohydrate, $fat]) {
            Food::updateOrCreate(['food101_label' => $label], ['food_name' => $name, 'calories_per_100g' => $calories, 'protein' => $protein, 'carbohydrate' => $carbohydrate, 'fat' => $fat]);
        }
    }
}
