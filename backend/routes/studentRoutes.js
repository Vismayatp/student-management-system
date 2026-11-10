const express = require('express');
const router = express.Router();

const Student = require('../models/Student');

const protect = require('../middleware/authMiddleware');

// 1. Add a new student
router.post('/', protect, async (req, res) => {

    try {
        const student = await Student.create(req.body);

        res.status(201).json({
            message: 'Student added successfully',
            student
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// 2. Get all students
router.get('/', protect, async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// 3. Update a student
router.put('/:id', protect, async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.status(200).json({
            message: 'Student updated successfully',
            student
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// 4. Delete a student
router.delete('/:id', protect, async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.status(200).json({
            message: 'Student deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

module.exports = router;