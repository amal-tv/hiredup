import { getJobs } from '@/api/apiJobs';
import { UseFetch } from '@/hooks/UseFetch';
import React, { useEffect} from 'react';

export const JobListing = () => {

  const {fn :fnJobs,data : dataJobs,loading : loadingJobs } = UseFetch(getJobs,{});
  console.log(dataJobs)

  useEffect(()=>{
    fnJobs();
  },[])

  if(loadingJobs) return  <div>loading....</div>

  return <div>hi</div>;
};
