'use client'
import {Button, Callout, TextField} from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from 'react-hook-form';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import {useState} from 'react';


interface IssueFormTypes {
  title: string,
  description: string

}
const NewIssuePage = () => {
  const router = useRouter()
  const {register, control, handleSubmit} = useForm<IssueFormTypes>()
  const [error, setError] = useState('')


  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'><Callout.Text>{error}</Callout.Text></Callout.Root>}
      <form className=' space-y-3' onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post('/api/issues', data)
          router.push('/issues')
        } catch (error) {
          setError('An unexpected error occurred!')
        }
      })}>
        <TextField.Root placeholder='Title' {...register('title')} />
        <Controller name='description'
          control={control}
          render={({field}) =>
            <SimpleMDE placeholder='Description' {...field} />}
        />
        <Button>Create New Issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage