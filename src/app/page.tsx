import TenantLogo from "@/components/appUi/TenantLogo";
import LoginCard from "@/components/auth/LoginCard";
import { createClient } from "@/utils/supabase/server";
import { getHostname } from '@/utils/url-helpers'
import { redirect } from "next/navigation";

export default async function Home({ }) {
  const supabase = await createClient()
  const host = await getHostname()
  if(!host) {
    redirect('/unauthorized')
  }
  const { data, error } = await supabase.from('limited_tenant_view').select('*').eq('domain', host).single()
  if(error) {
    console.log(error)
    redirect('/unauthorized')
  }
  return (
    <main style={{background: data.primary_color}} className='p-4 h-screen flex items-center'>
      <LoginCard tenant={data}/>
    </main>
  );
}

