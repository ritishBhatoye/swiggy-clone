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
        value: "deliveryTime",
        label: "Delivery Time",
        color: " #FC8019",
      },
      {
        id: 3,
        value: "rating",
        label: "Rating",
        color: " #FC8019",
      },
      {
        id: 4,
        value: "costLowToHigh",
        label: "Cost: Low to High",
        color: " #FC8019",
      },
      {
        id: 5,
        value: "costHighToLow",
        label: "Cost: High to Low",
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
        value: "nonVeg",
        label: "Non Veg",
        color: " #FC8019",
      },
      {
        id: 2,
        value: "pureVeg",
        label: "Pure Veg",
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
        value: "rating3.5+",
        label: "Ratings 3.5+",
        color: " #FC8019",
      },
      {
        id: 2,
        value: "rating4.0+",
        label: "Ratings 4.0+",
        color: " #FC8019",
      },
      {
        id: 3,
        value: "rating4.5+",
        label: "Rating 4.5+",
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
        value: "lessThanRs.300",
        label: "Less than Rs. 300",
        color: " #FC8019",
      },
      {
        id: 2,
        value: "rs.300-rs.600",
        label: "Rs.300 - Rs.600 ",
        color: " #FC8019",
      },
      {
        id: 3,
        value: "greaterThanRs.600",
        label: "Greater than Rs. 600",
        color: " #FC8019",
      },
    ],
  },
];
