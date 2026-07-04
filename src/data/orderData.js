const orders = [
  {
    id: "PF240625001",
    customer: {
      name: "Rahul Sharma",
      phone: "+91 9876543210",
      email: "rahul@gmail.com",
      avatar: "RS",
    },
    items: 3,
    products: [
      { name: "Classic Cheese Popcorn", qty: 2 },
      { name: "Caramel Popcorn", qty: 1 },
    ],
    amount: 597,
    payment: "Paid",
    status: "New",
    orderDate: "25 Jun 2026 • 09:12 AM",
  },

  {
    id: "PF240625002",
    customer: {
      name: "Priya Verma",
      phone: "+91 9988776655",
      email: "priya@gmail.com",
      avatar: "PV",
    },
    items: 2,
    products: [
      { name: "Peri Peri Popcorn", qty: 2 },
    ],
    amount: 398,
    payment: "Paid",
    status: "Confirmed",
    orderDate: "25 Jun 2026 • 09:45 AM",
  },

  {
    id: "PF240625003",
    customer: {
      name: "Amit Das",
      phone: "+91 9123456780",
      email: "amit@gmail.com",
      avatar: "AD",
    },
    items: 5,
    products: [
      { name: "Classic Cheese Popcorn", qty: 3 },
      { name: "Peri Peri Popcorn", qty: 2 },
    ],
    amount: 995,
    payment: "Paid",
    status: "Packing",
    orderDate: "25 Jun 2026 • 10:18 AM",
  },

  {
    id: "PF240625004",
    customer: {
      name: "Sneha Roy",
      phone: "+91 9811223344",
      email: "sneha@gmail.com",
      avatar: "SR",
    },
    items: 1,
    products: [
      { name: "Caramel Popcorn", qty: 1 },
    ],
    amount: 199,
    payment: "Paid",
    status: "Packed",
    orderDate: "25 Jun 2026 • 11:02 AM",
  },

  {
    id: "PF240625005",
    customer: {
      name: "Rohan Gupta",
      phone: "+91 9000011111",
      email: "rohan@gmail.com",
      avatar: "RG",
    },
    items: 4,
    products: [
      { name: "Classic Cheese Popcorn", qty: 2 },
      { name: "Caramel Popcorn", qty: 2 },
    ],
    amount: 796,
    payment: "Paid",
    status: "Shipped",
    orderDate: "24 Jun 2026 • 05:48 PM",
  },

  {
    id: "PF240625006",
    customer: {
      name: "Neha Kapoor",
      phone: "+91 9876501234",
      email: "neha@gmail.com",
      avatar: "NK",
    },
    items: 6,
    products: [
      { name: "Classic Cheese Popcorn", qty: 3 },
      { name: "Caramel Popcorn", qty: 3 },
    ],
    amount: 1194,
    payment: "Paid",
    status: "Delivered",
    orderDate: "24 Jun 2026 • 01:25 PM",
  },

  {
    id: "PF240625007",
    customer: {
      name: "Arjun Singh",
      phone: "+91 9898989898",
      email: "arjun@gmail.com",
      avatar: "AS",
    },
    items: 2,
    products: [
      { name: "Peri Peri Popcorn", qty: 2 },
    ],
    amount: 398,
    payment: "Pending",
    status: "New",
    orderDate: "25 Jun 2026 • 12:10 PM",
  },

  {
    id: "PF240625008",
    customer: {
      name: "Meera Joshi",
      phone: "+91 9012345678",
      email: "meera@gmail.com",
      avatar: "MJ",
    },
    items: 3,
    products: [
      { name: "Classic Cheese Popcorn", qty: 1 },
      { name: "Caramel Popcorn", qty: 2 },
    ],
    amount: 597,
    payment: "Paid",
    status: "Cancelled",
    orderDate: "23 Jun 2026 • 04:20 PM",
  },

  {
    id: "PF240625009",
    customer: {
      name: "Karan Malhotra",
      phone: "+91 9765432109",
      email: "karan@gmail.com",
      avatar: "KM",
    },
    items: 7,
    products: [
      { name: "Classic Cheese Popcorn", qty: 4 },
      { name: "Peri Peri Popcorn", qty: 3 },
    ],
    amount: 1393,
    payment: "Paid",
    status: "Packing",
    orderDate: "25 Jun 2026 • 01:15 PM",
  },

  {
    id: "PF240625010",
    customer: {
      name: "Ananya Sen",
      phone: "+91 9988001122",
      email: "ananya@gmail.com",
      avatar: "AN",
    },
    items: 2,
    products: [
      { name: "Caramel Popcorn", qty: 2 },
    ],
    amount: 398,
    payment: "Paid",
    status: "Delivered",
    orderDate: "22 Jun 2026 • 03:42 PM",
  },
];

export default orders;