const { Router } = require("express");
const userMiddleware = require("../middleware/user"); // Fixed: should be userMiddleware, not adminMiddleware
const { Todo } = require("../database/index.js")
const router = Router();

// Create todo
router.post('/', userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        const { title, description, completed = false } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            });
        }

        const todo = await Todo.create({
            userId,
            title,
            description,
            completed
        });

        res.status(201).json({
            message: "Todo created successfully!",
            todo: todo
        });
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Update todo
router.put('/:id', userMiddleware, async (req, res) => {
    try {
        const todoId = req.params.id;
        const userId = req.userId;
        const { title, description, completed } = req.body;

        const todo = await Todo.findOne({ _id: todoId, userId: userId });
        
        if (!todo) {
            return res.status(404).json({
                message: "Todo not found or you don't have permission to update it"
            });
        }

        // Update the todo
        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            {
                ...(title && { title }),
                ...(description !== undefined && { description }),
                ...(completed !== undefined && { completed })
            },
            { new: true }
        );

        res.json({
            message: "Todo updated successfully!",
            todo: updatedTodo
        });
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Delete all todos for user
router.delete('/', userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        
        const result = await Todo.deleteMany({ userId: userId });
        
        res.json({
            message: `${result.deletedCount} todos deleted successfully!`
        });
    } catch (error) {
        console.error('Error deleting todos:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Delete specific todo by id
router.delete('/:id', userMiddleware, async (req, res) => {
    try {
        const todoId = req.params.id;
        const userId = req.userId;

        const deletedTodo = await Todo.findOneAndDelete({ 
            _id: todoId, 
            userId: userId 
        });

        if (!deletedTodo) {
            return res.status(404).json({
                message: "Todo not found or you don't have permission to delete it"
            });
        }

        res.json({
            message: "Todo deleted successfully!",
            todo: deletedTodo
        });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Get all todos for user
router.get('/', userMiddleware, async (req, res) => {
    try {
        const userId = req.userId;
        
        const { completed, limit = 50, skip = 0 } = req.query;
        
        let filter = { userId };
        if (completed !== undefined) {
            filter.completed = completed === 'true';
        }

        const todos = await Todo.find(filter)
            .limit(parseInt(limit))
            .skip(parseInt(skip))
            .sort({ createdAt: -1 });

        res.json({
            todos: todos,
            count: todos.length
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

// Get specific todo by id
router.get('/:id', userMiddleware, async (req, res) => {
    try {
        const todoId = req.params.id;
        const userId = req.userId;

        const todo = await Todo.findOne({ _id: todoId, userId: userId });

        if (!todo) {
            return res.status(404).json({
                message: "Todo not found or you don't have permission to view it"
            });
        }

        res.json({
            todo: todo
        });
    } catch (error) {
        console.error('Error fetching todo:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router;