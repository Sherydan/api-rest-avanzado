
const validateGetJoyasOrder = (order_BY) => {
    // check if order_BY is valid
    const validOrder = ["id_ASC", "id_DESC", "price_ASC", "price_DESC", "name_ASC", "name_DESC", "stock_ASC", "stock_DESC"];
    if (!validOrder.includes(order_BY)) return true;
}

module.exports = { validateGetJoyasOrder };