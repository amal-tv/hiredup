import { getMyJobs } from '@/api/apiJobs';
import { UseFetch } from '@/hooks/UseFetch';

import { useUser } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import { JobCard } from './JobCard';

export const CreatedJobs = () => {


    const {user,isLoaded} = useUser();
const {loading : loadingMyJobs, data : myCreatedJobs,fn : fnMyJobs} =   UseFetch(getMyJobs,{recruiter_id : user?.id})
  
useEffect(()=>{
    if(isLoaded){
        fnMyJobs();

    }
},[isLoaded])




if (loadingMyJobs || !isLoaded) {
    return <BarLoader  width={"100%"} className='mb-4' color='#36d7b7' />
}

return (
    <div>
        <div className='m-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {myCreatedJobs?.length ? (
          myCreatedJobs?.map((job) => {
            return <JobCard key={job.id} job={job} onJobSaved={fnMyJobs} isMyjob/>;
          })
        ) : (
          <div>No Jobs Found ☹️</div>
        )}
      </div>
    </div>
  )
}
