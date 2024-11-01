import { getCompanies } from '@/api/apiCompanies';
import { getJobs } from '@/api/apiJobs';
import { JobCard } from '@/components/JobCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UseFetch } from '@/hooks/UseFetch';
import { useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
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
import { State } from 'country-state-city';

export const JobListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();

  const { fn: fnJobs, data: jobs, loading: loadingJobs } = UseFetch(getJobs, { location, company_id, searchQuery });

  const { fn: fnCompanies, data: companies} = UseFetch(getCompanies);


  useEffect(() => {
    if (isLoaded)
      fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded)
      fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);


  if (!isLoaded) return <BarLoader className='mb-4' width={"100%"} color="#36d7b7" />


   const handleSearch = (e)=>{
    e.preventDefault();
    let formData = new FormData(e.target);

    let query = formData.get("search-query");
    if(query) setSearchQuery(query);

   }

   function clearFilters(){
    setCompany_id("");
    setLocation("");
    setSearchQuery("");
   }

  return <div>

    <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>Latest jobs</h1>

    {loadingJobs && (
      <BarLoader className='mb-4' width={"100%"} color="#36d7b7" />

    )}
          <div className='m-16'>
            <form onSubmit={handleSearch} className='h-12 flex w-full gap-2 items-center mb-3'>
           <Input type="text"
           placeholder="search jobs by title.."
           name="search-query"
           className="h-full flex-1 px- text-md" 
           />
          

            <Button type="submit" className="h-full sm:w-28" variant="blue">
                   Search
            </Button>
            </form>
        
          <div className='flex flex-col sm:flex-row gap-3 items-start sm:items-center'>
          <Select value={location} onValueChange={(value)=> setLocation(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by location" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {State.getStatesOfCountry("IN").map(({name})=>{
            
           return  <SelectItem key={name} value={name}>{name}</SelectItem>
          })}
         
        </SelectGroup>
      </SelectContent>
    </Select>
          <Select value={company_id} onValueChange={(value)=> setCompany_id(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by Companies" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {companies?.map(({name,id})=>{
            
           return  <SelectItem key={name} value={id}>{name}</SelectItem>
          })}
         
        </SelectGroup>
      </SelectContent>
    </Select>
    <Button variant="destructive" onClick={clearFilters}>Clear Filters</Button>
          </div>
          </div>
    {loadingJobs === false && (
      <div className='m-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {jobs?.length ? (
          jobs.map((job) => {
            return <JobCard key = {job.id} job={job} savedInit={job?.saved?.length > 0} />;
          })
        ) : (
          <div>No Jobs Found ☹️</div>
        )}
      </div>
    )}

  </div>
  
};
