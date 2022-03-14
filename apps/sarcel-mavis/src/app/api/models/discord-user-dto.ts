/* tslint:disable */
/* eslint-disable */
export interface DiscordUserDto {

  /**
   * the user's banner color encoded as a integer representing a hexadecimal value
   */
  accent_color?: number;

  /**
   * Discord User Avatar Hash
   */
  avatar: string;

  /**
   * The user's banner hash
   */
  banner?: string;

  /**
   * Whether the user is a bot
   */
  bot?: boolean;

  /**
   * Discord User Discriminator
   */
  discriminator: string;

  /**
   * The user's flags
   */
  flags?: number;

  /**
   * Discord User ID
   */
  id: string;

  /**
   * The user's locale
   */
  locale?: string;

  /**
   * Whether the user has two factor enabled
   */
  mfa_enabled?: boolean;

  /**
   * The user's premium type
   */
  premium_type?: number;

  /**
   * The user's public flags
   */
  public_flags?: number;

  /**
   * Whether the user is a official Discord system user
   */
  system?: boolean;

  /**
   * Discord User Username
   */
  username: string;
}
