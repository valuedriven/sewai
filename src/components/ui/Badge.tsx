import { cva, type VariantProps } from 'class-variance-authority';
import { clsx, type ClassValue } from 'clsx';
import React from 'react';
import styles from './Badge.module.css';

function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

const badgeVariants = cva(styles.base, {
    variants: {
        tone: {
            neutral: styles.neutral,
            success: styles.success,
            error: styles.error,
            warning: styles.warning,
            info: styles.info,
        },
    },
    defaultVariants: {
        tone: 'neutral',
    },
});

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, tone, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ tone }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
