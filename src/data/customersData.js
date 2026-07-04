const customers = [
  {
    id: "CUS001",
    name: "Rahul Sharma",
    avatar: "RS",
    phone: "+91 9876543210",
    email: "rahul@gmail.com",

    address: {
      line1: "Flat 402, Sunshine Residency",
      line2: "Sector 62",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201309",
      country: "India",
    },

    totalOrders: 5,
    totalSpent: 1995,

    lastOrder: "25 Jun 2026",
    joinedOn: "15 May 2026",

    status: "Active",

    orders: [
      {
        id: "PF240625001",
        amount: 597,
        status: "Delivered",
        date: "25 Jun 2026",
      },
      {
        id: "PF240621004",
        amount: 399,
        status: "Delivered",
        date: "21 Jun 2026",
      },
      {
        id: "PF240618002",
        amount: 199,
        status: "Shipped",
        date: "18 Jun 2026",
      },
      {
        id: "PF240611008",
        amount: 401,
        status: "Delivered",
        date: "11 Jun 2026",
      },
      {
        id: "PF240530003",
        amount: 399,
        status: "Delivered",
        date: "30 May 2026",
      },
    ],
  },

  {
    id: "CUS002",
    name: "Priya Verma",
    avatar: "PV",
    phone: "+91 9988776655",
    email: "priya@gmail.com",

    address: {
      line1: "B-204, Lotus Apartments",
      line2: "Indirapuram",
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      pincode: "201014",
      country: "India",
    },

    totalOrders: 3,
    totalSpent: 1194,

    lastOrder: "25 Jun 2026",
    joinedOn: "02 Jun 2026",

    status: "Active",

    orders: [
      {
        id: "PF240625006",
        amount: 398,
        status: "Delivered",
        date: "25 Jun 2026",
      },
      {
        id: "PF240620001",
        amount: 398,
        status: "Delivered",
        date: "20 Jun 2026",
      },
      {
        id: "PF240608004",
        amount: 398,
        status: "Delivered",
        date: "08 Jun 2026",
      },
    ],
  },

  {
    id: "CUS003",
    name: "Amit Das",
    avatar: "AD",
    phone: "+91 9123456780",
    email: "amit@gmail.com",

    address: {
      line1: "12 Lake View Road",
      line2: "Salt Lake",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700091",
      country: "India",
    },

    totalOrders: 8,
    totalSpent: 3980,

    lastOrder: "25 Jun 2026",
    joinedOn: "11 Apr 2026",

    status: "Active",

    orders: [
      {
        id: "PF240625011",
        amount: 995,
        status: "Delivered",
        date: "25 Jun 2026",
      },
      {
        id: "PF240622008",
        amount: 597,
        status: "Delivered",
        date: "22 Jun 2026",
      },
      {
        id: "PF240618010",
        amount: 398,
        status: "Shipped",
        date: "18 Jun 2026",
      },
      {
        id: "PF240615009",
        amount: 398,
        status: "Delivered",
        date: "15 Jun 2026",
      },
      {
        id: "PF240610002",
        amount: 398,
        status: "Delivered",
        date: "10 Jun 2026",
      },
      {
        id: "PF240603007",
        amount: 398,
        status: "Delivered",
        date: "03 Jun 2026",
      },
      {
        id: "PF240529001",
        amount: 398,
        status: "Delivered",
        date: "29 May 2026",
      },
      {
        id: "PF240515005",
        amount: 398,
        status: "Delivered",
        date: "15 May 2026",
      },
    ],
  },
    {
    id: "CUS004",
    name: "Sneha Roy",
    avatar: "SR",
    phone: "+91 9811223344",
    email: "sneha@gmail.com",

    address: {
      line1: "Flat 9C, Green Heights",
      line2: "New Town",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700156",
      country: "India",
    },

    totalOrders: 1,
    totalSpent: 199,

    lastOrder: "25 Jun 2026",
    joinedOn: "25 Jun 2026",

    status: "New",

    orders: [
      {
        id: "PF240625018",
        amount: 199,
        status: "Delivered",
        date: "25 Jun 2026",
      },
    ],
  },

  {
    id: "CUS005",
    name: "Rohan Gupta",
    avatar: "RG",
    phone: "+91 9000011111",
    email: "rohan@gmail.com",

    address: {
      line1: "Villa 18, Palm County",
      line2: "Whitefield",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560066",
      country: "India",
    },

    totalOrders: 6,
    totalSpent: 2994,

    lastOrder: "24 Jun 2026",
    joinedOn: "20 Mar 2026",

    status: "Active",

    orders: [
      {
        id: "PF240624005",
        amount: 597,
        status: "Delivered",
        date: "24 Jun 2026",
      },
      {
        id: "PF240620011",
        amount: 399,
        status: "Delivered",
        date: "20 Jun 2026",
      },
      {
        id: "PF240616007",
        amount: 399,
        status: "Delivered",
        date: "16 Jun 2026",
      },
      {
        id: "PF240612004",
        amount: 599,
        status: "Shipped",
        date: "12 Jun 2026",
      },
      {
        id: "PF240607009",
        amount: 399,
        status: "Delivered",
        date: "07 Jun 2026",
      },
      {
        id: "PF240601002",
        amount: 601,
        status: "Delivered",
        date: "01 Jun 2026",
      },
    ],
  },
    {
    id: "CUS006",
    name: "Neha Kapoor",
    avatar: "NK",
    phone: "+91 9876501234",
    email: "neha@gmail.com",

    address: {
      line1: "A-18, Orchid Residency",
      line2: "Baner",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411045",
      country: "India",
    },

    totalOrders: 12,
    totalSpent: 7164,

    lastOrder: "24 Jun 2026",
    joinedOn: "05 Jan 2026",

    status: "Active",

    orders: [
      {
        id: "PF240624002",
        amount: 995,
        status: "Delivered",
        date: "24 Jun 2026",
      },
      {
        id: "PF240620014",
        amount: 597,
        status: "Delivered",
        date: "20 Jun 2026",
      },
      {
        id: "PF240616012",
        amount: 597,
        status: "Delivered",
        date: "16 Jun 2026",
      },
      {
        id: "PF240612015",
        amount: 398,
        status: "Delivered",
        date: "12 Jun 2026",
      },
      {
        id: "PF240608003",
        amount: 398,
        status: "Delivered",
        date: "08 Jun 2026",
      },
      {
        id: "PF240603011",
        amount: 597,
        status: "Delivered",
        date: "03 Jun 2026",
      },
      {
        id: "PF240529004",
        amount: 597,
        status: "Delivered",
        date: "29 May 2026",
      },
      {
        id: "PF240525006",
        amount: 398,
        status: "Delivered",
        date: "25 May 2026",
      },
      {
        id: "PF240520003",
        amount: 597,
        status: "Delivered",
        date: "20 May 2026",
      },
      {
        id: "PF240515009",
        amount: 398,
        status: "Delivered",
        date: "15 May 2026",
      },
      {
        id: "PF240509001",
        amount: 597,
        status: "Delivered",
        date: "09 May 2026",
      },
      {
        id: "PF240501005",
        amount: 395,
        status: "Delivered",
        date: "01 May 2026",
      },
    ],
  },

  {
    id: "CUS007",
    name: "Arjun Singh",
    avatar: "AS",
    phone: "+91 9898989898",
    email: "arjun@gmail.com",

    address: {
      line1: "221, Royal Greens",
      line2: "Vaishali Nagar",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302021",
      country: "India",
    },

    totalOrders: 2,
    totalSpent: 398,

    lastOrder: "25 Jun 2026",
    joinedOn: "10 Jun 2026",

    status: "New",

    orders: [
      {
        id: "PF240625022",
        amount: 199,
        status: "Delivered",
        date: "25 Jun 2026",
      },
      {
        id: "PF240615005",
        amount: 199,
        status: "Delivered",
        date: "15 Jun 2026",
      },
    ],
  },

  {
    id: "CUS008",
    name: "Meera Joshi",
    avatar: "MJ",
    phone: "+91 9012345678",
    email: "meera@gmail.com",

    address: {
      line1: "C-92, Silver Homes",
      line2: "Satellite",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380015",
      country: "India",
    },

    totalOrders: 4,
    totalSpent: 2388,

    lastOrder: "23 Jun 2026",
    joinedOn: "12 Feb 2026",

    status: "Active",

    orders: [
      {
        id: "PF240623003",
        amount: 597,
        status: "Delivered",
        date: "23 Jun 2026",
      },
      {
        id: "PF240618007",
        amount: 597,
        status: "Delivered",
        date: "18 Jun 2026",
      },
      {
        id: "PF240611002",
        amount: 597,
        status: "Delivered",
        date: "11 Jun 2026",
      },
      {
        id: "PF240603008",
        amount: 597,
        status: "Delivered",
        date: "03 Jun 2026",
      },
    ],
  },
    {
    id: "CUS009",
    name: "Karan Malhotra",
    avatar: "KM",
    phone: "+91 9765432109",
    email: "karan@gmail.com",

    address: {
      line1: "Flat 1102, Sky Residency",
      line2: "Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400053",
      country: "India",
    },

    totalOrders: 9,
    totalSpent: 5373,

    lastOrder: "25 Jun 2026",
    joinedOn: "22 Jan 2026",

    status: "Active",

    orders: [
      {
        id: "PF240625028",
        amount: 995,
        status: "Delivered",
        date: "25 Jun 2026",
      },
      {
        id: "PF240621011",
        amount: 597,
        status: "Delivered",
        date: "21 Jun 2026",
      },
      {
        id: "PF240617006",
        amount: 398,
        status: "Shipped",
        date: "17 Jun 2026",
      },
      {
        id: "PF240613002",
        amount: 597,
        status: "Delivered",
        date: "13 Jun 2026",
      },
      {
        id: "PF240609004",
        amount: 398,
        status: "Delivered",
        date: "09 Jun 2026",
      },
      {
        id: "PF240604009",
        amount: 597,
        status: "Delivered",
        date: "04 Jun 2026",
      },
      {
        id: "PF240529012",
        amount: 597,
        status: "Delivered",
        date: "29 May 2026",
      },
      {
        id: "PF240522005",
        amount: 597,
        status: "Delivered",
        date: "22 May 2026",
      },
      {
        id: "PF240515001",
        amount: 597,
        status: "Delivered",
        date: "15 May 2026",
      },
    ],
  },

  {
    id: "CUS010",
    name: "Ananya Sen",
    avatar: "AS",
    phone: "+91 9988001122",
    email: "ananya@gmail.com",

    address: {
      line1: "22, Green Valley Apartments",
      line2: "Banjara Hills",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500034",
      country: "India",
    },

    totalOrders: 3,
    totalSpent: 1194,

    lastOrder: "22 Jun 2026",
    joinedOn: "18 Apr 2026",

    status: "Active",

    orders: [
      {
        id: "PF240622003",
        amount: 398,
        status: "Delivered",
        date: "22 Jun 2026",
      },
      {
        id: "PF240615014",
        amount: 398,
        status: "Delivered",
        date: "15 Jun 2026",
      },
      {
        id: "PF240608010",
        amount: 398,
        status: "Delivered",
        date: "08 Jun 2026",
      },
    ],
  },
];

export default customers;