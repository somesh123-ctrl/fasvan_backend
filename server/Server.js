const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors package

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// API Endpoint to handle form submission
app.post("/api/quote", async (req, res) => {
  try {
    const { pickup_details, drop_details, customer } = req.body;

    // For demo purpose, constructing a static quote response
    const quote = {
      Vehicles: [
        {
          type: "2 Wheeler",
          eta: { value: 10, unit: "minute" },
          fare: { currency: "INR", minor_amount: 35000 },
          capacity: { value: 20, unit: "kg" },
          size: {
            length: { value: 40, unit: "cm" },
            breadth: { value: 40, unit: "cm" },
            height: { value: 40, unit: "cm" },
          },
        },
        {
          type: "3 Wheeler Helper",
          eta: { value: 10, unit: "minute" },
          fare: { currency: "INR", minor_amount: 35000 },
          capacity: { value: 500, unit: "kg" },
          size: {
            length: { value: 6, unit: "ft" },
            breadth: { value: 5, unit: "ft" },
            height: { value: 5, unit: "ft" },
          },
        },
      ],
    };

    res.json(quote);
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ error: "Error fetching quote. Please try again." });
  }
});

// Define a route to handle shipment creation requests
app.post("/api/shipments", (req, res) => {
  // Mock data for shipment response
  const shipmentData = {
    request_id: "86098bfc-87e0-11ec-a8a3-0242ac120002",
    order_id: "CRN17855725",
    estimated_pickup_time: Date.now() + 3600000, // 1 hour from now
    estimated_fare_details: {
      currency: "INR",
      minor_amount: 35000,
    },
    tracking_url:
      "https://porter.in/track_live_order?booking_id=CRN83543479&customer_uuid=0337fe22-0745-4d5c-8514-3003912be89a",
  };

  // Return the shipment data as JSON response
  res.json(shipmentData);
});

app.get("/api/track/orderId", (req, res) => {
  const trackingData = {
    tracking_number: "123456789",
    status: "In Transit",
    location: "Warehouse A",
    estimated_delivery_date: "2024-03-25",
    items: [
      {
        name: "Product 1",
        quantity: 2,
      },
      {
        name: "Product 2",
        quantity: 1,
      },
    ],
  };
  res.json(trackingData);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
