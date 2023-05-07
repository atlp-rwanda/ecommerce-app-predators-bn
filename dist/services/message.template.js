"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.text = exports.new_product = exports.expiring_soon = exports.expired = exports.default = void 0;
const text = `Hi ${seller.name},

You've added ${product.name} to your wishlist!

To view your wishlist, click here: ${product.link}

Thanks,
Your Store Name`;
exports.text = text;
const expiring_soon = ` 
Hi ${seller.name},,

Just a friendly reminder that your product "${product.name}" is expiring soon. Its expiration date is ${product.expiryDate}.

To view the product listing, click here: ${productLink}

Best regards,
Your Store Name
`;
exports.expiring_soon = expiring_soon;
const expired = `
Hi ${seller.name},

We're sorry to inform you that your product "${product.name}" has expired. Its expiration date was ${product.expiryDate}.

To view the product listing, click here: ${productLink}

Best regards,
Your Store Name
`;
exports.expired = expired;
const new_product = `
Hi ${users.name},

We're excited to inform you that a new product "${productName}" has been added to your store.

To view the product listing, click here: ${productLink}

Best regards,
Your Store Name
`;
exports.new_product = new_product;
var _default = {
  text,
  expiring_soon,
  expired,
  new_product
};
exports.default = _default;