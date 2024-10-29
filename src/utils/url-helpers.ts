import { type NextRequest } from 'next/server'
import { headers } from "next/headers";

export function urlPath(applicationPath: string, tenant: string) {
    return `/${tenant}${applicationPath}`
}

export function buildUrl(applicationPath: string, tenant: string, request: NextRequest) {
    return new URL(urlPath(applicationPath, tenant), request.url)
}

export async function getHostname() {
    const headersList = await headers()
    const getTenant = headersList.get('host')?.split('.')[0]
    
    return getTenant
}