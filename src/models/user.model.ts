import bcrypt from 'bcrypt';
import mongoose, { model, Schema } from 'mongoose';
import validator from 'validator';
import { User } from '../types/user.type';
export const userSchema = new Schema<User>(
  {
    name: {
      required: true,
      type: String,
    },
    photoUrl: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    password: {
      required: true,
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    role: {
      enum: ['user', 'admin'],
      default: 'user',
      type: String,
      required: true,
    },
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
      },
    ],
  },
  { timestamps: true }
);

userSchema.statics.register = async function (
  name,
  email,
  password,
  phone,
  photoUrl,
  address
): Promise<User> {
  if (!name || !email || !password || !photoUrl) {
    throw new Error('Must fill email, password and photo url.');
  }

  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw new Error('User is already exist.');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Email must be valid.');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Password must be strong. EX. Arpon69');
  }

  const salt = await bcrypt.genSalt(10);

  // Hash generation
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    phone,
    photoUrl,
    address,
    password: hash,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error('Email and Password is required.');
  }

  const existingUser = await this.findOne({ email });
  if (!existingUser) {
    throw new Error('Incorrect email or password');
  }

  const match = bcrypt.compare(password, existingUser?.password);

  if (!match) {
    throw new Error('Incorrect email or password.');
  }

  return existingUser;
};

const UserModel = model<User>('User', userSchema);
export default UserModel;
