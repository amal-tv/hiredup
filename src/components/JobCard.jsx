import { useUser } from '@clerk/clerk-react'
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, MapPinIcon, Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { deleteJobs, saveJobs } from '@/api/apiJobs';
import { useEffect } from 'react';
import { UseFetch } from '@/hooks/UseFetch';
import { BarLoader } from 'react-spinners';

export const JobCard = ({
    job,
    isMyjob = false,
    savedInit = false,
    onJobSaved = () => { },

}) => {

    const [saved, setSaved] = useState(savedInit);
    const { fn: fnSavedJobs, data: savedjobs, loading: loadingSavedJobs } = UseFetch(saveJobs, { alreadySaved: saved });

    const { user } = useUser();

    const handleSavedJobs = async () => {
        await fnSavedJobs({
            user_id: user.id,
            job_id: job.id,
        });
        onJobSaved();
    }


    const {loading : loadingDeleteJob , fn : fnDeleteJobs} = UseFetch(deleteJobs,{job_id : job?.id})
    useEffect(() => {
        if (savedjobs !== undefined) setSaved(savedjobs?.length > 0);
    }, [savedjobs])

const handlDeleteJobs= async()=>{
await  fnDeleteJobs();  
onJobSaved(); 
}



    return (
        <Card className="flex flex-col">
          

                    <CardHeader>
                        <CardTitle className="flex justify-between font-bold">{job.title}

                            {isMyjob && <Trash2Icon fill="red" size={"18"} className='text-red-300 cursor-pointer'
                            onClick={handlDeleteJobs} />}

                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 flex-1">
                        <div className='flex justify-between'>
                            {job.company && <img src={job.company.logo_url} className='h-6' />}
                            <div className='flex gap-2 items-center'><MapPinIcon size={15} />
                                {job.location}
                            </div>c
                        </div>
                        <hr />
                        {job.description.substring(0, job.description.indexOf("."))}
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Link to={`/job/${job.id}`} className='flex-1'>
                            <Button variant="secondary" className="w-full">
                                More details
                            </Button>

                        </Link>
                        {!isMyjob && (
                            <Button variant="outline" className="w-15" onClick={handleSavedJobs} disabled={loadingSavedJobs}>

                                {saved ? (

                                    <Heart size="20" stroke="red" fill="red" />
                                ) : (
                                    <Heart size="20" />

                                )
                                }
                            </Button>
                        )}

                    </CardFooter>


               

            

        </Card>
    )
}
