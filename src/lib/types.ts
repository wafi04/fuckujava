import { ReactNode } from "react";

export interface WithChildren {
  children: ReactNode;
}
export interface ErrorResponse {
  code: number;
  error: string;
  message?: string;
}

export type API_RESPONSE<T> = {
  message: string;
  status: number;
  data: T;
};

export type ApiPagination<T> = {
  data: {
    data: T;
    meta: PaginationResponse;
  };
  message: string;
  statusCode: number;
};

export type PaginationResponse = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type CountResponse = {
  count: number;
};

export interface PaginationParams {
  limit?: string;
  page?: string;
}

export interface FilterAll extends PaginationParams {
  search?: string;
  type?: string;
  status?: string;
}

export interface FilterRequest {
  limit: string;
  page: string;
  search?: string;
  status?: string;
  brand?: string;
  sortOrder?: string;
  sortBy?: string;
}
