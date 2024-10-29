import { createClient } from "@/utils/supabase/server"
import TenantLogo from "@/components/appUi/TenantLogo";
import getUser from "@/utils/supabase/getUser";

export default async function Dashboard() {
    const supabase = await createClient()
    return (
        <div>
            Dashbaord
        </div>
    )
}
