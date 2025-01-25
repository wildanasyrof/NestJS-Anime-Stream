export class WebResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  errors?: string | string[]; // You can return a single error message or an array of error messages.
  pagination?: {
    total: number;
    limit: number;
    page: number;
  };
}
