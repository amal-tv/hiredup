import { getSavedJobs } from '@/api/apiJobs'
import { JobCard } from '@/components/JobCard';
import { UseFetch } from '@/hooks/UseFetch'
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';

export default function Savedjobs() {

  const { isLoaded } = useUser();

  const { loading: loadingSavedJobs, fn: fnSavedJobs, data: savedJobs } = UseFetch(getSavedJobs);
  



  useEffect(() => {
    if (isLoaded) fnSavedJobs();
  }, [isLoaded]);
 console.log(savedJobs);

  if(!isLoaded  || loadingSavedJobs){
    return <BarLoader className='mb-4' width={"100%"} color="#36d7b7" />
  }
  return (
    <div>
      <h1 className='gradiant-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>Saved Jobs</h1>
      {loadingSavedJobs === false && (
        <div className='m-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {savedJobs?.length ? (
            savedJobs?.map((saved) => {
              return <JobCard key={saved?.id} job={saved?.job} savedInit={true}
                onJobSaved={fnSavedJobs} />;
            })
          ) : (
            <div>No Saved Jobs Found ☹️</div>
          )}
        </div>
      )}

    </div>
  )
}
