import { https } from "firebase-functions";
import cors from "cors";

const corsHandler = cors({ origin: true });

export const addProductBacklog = https.onRequest((req, res) => {
  return corsHandler(req, res, async () => {
    // Check the origin
    const origin = req.get("origin");
    if (origin !== "https://jinrecords.github.io") {
      res.status(403).send("Unauthorized");
      return;
    }

    // Rest of your function code...
    if (req.method !== "POST") {
      res.status(405).send("Method Not Allowed");
      return;
    }

    const data = req.body;

    if (!Array.isArray(data)) {
      res.status(400).send("Invalid data format. Expected an array.");
      return;
    }

    try {
      // Your database operations here
      res.status(200).send("Data added successfully");
    } catch (error) {
      console.error("Error adding data:", error);
      res.status(500).send("Error adding data");
    }
  });
});
