/**
 * Environment Configuration with Validation
 * Validates all required environment variables at runtime
 */

interface EnvConfig {
  NEXT_PUBLIC_API_URL: string;
  NEXT_PUBLIC_APP_NAME: string;
  NEXT_PUBLIC_LOYALTY_API_URL: string;
  NEXT_PUBLIC_DOKU_MERCHANT_ID: string;
  NEXT_PUBLIC_DOKU_CALLBACK_URL: string;
  NEXT_PUBLIC_DOKU_RETURN_URL: string;
  NEXT_PUBLIC_ENV: 'development' | 'staging' | 'production';
}

const requiredEnvVars = [
  'NEXT_PUBLIC_API_URL',
  'NEXT_PUBLIC_APP_NAME',
  'NEXT_PUBLIC_LOYALTY_API_URL',
  'NEXT_PUBLIC_DOKU_MERCHANT_ID',
  'NEXT_PUBLIC_DOKU_CALLBACK_URL',
  'NEXT_PUBLIC_DOKU_RETURN_URL',
  'NEXT_PUBLIC_ENV',
] as const;

/**
 * Validates that all required environment variables are present
 * In development, provides default values if not set
 */
function validateEnv(): EnvConfig {
  const isDev = process.env.NODE_ENV === 'development';
  const missingVars: string[] = [];

  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName] && !isDev) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missingVars.join('\n')}\n\nPlease check your .env file.`
    );
  }

  // Provide default values for development
  return {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Edu Commerce',
    NEXT_PUBLIC_LOYALTY_API_URL: process.env.NEXT_PUBLIC_LOYALTY_API_URL || 'http://localhost:3001/api/loyalty',
    NEXT_PUBLIC_DOKU_MERCHANT_ID: process.env.NEXT_PUBLIC_DOKU_MERCHANT_ID || 'DEV_MERCHANT_ID',
    NEXT_PUBLIC_DOKU_CALLBACK_URL: process.env.NEXT_PUBLIC_DOKU_CALLBACK_URL || 'http://localhost:3000/api/payment/callback',
    NEXT_PUBLIC_DOKU_RETURN_URL: process.env.NEXT_PUBLIC_DOKU_RETURN_URL || 'http://localhost:3000/payment/success',
    NEXT_PUBLIC_ENV: (process.env.NEXT_PUBLIC_ENV as EnvConfig['NEXT_PUBLIC_ENV']) || 'development',
  };
}

// Validate and export environment configuration
export const env = validateEnv();

// Export individual environment variables for convenience
export const {
  NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_LOYALTY_API_URL,
  NEXT_PUBLIC_DOKU_MERCHANT_ID,
  NEXT_PUBLIC_DOKU_CALLBACK_URL,
  NEXT_PUBLIC_DOKU_RETURN_URL,
  NEXT_PUBLIC_ENV,
} = env;

// Helper function to check current environment
export const isDevelopment = NEXT_PUBLIC_ENV === 'development';
export const isStaging = NEXT_PUBLIC_ENV === 'staging';
export const isProduction = NEXT_PUBLIC_ENV === 'production';
