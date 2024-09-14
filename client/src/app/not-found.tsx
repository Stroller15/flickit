import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

 
export default function NotFound() {
  return (
    <div className='h-screen flex justify-center items-center flex-col'>
      <Image src='/assets/404_error.svg' alt='error page'  width={550} height={550}/>
      <Link className='text-2xl font-bold underline' href='/'><Button>Return Home</Button></Link>
    </div>
  )
}