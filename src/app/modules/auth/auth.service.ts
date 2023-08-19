import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import variable from '../../../config';
import ApiError from '../../../errors/apiError';
import { createToken, verifyToken } from '../../../helpers/jwt.herlpers';
import { User } from '../users/user.model';
import { ILoginUser, ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
	const { id, password } = payload;

	// const isUserExist = await User.findOne({ id }, { id: 1, password: 1, needPasswordChange: 1 });
	const isUserExist = await User.isUserExist(id);

	if (!isUserExist) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Login faild please! try again...');
	}

	// match password

	// const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);
	const isPasswordMatch = await User.isPasswordMatched(password, isUserExist.password);

	if (isUserExist.password && !isPasswordMatch) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Login faild please! try again...');
	}

	// create access token & refresh token
	const { id: userId, role, needsPasswordChange } = isUserExist;

	const accessToken = createToken(
		{ userId, role },
		variable.jwtSecret as Secret,
		variable.jwtExpireTime as string
	);

	const refreshToken = createToken(
		{ userId, role },
		variable.jwtRefreshSecret as Secret,
		variable.jwtRefreshExpireTime as string
	);

	return { accessToken, refreshToken, needsPasswordChange };
};

const generateRefreshToken = async (token: string): Promise<IRefreshTokenResponse | null> => {
	const verifiedToken = verifyToken(token, variable.jwtRefreshSecret as Secret);

	if (!verifiedToken.userId) {
		throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
	}

	const isUserExist = await User.isUserExist(verifiedToken.userId);
	if (!isUserExist) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
	}

	// make new token
	const newAccessToken = createToken(
		{
			id: isUserExist.id,
			role: isUserExist.role,
		},
		variable.jwtRefreshSecret as Secret,
		variable.jwtRefreshExpireTime as string
	);

	return {
		accessToken: newAccessToken,
	};
};

export const authService = { loginUser, generateRefreshToken };
