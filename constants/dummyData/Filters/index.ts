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
        value: "relevance(Default)",
        label: "Relevance(Default)",
        color: " #FC8019",
      },
      {
        id: 2,
        value: "Delivery Time",
        label: "deliveryTime",
        color: " #FC8019",
      },
      {
        id: 3,
        value: "Rating",
        label: "rating",
        color: " #FC8019",
      },
      {
        id: 4,
        value: "Cost: Low to High",
        label: "costLowToHigh",
        color: " #FC8019",
      },
      {
        id: 5,
        value: "Cost: High to Low",
        label: "costHighToLow",
        color: " #FC8019",
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
        label: "nonVeg",
        color: " #FC8019",
      },
      {
        id: 2,
        value: "Pure Veg",
        label: "pureVeg",
        color: " #FC8019",
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
        label: "rating3.5+",

        color: " #FC8019",
      },
      {
        id: 2,
        value: "Ratings 4.0+",
        label: "rating4.0+",
        color: " #FC8019",
      },
      {
        id: 3,
        value: "Rating 4.5+",
        label: "rating4.5+",
        color: " #FC8019",
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
        label: "lessThanRs.300",
        color: " #FC8019",
      },
      {
        id: 2,
        value: "Rs.300 - Rs.600",
        label: "rs.300-rs.600",
        color: " #FC8019",
      },
      {
        id: 3,
        value: "Greater than Rs. 600",
        label: "greaterThanRs.600",
        color: " #FC8019",
      },
    ],
  },
];
