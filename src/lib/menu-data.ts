import classicChickenBurger from "@/assets/classic-chicken-burger.png.asset.json";
import burger from "@/assets/Burger.png.asset.json";
import coke from "@/assets/Coke.png.asset.json";
import fanta from "@/assets/Fanta.png.asset.json";
import coleslaw from "@/assets/Cosslaw.png.asset.json";
import friedChicken from "@/assets/Fried Chicken.png.asset.json";
import friedYam from "@/assets/Fried Yam.png.asset.json";
import moiMoi from "@/assets/Moi-Moi.png.asset.json";
import pepperSauce from "@/assets/Pepper Sauce.png.asset.json";
import plantain from "@/assets/Plantain.png.asset.json";
import potatoFries from "@/assets/Potato Fries.png.asset.json";
import spag from "@/assets/Spag.png.asset.json";
import tableWater from "@/assets/Table Water.png.asset.json";
import thePot from "@/assets/The Pot.png.asset.json";
import bread from "@/assets/Bread.png.asset.json";
import friedRice from "@/assets/fried rice.png.asset.json";
import jollofChicken from "@/assets/jollof rice and chicken.png.asset.json";
import jollofRice from "@/assets/jollof rice.png.asset.json";
import refuelMeal from "@/assets/refuel meal.png.asset.json";

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji: string;
  image?: string;
};

export const menuItems: MenuItem[] = [
  { id: 1, name: "Bigwhizz Reloaded", price: 6400.36, category: "Top Sellers", emoji: "🍔", image: burger.url },
  { id: 2, name: "Refuel Max Combo", price: 3130.0, category: "Top Sellers", emoji: "🍗", image: refuelMeal.url },
  { id: 3, name: "Classic Chicken Burger", price: 2500.0, category: "Burgers & Sandwiches", emoji: "🍔", image: classicChickenBurger.url },
  { id: 4, name: "Bread", price: 2200.0, category: "Burgers & Sandwiches", emoji: "🥪", image: bread.url },
  { id: 5, name: "Fried Chicken", price: 3800.0, category: "Citizens Meals", emoji: "🍱", image: friedChicken.url },
  { id: 6, name: "Citizen Meal -Moi-moi", price: 3500.0, category: "Citizens Meals", emoji: "🍱", image: moiMoi.url },
  { id: 7, name: "Coca-Cola", price: 400.0, category: "Drinks", emoji: "🥤", image: coke.url },
  { id: 8, name: "Fanta", price: 400.0, category: "Drinks", emoji: "🥤", image: fanta.url },
  { id: 9, name: "Sprite", price: 400.0, category: "Drinks", emoji: "🥤" },
  { id: 10, name: "Table Water", price: 300.0, category: "Drinks", emoji: "💧", image: tableWater.url },
  { id: 11, name: "Jollof Rice with Chicken", price: 3000.0, category: "POT Meals", emoji: "🍲", image: jollofChicken.url },
  { id: 12, name: "Fried Rice with Chicken", price: 3200.0, category: "POT Meals", emoji: "🍲", image: friedRice.url },
  { id: 13, name: "Jollof Rice", price: 1800.0, category: "POT Meals", emoji: "🍚", image: jollofRice.url },
  { id: 14, name: "Spaghetti", price: 2000.0, category: "POT Meals", emoji: "🍝", image: spag.url },
  { id: 15, name: "The Pot Special", price: 4500.0, category: "POT Meals", emoji: "🍲", image: thePot.url },
  { id: 16, name: "French Fries", price: 800.0, category: "Tasty Sides", emoji: "🍟", image: potatoFries.url },
  { id: 17, name: "Coleslaw", price: 500.0, category: "Tasty Sides", emoji: "🥗", image: coleslaw.url },
  { id: 18, name: "Plantain", price: 600.0, category: "Tasty Sides", emoji: "🍌", image: plantain.url },
  { id: 19, name: "Fried Yam", price: 700.0, category: "Tasty Sides", emoji: "🍠", image: friedYam.url },
  { id: 20, name: "Moi-Moi", price: 500.0, category: "Tasty Sides", emoji: "🫘", image: moiMoi.url },
  { id: 21, name: "Pepper Sauce", price: 300.0, category: "Tasty Sides", emoji: "🌶️", image: pepperSauce.url },
];

export const categories = [
  "Top Sellers",
  "Burgers & Sandwiches",
  "Citizens Meals",
  "Drinks",
  "POT Meals",
  "Tasty Sides",
];

export const categoryIcons: Record<string, string> = {
  "Top Sellers": "⭐",
  "Burgers & Sandwiches": "🍔",
  "Citizens Meals": "🍱",
  Drinks: "🥤",
  "POT Meals": "🍲",
  "Tasty Sides": "🍟",
};

export const formatNaira = (n: number) =>
  `₦${n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
