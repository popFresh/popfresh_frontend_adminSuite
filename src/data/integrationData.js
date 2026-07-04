const integrations = [
  {
    id: "INT001",

    name: "Razorpay",

    logo: "💳",

    description: "Online Payment Gateway",

    connected: true,

    status: "Connected",

    details: {
      merchantId: "rzp_live_xxxxxxxxx",

      webhook: "Enabled",

      lastSync: "2 mins ago",
    },
  },

  {
    id: "INT002",

    name: "Resend",

    logo: "📧",

    description: "Transactional Emails",

    connected: true,

    status: "Connected",

    details: {
      domain: "popfresh.in",

      apiKey: "••••••••••••",

      verified: "Yes",
    },
  },

  {
    id: "INT003",

    name: "WhatsApp",

    logo: "💬",

    description: "Meta Cloud API",

    connected: true,

    status: "Connected",

    details: {
      phoneNumber: "+91 9876543210",

      webhook: "Connected",

      quality: "High",
    },
  },

  {
    id: "INT004",

    name: "Shiprocket",

    logo: "🚚",

    description: "Shipping Partner",

    connected: true,

    status: "Connected",

    details: {
      warehouse: "Noida Warehouse",

      lastSync: "5 mins ago",

      ordersToday: 28,
    },
  },

  {
    id: "INT005",

    name: "Delhivery",

    logo: "📦",

    description: "Courier Partner",

    connected: false,

    status: "Not Connected",

    details: {
      account: "-",

      lastSync: "-",

      ordersToday: 0,
    },
  },

  {
    id: "INT006",

    name: "Google Analytics",

    logo: "📈",

    description: "Website Analytics",

    connected: true,

    status: "Connected",

    details: {
      property: "G-XXXXXXXXXX",

      lastSync: "Today",

      events: "Tracking",
    },
  },

  {
    id: "INT007",

    name: "Amazon",

    logo: "🛒",

    description: "Marketplace Integration",

    connected: false,

    status: "Not Connected",

    details: {
      sellerId: "-",

      lastSync: "-",

      listings: 0,
    },
  },

  {
    id: "INT008",

    name: "Flipkart",

    logo: "🛍️",

    description: "Marketplace Integration",

    connected: false,

    status: "Not Connected",

    details: {
      sellerId: "-",

      lastSync: "-",

      listings: 0,
    },
  },
];

export default integrations;