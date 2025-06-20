'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { generatePagination } from '@/app/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const allPages = generatePagination(currentPage, totalPages);

    return (
        <div className="inline-flex items-center justify-center gap-1">
            {/* Previous Page */}
            <Link
                href={createPageURL(currentPage - 1)}
                className={clsx(
                    'flex h-10 w-10 items-center justify-center rounded-md border text-sm',
                    {
                        'pointer-events-none text-gray-300': currentPage === 1,
                        'hover:bg-gray-100': currentPage > 1,
                    }
                )}
            >
                <span className="sr-only">Previous page</span>
                <ArrowLeftIcon className="h-5 w-5" />
            </Link>

            {/* Numbered Pages */}
            {allPages.map((page, index) => (
                <Link
                    key={index}
                    href={createPageURL(page)}
                    className={clsx(
                        'flex h-10 w-10 items-center justify-center rounded-md text-sm border',
                        {
                            'bg-blue-500 text-white border-blue-500': page === currentPage,
                            'hover:bg-gray-100': page !== currentPage,
                        }
                    )}
                >
                    {page}
                </Link>
            ))}

            {/* Next Page */}
            <Link
                href={createPageURL(currentPage + 1)}
                className={clsx(
                    'flex h-10 w-10 items-center justify-center rounded-md border text-sm',
                    {
                        'pointer-events-none text-gray-300': currentPage === totalPages,
                        'hover:bg-gray-100': currentPage < totalPages,
                    }
                )}
            >
                <span className="sr-only">Next page</span>
                <ArrowRightIcon className="h-5 w-5" />
            </Link>
        </div>
    );
}
