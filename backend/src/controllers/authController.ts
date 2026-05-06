import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.register(req.body);
    res.status(result.status).json(result.body);
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.verifyEmail(req.body);
    res.status(result.status).json(result.body);
  } catch (err) {
    next(err);
  }
};

export const resendOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.resendOtp(req.body);
    res.status(result.status).json(result.body);
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.login(req.body);
    res.status(result.status).json(result.body);
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.forgotPassword(req.body);
    res.status(result.status).json(result.body);
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.resetPassword(req.body);
    res.status(result.status).json(result.body);
  } catch (err) {
    next(err);
  }
};

export const social = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.socialLogin(req.body);
    res.status(result.status).json(result.body);
  } catch (err) {
    next(err);
  }
};
