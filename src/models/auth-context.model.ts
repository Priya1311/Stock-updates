/*
 * File: auth-context.model.ts
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:07:25 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

export interface IAuthContext {
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string, remember: boolean) => void;
  logout: () => void;
}
