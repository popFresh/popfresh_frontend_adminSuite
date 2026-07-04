const coupons = [
  {
    id: "CP001",
    code: "WELCOME10",
    description: "10% OFF on first order",

    type: "Percentage",
    value: 10,

    minimumOrder: 499,
    maximumDiscount: 200,

    usageLimit: 1000,
    used: 248,

    expiry: "31 Dec 2026",

    status: "Active",
  },

  {
    id: "CP002",
    code: "MOVIE100",
    description: "Flat ₹100 OFF",

    type: "Flat",
    value: 100,

    minimumOrder: 799,
    maximumDiscount: null,

    usageLimit: 500,
    used: 96,

    expiry: "30 Sep 2026",

    status: "Active",
  },

  {
    id: "CP003",
    code: "CHEESE20",
    description: "20% OFF on Cheese Popcorn",

    type: "Percentage",
    value: 20,

    minimumOrder: 999,
    maximumDiscount: 300,

    usageLimit: 200,
    used: 184,

    expiry: "15 Aug 2026",

    status: "Active",
  },

  {
    id: "CP004",
    code: "SUMMER50",
    description: "Flat ₹50 OFF",

    type: "Flat",
    value: 50,

    minimumOrder: 299,
    maximumDiscount: null,

    usageLimit: 1000,
    used: 1000,

    expiry: "30 Apr 2026",

    status: "Expired",
  },

  {
    id: "CP005",
    code: "POPCORN15",
    description: "15% OFF on all products",

    type: "Percentage",
    value: 15,

    minimumOrder: 599,
    maximumDiscount: 250,

    usageLimit: 300,
    used: 41,

    expiry: "15 Jan 2027",

    status: "Active",
  },
];

export default coupons;