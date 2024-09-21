"use client"

import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import { useNotFoundModal } from "@/hooks/use-not-found-modal"
import { Modal } from "@/components/ui/modal"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CreateSite } from '@/actions/sites'

const formSchema = z.object({
    name: z.string().min(1)
})

export const NotFoundModal = () => {
    const notFoundModal = useNotFoundModal()

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            // const response = await axios.post('/api/stores', values)
            const site = await CreateSite(values)

            if (site) {
                window.location.assign(`/dashboard/${site.id}/overview/upload`)
            }

            // window.location.assign(`/${response.data.id}/overview`)
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title="Page Not Found"
            description="This page does not currently exist, but if you think it should, then please let us know!"
            isOpen={notFoundModal.isOpen}
            onClose={notFoundModal.onClose}
        >
            <div>
                <div className='space-y-4 py-2 pb-4'>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder='example.com'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='pt-6 space-x-2 flex items-center justify-end'>
                                <Button
                                    disabled={loading}
                                    variant='outline'
                                    onClick={notFoundModal.onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    disabled={loading}
                                    type='submit'>
                                    Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}