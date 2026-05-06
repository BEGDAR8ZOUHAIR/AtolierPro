import User, { IUser } from '../models/User';
import mongoose from 'mongoose';

export const userRepository = {
  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  },

  async findByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  },

  async findByOtp(otp: string, expiresCondition?: { $gt: Date }): Promise<IUser | null> {
    const query: any = { otp };
    if (expiresCondition) {
      query.otpExpires = expiresCondition;
    }
    return await User.findOne(query);
  },

  async create(userData: {
    fullName: string;
    username: string;
    email: string;
    password: string;
    profession: string;
    phone: string;
    serviceArea: string;
    address: string;
    postalCode: string;
    city: string;
    profileImage?: string;
    otp?: string;
    otpExpires?: Date;
    verified?: boolean;
  }): Promise<IUser> {
    const user = new User(userData);
    await user.save();
    return user;
  },

  async update(user: IUser, updates: Partial<IUser>): Promise<IUser> {
    Object.assign(user, updates);
    await user.save();
    return user;
  },

  async delete(user: IUser): Promise<void> {
    await user.deleteOne();
  },
};
