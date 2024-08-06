import { body, validationResult } from 'express-validator';
import User from '../models/UserModel.js'




// Get All User
export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUsersById = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createUser = async (req, res) => {
    await body('name').isString().notEmpty().withMessage('Name is required').run(req);
    await body('email').isEmail().withMessage('Valid email is required').run(req);
    await body('gender').isString().notEmpty().withMessage('Gender is required').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            errors: errors
        });
    }

    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            gender: req.body.gender
        });

        res.status(201).json({
            status: true,
            msg: 'User Created',
            data: newUser
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            status: false,
            msg: 'Internal Server Error'
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const upUser = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            status: true,
            msg: 'User Updated',
        });
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async (req, res) => {
    try {
        const delUser = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            status: true,
            msg: 'User Deleted',
            data: delUser
        });
    } catch (error) {
        console.log(error.message);
    }
}