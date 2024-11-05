import { getSingleJob, updateHiringStatus } from '@/api/apiJobs';
import { UseFetch } from '@/hooks/UseFetch';
import { useUser } from '@clerk/clerk-react'
import { Briefcase, DoorClosed, DoorOpen, MapPin } from 'lucide-react';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ApplyJob } from '@/components/ApplyJob';
import { ApplicationCard } from '@/components/ApplicationCard';
import MDEditor from '@uiw/react-md-editor';

export const Job = () => {


  const { isLoaded, user } = useUser();
  const { id } = useParams();
  const { loading: loadingJob, data: job, fn: fnJob } = UseFetch(getSingleJob, { job_id: id });
  const { loading: loadingHiringStatus, fn: fnHiringStatus } = UseFetch(updateHiringStatus, { job_id: id });

  const handleStatusChange = (value) => {
    const isOpen = value === "open";
    fnHiringStatus(isOpen).then(() => fnJob)

  }


  useEffect(() => {
    if (isLoaded) fnJob();

  }, [isLoaded])

  if (!isLoaded || loadingJob) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;

  }
  return (
    <div className='flex flex-col gap-8 mt-5 p-16'>
      <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
        <h1 className='gradiant-title font-extrabold pb-3 text-4xl sm:text-6xl'>{job?.title}</h1>
        <img src={job?.company?.logo_url} alt={job?.title} className='h-12' />
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <MapPin />
          <div>{job?.location}</div>
        </div>
        <div className='flex gap-2'>
          <Briefcase /> {job?.applications?.length} Apllicants
        </div>
        <div>
          {job?.isOpen ? <><DoorOpen />Open</> : <><DoorClosed />Closed</>}
        </div>
      </div>

      {/* hiring status */}
      {job?.recruiter_id === user?.id && (
        <Select onValueChange={handleStatusChange}>
          <SelectTrigger className={`w-full ${job?.isOpen ? "bg-green-950" : "bg-red-950"}`}>
            <SelectValue placeholder={"Hiring Status " + (job?.isOpen ? "(open)" : "(closed)")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

      )}




      <h2 className='text-2xl sm:text-3xl font-bold'>About the job</h2>
      <h2 className='text-2xl sm:text-3xl font-bold'>{job?.description}</h2>
      <h2 className='text-2xl sm:text-3xl font-bold'>What we are looking for</h2>
      <MDEditor.Markdown
        source={job?.requirements}
        className='bg-transparent text-lg text-gray-600 leading-relaxed p-4 sm:text-xl'
      />


      {job?.recruiter_id !== user?.id && <ApplyJob job={job}
        user={user}
        fetchJob={fnJob}
        applied={job?.applications?.find((ap) => ap.candidate_id === user.id)}
      />}


      <div>


        {job?.applications?.length > 0 && job?.recruiter_id === user?.id && (
          <div className='flex flex-col gap-2'>

            <h2 className='"text-2xl sm:text-3xl font-bold'>Applications</h2>
            {
              job?.applications.map((application) => {
                return <ApplicationCard key={application.id} application={application} />
              })}


          </div>
        )}

      </div>
    </div>
  )
}
