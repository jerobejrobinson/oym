import { createClient } from "@/utils/supabase/server"
import TenantLogo from "@/components/appUi/TenantLogo";

export default async function Dashboardlayout({ children }: Readonly<{children: React.ReactNode;}>) {
    const supabase = await createClient()
    const {data: user, error: userError } = await supabase.from('users').select('*').single()
    const {data: tenant, error: tenantError} = await supabase.from('tenants').select('*').single()

    const styles = {
        main: {
            background: tenant.primary_color
        }
    }
    return (
        <main className="w-full h-screen" style={styles.main} >
            
            <nav className="bg-white">
                <div className="flex flex-row w-full justify-between">
                    <TenantLogo url={tenant.logo} name={tenant.name} />
                    <h1>{tenant.name}</h1>
                </div>
                <div>
                    {user.first_name}
                </div>
            </nav>
            {children}
        </main>
    )
}