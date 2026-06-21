import { supabase } from './supabase';

export interface ApiErrorContext {
  endpoint: string;
  method?: string;
  requestBody?: any;
  userId?: string;
  [key: string]: any;
}

export async function logApiError(
  error: Error | unknown,
  context: ApiErrorContext
) {
  try {
    // Format error message to be safely logged
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    // Fire and forget logging
    await supabase.from('error_logs').insert([
      {
        endpoint: context.endpoint,
        method: context.method || 'UNKNOWN',
        error_message: errorMessage,
        error_stack: errorStack,
        request_context: context,
        created_at: new Date().toISOString(),
      }
    ]);
    
    // In development or when explicitly requested, log to console
    if (import.meta.env.DEV) {
      console.error('[API Error]:', errorMessage, context);
    }
  } catch (loggingError) {
    // Failsafe: if the logger itself fails, at least console error it
    console.error('Failed to log API error to Supabase:', loggingError);
    console.error('Original error:', error);
  }
}
