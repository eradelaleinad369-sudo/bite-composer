import { createFileRoute } from "@tanstack/react-router";
import { MealBuilder } from "@/components/meal-builder/MealBuilder";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Kitchen· Build Your Own Meal" },
      {
        name: "description",
        content:
          "Drag and drop your favorite items into your tray and build the perfect combo meal.",
      },
      { property: "og:title", content: "My Kitchen· Build Your Own Meal" },
      {
        property: "og:description",
        content: "Build your custom meal combo with our interactive drag-and-drop builder.",
      },
    ],
  }),
  component: MealBuilder,
});
