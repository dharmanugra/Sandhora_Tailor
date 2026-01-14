// Security utilities untuk prevent XSS dan input sanitization

/**
 * Sanitize HTML string to prevent XSS attacks
 * Removes dangerous HTML tags and attributes
 */
export const sanitizeHTML = (html) => {
  if (!html) return '';
  
  // Remove script tags and their content
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handlers (onclick, onerror, etc)
  sanitized = sanitized.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
  sanitized = sanitized.replace(/on\w+\s*=\s*[^\s>]*/gi, '');
  
  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  // Remove data: protocol (can be used for XSS)
  sanitized = sanitized.replace(/data:text\/html/gi, '');
  
  // Remove iframe, object, embed tags
  sanitized = sanitized.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
  sanitized = sanitized.replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '');
  sanitized = sanitized.replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '');
  
  return sanitized;
};

/**
 * Sanitize text input - removes HTML tags completely
 */
export const sanitizeText = (text) => {
  if (!text) return '';
  
  // Remove all HTML tags
  return text.replace(/<[^>]*>/g, '');
};

/**
 * Validate email format
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (international format)
 */
export const isValidPhone = (phone) => {
  // Allow +, digits, spaces, hyphens, parentheses
  const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

/**
 * Sanitize filename - remove dangerous characters
 */
export const sanitizeFilename = (filename) => {
  if (!filename) return '';
  
  // Remove path traversal attempts
  let sanitized = filename.replace(/\.\./g, '');
  
  // Remove special characters except dots, dashes, underscores
  sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '_');
  
  return sanitized;
};

/**
 * Validate image file type
 */
export const isValidImageType = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  return validTypes.includes(file.type);
};

/**
 * Validate file size (max 10MB)
 */
export const isValidFileSize = (file, maxSizeMB = 10) => {
  const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes
  return file.size <= maxSize;
};

/**
 * Generate CSRF token (simple client-side)
 * In production, this should come from backend
 */
export const generateCSRFToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Store CSRF token in sessionStorage
 */
export const storeCSRFToken = (token) => {
  sessionStorage.setItem('csrf_token', token);
};

/**
 * Get CSRF token from sessionStorage
 */
export const getCSRFToken = () => {
  return sessionStorage.getItem('csrf_token');
};

/**
 * Sanitize form data object
 */
export const sanitizeFormData = (formData) => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeText(value).trim();
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};

/**
 * Encode HTML entities to prevent XSS
 */
export const encodeHTML = (str) => {
  if (!str) return '';
  
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Rate limiting helper (client-side)
 * Prevents spam submissions
 */
class RateLimiter {
  constructor(maxAttempts = 5, timeWindowMs = 60000) {
    this.maxAttempts = maxAttempts;
    this.timeWindow = timeWindowMs;
    this.attempts = new Map();
  }
  
  isAllowed(key) {
    const now = Date.now();
    const userAttempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside time window
    const recentAttempts = userAttempts.filter(time => now - time < this.timeWindow);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Add current attempt
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    
    return true;
  }
  
  reset(key) {
    this.attempts.delete(key);
  }
}

export const contactFormRateLimiter = new RateLimiter(3, 60000); // 3 attempts per minute
export const loginRateLimiter = new RateLimiter(5, 300000); // 5 attempts per 5 minutes

/**
 * Validate URL to prevent open redirect attacks
 */
export const isValidRedirectURL = (url) => {
  try {
    const parsedURL = new URL(url, window.location.origin);
    // Only allow same-origin URLs
    return parsedURL.origin === window.location.origin;
  } catch {
    return false;
  }
};

/**
 * Content Security Policy helper
 * Add meta tag to HTML head
 */
export const setCSP = () => {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: http:; font-src 'self' https://fonts.gstatic.com;";
  document.head.appendChild(meta);
};
