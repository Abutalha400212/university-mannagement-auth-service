import { SortOrder } from 'mongoose';

type Options = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};
const calculatePagination = (options: Options): IOptionsResult => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 1);
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const PaginationHelpers = {
  calculatePagination,
};
