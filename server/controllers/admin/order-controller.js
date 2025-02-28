const Order = require("../../models/Order");

const getAllOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron ordenes",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Algún error ocurrió",
    });
  }
};

const getOrderDetailsForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const orders = await Order.findById(id);

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "No se encontró la orden",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Algún error ocurrió",
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const orders = await Order.findById(id);

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: "No se encontró la orden",
      });
    }

    await Order.findByIdAndUpdate(id, { orderStatus });

    res.status(200).json({
      success: true,
      message: "Estado de orden actualizada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Algún error ocurrió",
    });
  }
};

module.exports = {
  getAllOrdersByUser,
  getOrderDetailsForAdmin,
  updateOrderStatus,
};
