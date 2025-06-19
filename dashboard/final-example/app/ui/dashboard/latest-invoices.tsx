import { fetchLatestInvoices } from '@/app/lib/data';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import Link from 'next/link';

export default async function LatestInvoices() {
    const latestInvoices = await fetchLatestInvoices();

    return (
        <div className="md:col-span-4">
            <h2 className="mb-4 text-xl md:text-2xl">Latest Invoices</h2>
            <div className="rounded-lg bg-gray-50 p-4">
                <div className="mb-4 flex items-center">
                    <div className="w-1/3 text-sm font-medium text-gray-500">Customer</div>
                    <div className="w-1/3 text-sm font-medium text-gray-500">Amount</div>
                    <div className="w-1/3 text-sm font-medium text-gray-500">Date</div>
                </div>
                {latestInvoices.map((invoice) => (
                    <Link
                        key={invoice.id}
                        href={`/dashboard/invoices/${invoice.id}`}
                        className="mb-2 flex items-center rounded-md p-2 transition-colors hover:bg-gray-100"
                    >
                        <div className="w-1/3 text-sm text-gray-900">{invoice.name}</div>
                        <div className="w-1/3 text-sm text-gray-500">
                            {invoice.amount}
                        </div>
                        <div className="w-1/3 text-sm text-gray-500">
                            {formatDateToLocal(invoice.date)}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
