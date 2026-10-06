import { Request, Response } from 'express';
import { query } from '../config/database';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { LoanProduct, LoanCategory } from '../types';

export const getPublicLoans = async (_req: Request, res: Response) => {
  try {
    const result = await query<LoanProduct>(
      `SELECT lp.*, lc.name as category_name
       FROM public.loan_products lp
       LEFT JOIN public.loan_categories lc ON lp.category_id = lc.id
       WHERE lp.status = 'PUBLISHED'
       ORDER BY lp.name ASC`
    );
    return sendSuccess(res, result.rows, 'Published loan products');
  } catch (error) {
    return sendError(res, 'Failed to fetch loan products', 500);
  }
};

export const getPublicLoanBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await query<LoanProduct>(
      `SELECT lp.*, lc.name as category_name
       FROM public.loan_products lp
       LEFT JOIN public.loan_categories lc ON lp.category_id = lc.id
       WHERE lp.slug = $1 AND lp.status = 'PUBLISHED'`,
      [slug]
    );

    if (result.rows.length === 0) {
      return sendError(res, 'Loan product not found', 404);
    }

    return sendSuccess(res, result.rows[0]);
  } catch (error) {
    return sendError(res, 'Failed to fetch loan product', 500);
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const result = await query<LoanCategory>(
      `SELECT * FROM public.loan_categories WHERE is_active = true ORDER BY display_order ASC`
    );
    return sendSuccess(res, result.rows, 'Loan categories');
  } catch (error) {
    return sendError(res, 'Failed to fetch loan categories', 500);
  }
};

// Admin controllers
export const getAdminLoans = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await query<LoanProduct>(
      `SELECT lp.*, lc.name as category_name
       FROM public.loan_products lp
       LEFT JOIN public.loan_categories lc ON lp.category_id = lc.id
       ORDER BY lp.created_at DESC`
    );
    return sendSuccess(res, result.rows, 'All loan products');
  } catch (error) {
    return sendError(res, 'Failed to fetch loans', 500);
  }
};

export const createLoan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      name,
      slug,
      category_id,
      category,
      short_description,
      description,
      loan_amount,
      interest_rate,
      collateral,
      eligibility = [],
      documents = [],
      features = [],
      image,
      status = 'PUBLISHED',
      seo_title,
      seo_description
    } = req.body;

    const result = await query<LoanProduct>(
      `INSERT INTO public.loan_products (
        name, slug, category_id, category, short_description, description,
        loan_amount, interest_rate, collateral, eligibility, documents, features,
        image, status, seo_title, seo_description, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW())
      RETURNING *`,
      [
        name,
        slug,
        category_id || null,
        category,
        short_description || null,
        description || null,
        loan_amount || null,
        interest_rate || null,
        collateral || null,
        JSON.stringify(eligibility),
        JSON.stringify(documents),
        JSON.stringify(features),
        image || null,
        status,
        seo_title || null,
        seo_description || null
      ]
    );

    return sendSuccess(res, result.rows[0], 'Loan product created successfully', 201);
  } catch (error: any) {
    if (error.code === '23505') {
      return sendError(res, 'A loan product with this slug already exists', 409);
    }
    return sendError(res, 'Failed to create loan product', 500);
  }
};

export const updateLoan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      slug,
      category_id,
      category,
      short_description,
      description,
      loan_amount,
      interest_rate,
      collateral,
      eligibility,
      documents,
      features,
      image,
      status,
      seo_title,
      seo_description
    } = req.body;

    const result = await query<LoanProduct>(
      `UPDATE public.loan_products
       SET name = COALESCE($1, name),
           slug = COALESCE($2, slug),
           category_id = COALESCE($3, category_id),
           category = COALESCE($4, category),
           short_description = COALESCE($5, short_description),
           description = COALESCE($6, description),
           loan_amount = COALESCE($7, loan_amount),
           interest_rate = COALESCE($8, interest_rate),
           collateral = COALESCE($9, collateral),
           eligibility = COALESCE($10, eligibility),
           documents = COALESCE($11, documents),
           features = COALESCE($12, features),
           image = COALESCE($13, image),
           status = COALESCE($14, status),
           seo_title = COALESCE($15, seo_title),
           seo_description = COALESCE($16, seo_description),
           updated_at = NOW()
       WHERE id = $17
       RETURNING *`,
      [
        name,
        slug,
        category_id,
        category,
        short_description,
        description,
        loan_amount,
        interest_rate,
        collateral,
        eligibility ? JSON.stringify(eligibility) : null,
        documents ? JSON.stringify(documents) : null,
        features ? JSON.stringify(features) : null,
        image,
        status,
        seo_title,
        seo_description,
        id
      ]
    );

    if (result.rows.length === 0) {
      return sendError(res, 'Loan product not found', 404);
    }

    return sendSuccess(res, result.rows[0], 'Loan product updated successfully');
  } catch (error) {
    return sendError(res, 'Failed to update loan product', 500);
  }
};

export const deleteLoan = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM public.loan_products WHERE id = $1', [id]);
    return sendSuccess(res, null, 'Loan product deleted successfully');
  } catch (error) {
    return sendError(res, 'Failed to delete loan product', 500);
  }
};

export const createCategory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, slug, description, icon, display_order = 0 } = req.body;
    const result = await query(
      `INSERT INTO public.loan_categories (name, slug, description, icon, display_order, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING *`,
      [name, slug, description || null, icon || null, display_order]
    );
    return sendSuccess(res, result.rows[0], 'Category created', 201);
  } catch (error) {
    return sendError(res, 'Failed to create category', 500);
  }
};

export const deleteCategory = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM public.loan_categories WHERE id = $1', [id]);
    return sendSuccess(res, null, 'Category deleted');
  } catch (error) {
    return sendError(res, 'Failed to delete category', 500);
  }
};
