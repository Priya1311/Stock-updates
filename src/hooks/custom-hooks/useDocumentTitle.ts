/*
 * File: useDocumentTitle.ts
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:06:50 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { useEffect, useState } from 'react';

export const useDocumentTitle = (pageTitle: string) => {
  const [title, setTitle] = useState(pageTitle);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return { title, setTitle };
};
