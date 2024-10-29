"use client"
import { createClient } from '@/utils/supabase/client'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import TenantLogo from '@/components/appUi/TenantLogo'
import { redirect } from 'next/navigation'

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4)
})

export default function LoginCard({ tenant }: { tenant: any }) {
    // Define login form
    const loginForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    // Define submit handler
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const supabase = createClient()
        const { data, error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        })
        if(!error) {
            redirect('/dashboard')
        }
    }
    return (
        <Card className='max-w-[460px] mx-auto w-full'>
            <CardHeader>
                <CardTitle className='mx-auto'><TenantLogo url={tenant.logo} name={tenant.name} /></CardTitle>
                <CardDescription className='mx-auto text-lg font-bold text-black'>{tenant.name}</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField 
                            control={loginForm.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email@email.com" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter school email
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={loginForm.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter password
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <Button type='submit' className='w-full' style={{backgroundColor: tenant.primary_color}}>Login</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>

            </CardFooter>
        </Card>
    )
}