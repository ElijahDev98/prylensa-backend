export interface GuestSignInRequestDto {
  email?: string;
}

export interface GuestUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface GuestSignInResponseDto {
  user: GuestUserDto;
  accessToken: string;
  expiresAt: string;
}
