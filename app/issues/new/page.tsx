'use client'
import {Button, Callout, Spinner, Text, TextField} from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from 'react-hook-form';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {z} from 'zod';
import {createIssueSchema} from '@/app/validationSchemas';
import {zodResolver} from '@hookform/resolvers/zod';
import ErrorMessage from '@/app/components/ErrorMessage';


type IssueFormTypes = z.infer<typeof createIssueSchema>
const NewIssuePage = () => {
  const router = useRouter()
  const {register, control, handleSubmit, formState: {errors}} = useForm<IssueFormTypes>({
    resolver: zodResolver(createIssueSchema)
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)


  return (
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'><Callout.Text>{error}</Callout.Text></Callout.Root>}
      <form className=' space-y-3' onSubmit={handleSubmit(async (data) => {
        try {
          setIsSubmitting(true)
          await axios.post('/api/issues', data)
          router.push('/issues')
        } catch (error) {
          setIsSubmitting(true)
          setError('An unexpected error occurred!')
        }
      })}>
        <TextField.Root placeholder='Title' {...register('title')} />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Controller name='description'
          control={control}
          render={({field}) =>
            <SimpleMDE placeholder='Description' {...field} />}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Create New Issue {isSubmitting && <Spinner size="1" />}</Button>
      </form>
    </div>
  )
}

export default NewIssuePage