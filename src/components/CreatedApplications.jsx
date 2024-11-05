import { getApplications } from '@/api/apiApplication';
import { UseFetch } from '@/hooks/UseFetch'
import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { BarLoader } from 'react-spinners';
import { ApplicationCard } from './ApplicationCard';

export const CreatedApplications = () => {

    const { user } = useUser();

    const { loading: loadingMyApps, data: myApps, fn: fnMyApplications } = UseFetch(getApplications,
        {
            user_id: user.id,
        }
    );

    useEffect(() => {
        fnMyApplications();
    }, []);


    if (loadingMyApps) {
        return <BarLoader width={"100%"} className='mb-4' color='#36d7b7' />
    }
    return (
        <div className='flex flex-col gap-2'>
           
                       {myApps?.map((application) => {
                            return <ApplicationCard key={application.id} application={application} isCandidate/>
                   
                        })}
        </div>
    )
}
