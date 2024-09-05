import express, { type Express, type Request, type Response } from "express";
import * as bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors"; // Import CORS middleware
import sanitizeString from "./utils/sanitizeString";
import db, { type UserData } from "./utils/backendDb";
import { GenerateQuote } from "./utils/quoteManager";

let app: Express = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS for all origins
app.use(cors({
    origin: "*", // Allow requests from all origins
}));

app.get("/", (_: Request, res: Response) => {
    res.status(200).json({
        message: "Hello and welcome to KFU Health!",
    });
});

app.get("/gen-quote", (_: Request, res: Response) => {
    res.status(200).json({
        quote: GenerateQuote()
    });
});

app.get("/get-profile", (req: Request, res: Response) => {
    const { username } = req.query;

    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: "Username is required and must be a string" });
    }

    const profile = db.get(username);

    if (profile) {
        return res.status(200).json(profile);
    } else {
        return res.status(404).json({ error: "Profile not found" });
    }
});

app.post("/add-profile", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if ((!username || !password) || (!username && !password)) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        // Sanitize the username
        const sanitizedUsername = sanitizeString(username);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Store in user info
        const status = db.add({ username: sanitizedUsername, passwordHash: hashedPassword });

        if (status === 201) {
            return res.status(status).json({ message: "Profile added successfully" });
        } else {
            return res.status(status).json({ message: "Failed to add profile" });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/update-profile", async (req: Request, res: Response) => {
    try {
        const newData = req.body;

        if (!newData) {
            return res.status(400).json({ error: "New data is required in request body" });
        }

        // Ensure newData matches UserData type
        if (typeof newData !== 'object') {
            return res.status(400).json({ error: "Invalid data format" });
        }

        // Store in user info
        const status = db.update(newData as UserData);

        if (status === 201) {
            return res.status(status).json({ message: "Profile updated successfully" });
        } else {
            return res.status(status).json({ message: "Failed to update profile" });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running...");
});
