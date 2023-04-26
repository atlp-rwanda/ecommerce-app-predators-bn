export const handleItemNotFound = (res) => res.status(404).json({
  status: 'fail',
  code: 404,
  error: 'Item not found',
});

export const handleUnauthorized = (res) => res.status(401).json({
  status: 'fail',
  code: 401,
  error: 'Unauthorized',
});

export const handleSellerWithoutAccess = (res) => res.status(403).json({
  status: 'fail',
  code: 403,
  error: 'You do not have access to this item',
});

export const handleSellerScenario = (res, item) => res.status(200).json({
  status: 'success',
  code: 200,
  data: {
    message: 'Item retrieved successfully',
    item,
  },
});

export const handleBuyerScenario = (res, item) => {
  if (item.available) {
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { item },
      message: 'Item retrieved successfully',
    });
  }
  return handleItemNotFound(res);
};

export const handleServerError = (res) => res.status(500).json({
  status: 'error',
  code: 500,
  error: 'Server error',
});

export default {
  handleItemNotFound,
  handleUnauthorized,
  handleSellerWithoutAccess,
  handleSellerScenario,
  handleBuyerScenario,
  handleServerError,
};
