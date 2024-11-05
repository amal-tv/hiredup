
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { State } from 'country-state-city';
import { UseFetch } from '@/hooks/UseFetch';
import { getCompanies } from '@/api/apiCompanies';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import { Navigate, useNavigate } from 'react-router-dom';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { Button } from '@/components/ui/button';
import MDEditor from '@uiw/react-md-editor';
import { addNewJob } from '@/api/apiJobs';
import { AddCompanyDrawer } from '@/components/AddCompanyDrawer';

const schema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  description: z.string().min(1, { message: "description is required" }),
  location: z.string().min(1, { message: "location is required" }),
  company_id: z.string().min(1, { message: "select or Add a  a new Company" }),
  requirements: z.string().min(1, { message: "requirements are required" }),
})

export const Postjob = () => {
 const navigate = useNavigate();
  const { isLoaded, user } = useUser();

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      location: "",
      company_id: "",
      requirements: "",
    },
    resolver: zodResolver(schema),
  })


  const { fn: fnCompanies, data: companies, loading: loadingCompanies } = UseFetch(getCompanies);
  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  const { fn: fnCreateJob, data: dataCreateJob,error : errorCreateJob, loading: loadingCreateJOb } = UseFetch(addNewJob);

  const onSubmit = (data) => {
    fnCreateJob({
      ...data,
      recruiter_id: user.id,
      isOpen: true,

    })

  }

  useEffect(()=>{
    if(dataCreateJob?.length > 0) navigate("/jobs")
  },[loadingCreateJOb])

  if (!isLoaded || loadingCompanies) {
    return <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />;
  }

  if (user?.unsafeMetadata?.role !== "recruiter") {
    return <Navigate to="/jobs" />
  }

  return (
    <div>
      <h1 className='gradiant-title font-extrabold text-5xl sm:text-7xl text-center pb-8 '>Post a Job</h1>
      <form className='flex flex-col pb-0 p-4 gap-4' onSubmit={handleSubmit(onSubmit)}>


        <Input placeholder="Job Title" {...register("title")} />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}

        <Textarea placeholder="Job Description" {...register("description")} />
        {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
        <div className='flex gap-4 items-center'>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {State.getStatesOfCountry("IN").map(({ name }) => {

                      return <SelectItem key={name} value={name}>{name}</SelectItem>
                    })}

                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <Controller
            name="company_id"
            control={control}
            render={({ field }) => (

              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Companies" />
                  {field.value ? companies?.find((com) => com.id === Number(field.value))?.name : "company"}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies?.map(({ name, id }) => {

                      return <SelectItem key={name} value={id}>{name}</SelectItem>
                    })}

                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <AddCompanyDrawer fetchCompanies={fnCompanies}/>
          {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
          {errors.company_id && <p className='text-red-500'>{errors.company_id.message}</p>}

        </div>
        <Controller
          name="requirements"
          control={control}
          render={({ field }) => <MDEditor value={field.value} onChange={field.onChange} />}
        />
        {errors.location && <p className='text-red-500'>{errors.requirements.message}</p>}
        {errorCreateJob && <p className='text-red-500'>{errorCreateJob.message}</p>}
        {loadingCreateJOb && <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />}
        <Button type="submit" variant="blue" size="lg" className="mt-2" >Submit</Button>

      </form>
    </div>
  )
}
