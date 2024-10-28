import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import companies from '../data/companies.json'
import faqs from '../data/faq.json'
import React from 'react'
import { Link } from 'react-router-dom'
import Autoplay from "embla-carousel-autoplay"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



export const Landing = () => {
  return (
    <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
      <section className='text-center'>
        <h1 className='flex flex-col  justify-center items-center gradient-title text-4xl font-extrabold sm:text-4xl lg:text-6xl tracking-tighter py-4'>Find Your Dream Job and <span className='flex items-center gap-2'>and get  <img src="/logo.png" alt="hireup logo" className='h-[60px] sm:h-[100px] lg:h-[150px]' /></span></h1>
        <p className='text-gray-300  sm:mt-4 text-xs sm:text-4xl'>Explore thousands of job listing or find the perfect candidate</p>
      </section>
      <div className='flex justify-center items-center gap-6'>
        <Link to="/jobs">
          <Button variant="blue" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to="/post-job">
          <Button variant="destructive" size="xl">
            Post Job
          </Button>
        </Link>
      </div>

      <Carousel plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]} className="p-16 py-10">
        <CarouselContent>
          {companies.map(({ name, id, path }) => {
            return <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
              <img src={path} alt={name} className='h-9 sm:h-14 object-contain' />
            </CarouselItem>

          })}

        </CarouselContent>

      </Carousel>


      <img src="/banner.webp" alt="banner" className='lg:p-16 w-full md:p-20' />



      <section className='grid grid-cols-1 md:grid-cols-2 gap-4 p-16'>





        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Search and Apply,Track Application,And more</p>
          </CardContent>

        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <p>post Jobs,Manage Application,And find the best candidates.</p>
          </CardContent>

        </Card>

      </section>
      <Accordion type="single" collapsible className='p-16'>
  {faqs.map((faq,index)=>{
    return (
    <AccordionItem key={index}  value={`item-${index}`}>
    <AccordionTrigger>{faq.question}</AccordionTrigger>
    <AccordionContent>
    {faq.answer}
    </AccordionContent>
  </AccordionItem>)})}
</Accordion>

    </main>
  )
}
