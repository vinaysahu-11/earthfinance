import { Request, Response } from 'express';
import { query } from '../config/database';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getPublicBlogPosts = async (_req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT id, title, slug, excerpt, cover_image, author, category, tags, published_at, created_at
       FROM public.blog_posts
       WHERE status = 'PUBLISHED'
       ORDER BY published_at DESC, created_at DESC`
    );
    return sendSuccess(res, result.rows);
  } catch (error) {
    return sendError(res, 'Failed to fetch blog posts', 500);
  }
};

export const getPublicBlogPostBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await query(
      `SELECT * FROM public.blog_posts WHERE slug = $1 AND status = 'PUBLISHED'`,
      [slug]
    );

    if (result.rows.length === 0) {
      return sendError(res, 'Post not found', 404);
    }

    return sendSuccess(res, result.rows[0]);
  } catch (error) {
    return sendError(res, 'Failed to fetch blog post', 500);
  }
};

export const getAdminBlogPosts = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await query(`SELECT * FROM public.blog_posts ORDER BY created_at DESC`);
    return sendSuccess(res, result.rows);
  } catch (error) {
    return sendError(res, 'Failed to fetch blog posts', 500);
  }
};

export const createBlogPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, slug, excerpt, content, cover_image, author, category, tags = [], status = 'DRAFT', seo_title, seo_description } = req.body;
    const published_at = status === 'PUBLISHED' ? new Date() : null;

    const result = await query(
      `INSERT INTO public.blog_posts (
        title, slug, excerpt, content, cover_image, author, category, tags, status, published_at, seo_title, seo_description, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())
      RETURNING *`,
      [title, slug, excerpt || null, content, cover_image || null, author || 'Earth Finance Editorial Team', category || null, JSON.stringify(tags), status, published_at, seo_title || null, seo_description || null]
    );

    return sendSuccess(res, result.rows[0], 'Post created', 201);
  } catch (error: any) {
    if (error.code === '23505') {
      return sendError(res, 'A post with this slug already exists', 409);
    }
    return sendError(res, 'Failed to create blog post', 500);
  }
};

export const updateBlogPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, slug, excerpt, content, cover_image, author, category, tags, status, seo_title, seo_description } = req.body;

    const result = await query(
      `UPDATE public.blog_posts
       SET title = COALESCE($1, title),
           slug = COALESCE($2, slug),
           excerpt = COALESCE($3, excerpt),
           content = COALESCE($4, content),
           cover_image = COALESCE($5, cover_image),
           author = COALESCE($6, author),
           category = COALESCE($7, category),
           tags = COALESCE($8, tags),
           status = COALESCE($9, status),
           published_at = CASE WHEN $9 = 'PUBLISHED' THEN COALESCE(published_at, NOW()) ELSE published_at END,
           seo_title = COALESCE($10, seo_title),
           seo_description = COALESCE($11, seo_description),
           updated_at = NOW()
       WHERE id = $12 RETURNING *`,
      [
        title,
        slug,
        excerpt,
        content,
        cover_image,
        author,
        category,
        tags ? JSON.stringify(tags) : null,
        status,
        seo_title,
        seo_description,
        id
      ]
    );

    if (result.rows.length === 0) {
      return sendError(res, 'Post not found', 404);
    }
    return sendSuccess(res, result.rows[0], 'Post updated');
  } catch (error) {
    return sendError(res, 'Failed to update blog post', 500);
  }
};

export const deleteBlogPost = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM public.blog_posts WHERE id = $1', [id]);
    return sendSuccess(res, null, 'Post deleted');
  } catch (error) {
    return sendError(res, 'Failed to delete blog post', 500);
  }
};

