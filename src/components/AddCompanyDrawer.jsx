import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from './ui/button';
import { Input } from './ui/input';
import { UseFetch } from '@/hooks/UseFetch';
import { addNewCompanies } from '@/api/apiCompanies';


const schema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  logo: z.any().refine((file) => file[0] && (file[0].type === "image/png" || file[0].type === "image/jpeg"), { message: "only images are allowed" }),
});

export const AddCompanyDrawer = ({ fetchCompanies }) => {

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  const { loading: loadingAddCompany, error: errorAddCompnay, data: dataAddCompany, fn: fnAddCompany } = UseFetch(addNewCompanies)
  const onSubmit = (data) => {
    fnAddCompany({
      ...data,
      logo: data.logo[0],
    })
  }

  useEffect(() => {
    if (dataAddCompany?.length > 0) fetchCompanies();
  }, [dataAddCompany])

  return (
    <Drawer>
      <DrawerTrigger>
        <Button type="button" size="sm" variant="secondary">Add Company</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a new Company</DrawerTitle>
        </DrawerHeader>

        <form className='flex p-2 gap-3'>
          <Input type="text" placeholder="Company name" {...register("name")} />
          <Input
            type="file"
            accept="image/*"
            className="file:text-gray-500"
            {...register("logo")}
          />

          <Button type="button"
            onClick={handleSubmit(onSubmit)}
            variant="destructive"
            className="w-40"
          >Add</Button>
        </form>
        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        {errors.logo && <p className='text-red-500'>{errors.logo.message}</p>}
        {errorAddCompnay?.message && (
          <p className='text-red-600'>{errorAddCompnay?.message}</p>
        )}

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="secondary" type="button">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

  )
}
