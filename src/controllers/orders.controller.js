import Order from "../models/order.model.js";
import Product from "../models/product.model.js"; // Asegúrate de importar el modelo de productos

// Obtener todos los pedidos
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ createdBy: req.user.id })
      .populate("client", "name email")
      .populate("products.product", "name price");
    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener un pedido por ID
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("client", "name email")
      .populate("products.product", "name price");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Crear un pedido
export const createOrder = async (req, res) => {
  try {
    const { client, products, status, orderDate } = req.body;

    // Calcular el total del precio y verificar el stock
    let totalPrice = 0;

    for (const item of products) {
      const product = await Product.findById(item.product); // Buscar el producto por ID
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }

      // Validar stock suficiente
      if (item.quantity > product.stock) {
        return res.status(400).json({
          message: `Insufficient stock for product: ${product.name}`,
        });
      }

      // Calcular subtotal y actualizar el precio total
      const subtotal = product.price * item.quantity;
      totalPrice += subtotal;

      // Reducir el stock del producto
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }, // Reducir el stock
        { new: true }
      );
    }

    // Crear la orden con el precio total calculado
    const newOrder = new Order({
      client,
      products,
      status: status || "Pendiente",
      orderDate: orderDate || new Date(),
      totalPrice,
      createdBy: req.user.id,
    });

    await newOrder.save();
    res.status(201).json(newOrder); // Responder con la orden creada
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un pedido
export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: "Order not found" });
    res.json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un pedido
export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ message: "Order not found" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
