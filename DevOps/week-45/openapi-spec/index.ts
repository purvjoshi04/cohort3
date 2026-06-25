import express from "express";
import cors from "cors";
import crypto from "crypto";
import swaggerUi from "swagger-ui-express";

const fs = require("fs")
const YAML = require('yaml')

const file  = fs.readFileSync('./spec.yaml', 'utf8')
const swaggerDocument = YAML.parse(file)

const app = express();

app.use(cors());
app.use(express.json());

type User = {
    username: string;
    password: string;
};

type Todo = {
    id: number;
    title: string;
    username: string;
};

const users: User[] = [];
const todos: Todo[] = [];

const sessions = new Map<string, string>();

app.use("/api-docs", swaggerUi.serve);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post("/signup", (req, res) => {
    const { username, password } = req.body;

    const userExists = users.find(
        (u) => u.username === username
    );

    if (userExists) {
        return res.status(400).json({
            message: "User already exists",
        });
    }

    users.push({
        username,
        password,
    });

    res.json({
        message: "User created successfully",
    });
});

app.post("/signin", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(
        (u) =>
            u.username === username &&
            u.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }

    const sessionToken = crypto.randomUUID();

    sessions.set(sessionToken, username);

    res.json({
        token: sessionToken,
    });
});

function auth(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: "Not authenticated",
        });
    }

    const username = sessions.get(token);

    if (!username) {
        return res.status(401).json({
            message: "Invalid session",
        });
    }

    (req as any).username = username;

    next();
}

app.post("/todo", auth, (req, res) => {
    const { title } = req.body;

    const todo: Todo = {
        id: todos.length + 1,
        title,
        username: (req as any).username,
    };

    todos.push(todo);

    res.json({
        message: "Todo created",
        todo,
    });
});

app.get("/todos", auth, (req, res) => {
    const username = (req as any).username;

    const userTodos = todos.filter(
        (todo) => todo.username === username
    );

    res.json(userTodos);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});