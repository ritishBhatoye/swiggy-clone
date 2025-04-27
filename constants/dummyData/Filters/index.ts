import { FilterOptionDataType, FilterOptionsDataType } from "@/types";

export const FiltersOptionsData: FilterOptionsDataType[] = [
  {
    id: 1,
    label: "Filters",
  },
  {
    id: 2,
    label: "Sort By",
  },
  {
    id: 3,
    label: "Pure Veg",
  },
  {
    id: 4,
    label: "Ratings 4.0+",
  },
  {
    id: 5,
    label: "Ratings 4.5+",
  },
];

export const FilterOption: FilterOptionDataType[] = [
  {
    id: 1,
    label: "Sort",
    value: "sort",
    options: [
      {
        id: 1,
        value: "Relevance(Default)",
      },
      {
        id: 2,
        value: "Delivery Time",
      },
      {
        id: 3,
        value: "Rating",
      },
      {
        id: 4,
        value: "Cost: Low to High",
      },
      {
        id: 5,
        value: "Cost: High to Low",
      },
    ],
  },
  {
    id: 2,
    label: "Veg/Non-Veg",
    value: "veg-or-non-veg",

    options: [
      {
        id: 1,
        value: "Non Veg",
      },
      {
        id: 2,
        value: "Pure Veg",
      },
    ],
  },
  {
    id: 3,
    label: "Ratings",
    value: "ratings",
    options: [
      {
        id: 1,
        value: "Ratings 3.5+",
      },
      {
        id: 2,
        value: "Ratings 4.0+",
      },
      {
        id: 3,
        value: "Rating 4.5+",
      },
    ],
  },
  {
    id: 4,
    label: "Cost For Two",
    value: "costForTwo",
    options: [
      {
        id: 1,
        value: "Less than Rs. 300",
      },
      {
        id: 2,
        value: "Rs.300 - Rs.600",
      },
      {
        id: 3,
        value: "Greater than Rs. 600",
      },
    ],
  },
];
