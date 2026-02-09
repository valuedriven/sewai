export interface ClerkUserMetadata {
    role?: string;
}

/**
 * Helper to check if a user has the admin role
 * Adopts the convention of storing the role in publicMetadata
 */
export function isAdmin(user: any): boolean {
    return user?.publicMetadata?.role === 'admin';
}
