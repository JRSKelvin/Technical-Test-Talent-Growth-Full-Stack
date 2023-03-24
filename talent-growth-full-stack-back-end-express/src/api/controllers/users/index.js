const Validator = require('fastest-validator');
const { PrismaClient } = require('@prisma/client');

const validator = new Validator();
const prisma = new PrismaClient();

module.exports = {
  async login(req, res) {
    const validateResult = validator.validate(req.body, {
      email: { type: 'email', label: 'Email Address' },
      password: { type: 'string', label: 'Password', min: 6 },
    });
    if (validateResult.length) {
      return res.status(400).json({
        status: 'error',
        message: 'Please fill out all field and requirement',
        data: validateResult,
      });
    }
    // End Of Validate
    try {
      const getData = await prisma.user.findUnique({
        where: {
          email: req.body.email,
        },
      });
      if (!getData) {
        return res.status(404).json({
          status: 'error',
          message: 'Credential Data Not Found',
          data: null,
        });
      }
      if (req.body.password !== getData.password) {
        return res.status(404).json({
          status: 'error',
          message: 'Credential Data Not Found',
          data: null,
        });
      }
      delete getData.password;
      return res.status(200).json({
        status: 'success',
        message: 'Login Successfully',
        data: getData,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Something Went Wrong',
        data: error,
      });
    }
  },
  async register(req, res) {
    const validateResult = validator.validate(req.body, {
      name: { type: 'string', label: 'Name' },
      email: { type: 'email', label: 'Email Address' },
      password: { type: 'string', label: 'Password', min: 6 },
    });
    if (validateResult.length) {
      return res.status(400).json({
        status: 'error',
        message: 'Please fill out all field and requirement',
        data: validateResult,
      });
    }
    // End Of Validate
    try {
      const getData = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
      });
      return res.status(200).json({
        status: 'success',
        message: 'Register Successfully',
        data: getData,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Something Went Wrong',
        data: error,
      });
    }
  },
  async getAll(req, res) {
    try {
      const getData = await prisma.user.findMany();
      if (!getData) {
        return res.status(404).json({
          status: 'error',
          message: 'Data Not Found',
          data: null,
        });
      }
      return res.status(200).json({
        status: 'success',
        message: 'Data Retrieved Successfully',
        data: getData,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Something Went Wrong',
        data: error,
      });
    }
  },
  async getById(req, res) {
    try {
      const getData = await prisma.user.findUnique({
        where: {
          id: req.params.id,
        },
      });
      if (!getData) {
        return res.status(404).json({
          status: 'error',
          message: 'Data Not Found',
          data: null,
        });
      }
      return res.status(200).json({
        status: 'success',
        message: 'Data Retrieved Successfully',
        data: getData,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Something Went Wrong',
        data: error,
      });
    }
  },
  async create(req, res) {
    const validateResult = validator.validate(req.body, {
      name: { type: 'string', label: 'Name' },
      email: { type: 'email', label: 'Email Address' },
      password: { type: 'string', label: 'Password', min: 6 },
    });
    if (validateResult.length) {
      return res.status(400).json({
        status: 'error',
        message: 'Please fill out all field and requirement',
        data: validateResult,
      });
    }
    // End Of Validate
    try {
      const getData = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
      });
      return res.status(200).json({
        status: 'success',
        message: 'Data Created Successfully',
        data: getData,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Something Went Wrong',
        data: error,
      });
    }
  },
  async update(req, res) {
    try {
      const oldData = await prisma.user.findUnique({
        where: {
          id: req.params.id,
        },
      });
      if (!oldData) {
        return res.status(404).json({
          status: 'error',
          message: 'Data Not Found',
          data: null,
        });
      }
      const getData = await prisma.user.update({
        where: {
          id: req.params.id,
        },
        data: {
          name: req.body.name || oldData.name,
          email: req.body.email || oldData.email,
          password: req.body.password || oldData.password,
        },
      });
      return res.status(200).json({
        status: 'success',
        message: 'Data Updated Successfully',
        data: getData,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Something Went Wrong',
        data: error,
      });
    }
  },
  async delete(req, res) {
    try {
      const oldData = await prisma.user.findUnique({
        where: {
          id: req.params.id,
        },
      });
      if (!oldData) {
        return res.status(404).json({
          status: 'error',
          message: 'Data Not Found',
          data: null,
        });
      }
      await prisma.user.delete({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).json({
        status: 'success',
        message: 'Data Deleted Successfully',
        data: null,
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Something Went Wrong',
        data: error,
      });
    }
  },
};
