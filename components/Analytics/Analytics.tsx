'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function Analytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (pathname) {
            // Verificamos si window y el objeto de análisis existen
            if (typeof window !== 'undefined') {
                // Aquí puedes integrar tu servicio de analítica preferido
                // Por ejemplo, para Google Analytics:
                // window.gtag('config', 'GA-ID', { page_path: pathname });

                // Para fines de demostración, solo registramos en la consola en desarrollo
                if (process.env.NODE_ENV === 'development') {
                    console.log(`📊 Page view: ${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`);
                }
            }
        }
    }, [pathname, searchParams]);

    return null;
}